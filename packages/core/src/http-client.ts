/**
 * Lightweight HTTP client built on native fetch (Node 20+).
 * Provides retry with exponential backoff, in-memory caching, and timeout handling.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare const fetch: (url: string, init?: any) => Promise<any>;
declare class AbortController { signal: any; abort(): void; }

/* ------------------------------------------------------------------ */
/*  Error classification                                               */
/* ------------------------------------------------------------------ */

export type HttpErrorKind =
  | "timeout"
  | "network"
  | "client"      // 4xx
  | "server"      // 5xx
  | "parse"
  | "unknown";

export class HttpError extends Error {
  readonly kind: HttpErrorKind;
  readonly status?: number;
  readonly body?: unknown;

  constructor(kind: HttpErrorKind, message: string, status?: number, body?: unknown) {
    super(message);
    this.name = "HttpError";
    this.kind = kind;
    this.status = status;
    this.body = body;
  }
}

/* ------------------------------------------------------------------ */
/*  Cache entry                                                        */
/* ------------------------------------------------------------------ */

interface CacheEntry<T = unknown> {
  data: T;
  expiresAt: number;
}

/* ------------------------------------------------------------------ */
/*  Options                                                            */
/* ------------------------------------------------------------------ */

export interface HttpClientOptions {
  baseUrl: string;
  /** Request timeout in milliseconds (default 30 000) */
  timeout?: number;
  /** Number of retry attempts for retryable failures (default 3) */
  retries?: number;
  /** In-memory cache TTL in milliseconds (0 = disabled, default 0) */
  cacheTtlMs?: number;
  /** Extra headers sent with every request */
  headers?: Record<string, string>;
}

/* ------------------------------------------------------------------ */
/*  HttpClient                                                         */
/* ------------------------------------------------------------------ */

export class HttpClient {
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly retries: number;
  private readonly cacheTtlMs: number;
  private readonly headers: Record<string, string>;
  private readonly cache = new Map<string, CacheEntry>();

  constructor(options: HttpClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.timeout = options.timeout ?? 30_000;
    this.retries = options.retries ?? 3;
    this.cacheTtlMs = options.cacheTtlMs ?? 0;
    this.headers = options.headers ?? {};
  }

  /* ---- public API ------------------------------------------------ */

  async get<T = unknown>(path: string, query?: Record<string, string>): Promise<T> {
    const url = this.buildUrl(path, query);
    const cacheKey = url;

    const cached = this.getFromCache<T>(cacheKey);
    if (cached !== undefined) return cached;

    const result = await this.requestWithRetry<T>(url, { method: "GET" });
    this.putInCache(cacheKey, result);
    return result;
  }

  async post<T = unknown>(path: string, body: unknown): Promise<T> {
    const url = this.buildUrl(path);
    return this.requestWithRetry<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  }

  async graphql<T = unknown>(path: string, query: string, variables?: Record<string, unknown>): Promise<T> {
    const url = this.buildUrl(path);
    const payload = JSON.stringify({ query, variables });
    const raw = await this.requestWithRetry<{ data: T; errors?: { message: string }[] }>(url, {
      method: "POST",
      body: payload,
      headers: { "Content-Type": "application/json" },
    });

    if (raw.errors?.length) {
      throw new HttpError("client", `GraphQL errors: ${raw.errors.map((e) => e.message).join("; ")}`);
    }
    return raw.data;
  }

  /* ---- internals ------------------------------------------------- */

  private buildUrl(path: string, query?: Record<string, string>): string {
    const base = path.startsWith("http") ? path : `${this.baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
    if (!query) return base;
    const qs = new URLSearchParams(query).toString();
    return qs ? `${base}?${qs}` : base;
  }

  private async requestWithRetry<T>(url: string, init: Record<string, unknown>): Promise<T> {
    const mergedHeaders: Record<string, string> = {
      ...this.headers,
      ...(init.headers as Record<string, string> | undefined),
    };

    let lastError: HttpError | undefined;

    for (let attempt = 0; attempt < this.retries; attempt++) {
      try {
        return await this.singleRequest<T>(url, { ...init, headers: mergedHeaders });
      } catch (err) {
        lastError = err instanceof HttpError ? err : new HttpError("unknown", String(err));

        // Only retry on timeouts and 5xx errors
        if (lastError.kind !== "timeout" && lastError.kind !== "server" && lastError.kind !== "network") {
          throw lastError;
        }

        if (attempt < this.retries - 1) {
          const delayMs = 1000 * Math.pow(2, attempt); // 1s, 2s, 4s …
          await this.sleep(delayMs);
        }
      }
    }

    throw lastError ?? new HttpError("unknown", "Request failed after retries");
  }

  private async singleRequest<T>(url: string, init: Record<string, unknown>): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, { ...init, signal: controller.signal });

      if (!response.ok) {
        const bodyText = await response.text().catch(() => "");
        const kind: HttpErrorKind = response.status >= 500 ? "server" : "client";
        throw new HttpError(kind, `HTTP ${response.status}: ${bodyText}`, response.status, bodyText);
      }

      const text = await response.text();
      try {
        return JSON.parse(text) as T;
      } catch {
        throw new HttpError("parse", "Failed to parse response as JSON");
      }
    } catch (err: any) {
      if (err instanceof HttpError) throw err;
      if (err?.name === "AbortError") {
        throw new HttpError("timeout", `Request timed out after ${this.timeout}ms`);
      }
      throw new HttpError("network", `Network error: ${String(err)}`);
    } finally {
      clearTimeout(timer);
    }
  }

  /* ---- cache ----------------------------------------------------- */

  private getFromCache<T>(key: string): T | undefined {
    if (this.cacheTtlMs <= 0) return undefined;
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }
    return entry.data as T;
  }

  private putInCache(key: string, data: unknown): void {
    if (this.cacheTtlMs <= 0) return;
    this.cache.set(key, { data, expiresAt: Date.now() + this.cacheTtlMs });
  }

  /* ---- helpers --------------------------------------------------- */

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
