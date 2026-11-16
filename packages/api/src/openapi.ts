/**
 * Static OpenAPI 3.0 specification for the OncoGraph API.
 *
 * This is a hand-maintained spec that documents every public endpoint.
 * Served at GET /openapi.json.
 */

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "OncoGraph API",
    version: "0.1.0",
    description:
      "Multi-modal cancer data discovery API. Provides unified access to genomic, imaging, clinical, and drug-sensitivity datasets along with biomarker, pathway, survival, and trial information.",
    license: {
      name: "MIT",
    },
  },
  servers: [
    {
      url: "http://localhost:3737",
      description: "Local development server",
    },
  ],
  tags: [
    { name: "System", description: "Health and meta endpoints" },
    { name: "Discovery", description: "Multi-modal cancer data discovery" },
    { name: "Genomics", description: "Biomarker and genomic data" },
    { name: "Drugs", description: "Drug and target information" },
    { name: "Trials", description: "Clinical trial queries" },
    { name: "Datasets", description: "Dataset repository queries" },
    { name: "Search", description: "Full-text search" },
    { name: "Pathways", description: "Pathway analysis" },
    { name: "Survival", description: "Survival statistics" },
    { name: "Completeness", description: "Data completeness scoring" },
  ],
  paths: {
    "/health": {
      get: {
        tags: ["System"],
        summary: "Liveness probe",
        operationId: "getHealth",
        responses: {
          "200": {
            description: "Server is healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "ok" },
                    version: { type: "string", example: "0.1.0" },
                    packages: { type: "integer", example: 11 },
                    timestamp: { type: "integer", description: "Unix timestamp in milliseconds" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/openapi.json": {
      get: {
        tags: ["System"],
        summary: "OpenAPI 3.0 specification",
        operationId: "getOpenApiSpec",
        responses: {
          "200": {
            description: "The OpenAPI spec for this API",
            content: {
              "application/json": {
                schema: { type: "object" },
              },
            },
          },
        },
      },
    },
    "/discover": {
      get: {
        tags: ["Discovery"],
        summary: "Multi-modal cancer data discovery",
        operationId: "discover",
        parameters: [
          {
            name: "cancer",
            in: "query",
            required: true,
            description: "Cancer type identifier (e.g. brca, nsclc, crc)",
            schema: { type: "string" },
          },
          {
            name: "dataTypes",
            in: "query",
            required: false,
            description: "Comma-separated data types to filter by (e.g. genomic,imaging,clinical)",
            schema: { type: "string" },
          },
          {
            name: "accessModel",
            in: "query",
            required: false,
            description: "Comma-separated access models to filter by (e.g. open,controlled)",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Discovery results",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    cancerType: { type: "string" },
                    datasets: { type: "array", items: { $ref: "#/components/schemas/Dataset" } },
                    biomarkers: { type: "array", items: { type: "object" } },
                    drugs: { type: "array", items: { type: "object" } },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
        },
      },
    },
    "/biomarkers/{cancerType}": {
      get: {
        tags: ["Genomics"],
        summary: "Biomarkers for a cancer type",
        operationId: "getBiomarkers",
        parameters: [
          {
            name: "cancerType",
            in: "path",
            required: true,
            description: "Cancer type identifier (e.g. brca, nsclc)",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "List of biomarkers for the given cancer type",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    cancerType: { type: "string" },
                    biomarkers: { type: "array", items: { type: "object" } },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/drugs/{target}": {
      get: {
        tags: ["Drugs"],
        summary: "Drugs targeting a specific gene or molecular target",
        operationId: "getDrugsByTarget",
        parameters: [
          {
            name: "target",
            in: "path",
            required: true,
            description: "Gene or molecular target name (e.g. BRAF, EGFR, HER2)",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Drugs matching the target",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    target: { type: "string" },
                    drugs: { type: "array", items: { $ref: "#/components/schemas/Drug" } },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/trials": {
      get: {
        tags: ["Trials"],
        summary: "Clinical trials for a cancer type",
        operationId: "getTrials",
        parameters: [
          {
            name: "cancer",
            in: "query",
            required: true,
            description: "Cancer type identifier",
            schema: { type: "string" },
          },
          {
            name: "biomarker",
            in: "query",
            required: false,
            description: "Optional biomarker to filter trials",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Matching clinical trials",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    cancer: { type: "string" },
                    biomarker: { type: "string", nullable: true },
                    trials: { type: "array", items: { type: "object" } },
                    note: { type: "string" },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
        },
      },
    },
    "/datasets/{repository}": {
      get: {
        tags: ["Datasets"],
        summary: "Datasets for a given repository",
        operationId: "getDatasetsByRepository",
        parameters: [
          {
            name: "repository",
            in: "path",
            required: true,
            description: "Repository identifier (e.g. gdc, depmap, seer)",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Datasets from the repository",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    repositoryId: { type: "string" },
                    datasets: { type: "array", items: { $ref: "#/components/schemas/Dataset" } },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/search": {
      get: {
        tags: ["Search"],
        summary: "Full-text search across all data",
        operationId: "search",
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            description: "Search query string",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Search results",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    query: { type: "string" },
                    results: { type: "array", items: { type: "object" } },
                    total: { type: "integer" },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
        },
      },
    },
    "/pathways": {
      get: {
        tags: ["Pathways"],
        summary: "Pathway analysis for a set of mutated genes",
        operationId: "analyzePathways",
        parameters: [
          {
            name: "genes",
            in: "query",
            required: true,
            description: "Comma-separated list of gene names (e.g. TP53,KRAS,BRAF)",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Pathway analysis results",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    genes: { type: "array", items: { type: "string" } },
                    pathways: { type: "array", items: { type: "object" } },
                    coOccurrenceScore: { type: "number" },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
        },
      },
    },
    "/survival": {
      get: {
        tags: ["Survival"],
        summary: "Survival statistics for a cancer type, optionally stratified by biomarker",
        operationId: "getSurvival",
        parameters: [
          {
            name: "cancer",
            in: "query",
            required: true,
            description: "Cancer type identifier",
            schema: { type: "string" },
          },
          {
            name: "biomarker",
            in: "query",
            required: false,
            description: "Optional biomarker for stratified survival comparison",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Survival data or comparison",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    cancerType: { type: "string" },
                    medianMonths: { type: "number" },
                    fiveYearRate: { type: "number" },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": {
            description: "No survival data found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/completeness/{cancerType}": {
      get: {
        tags: ["Completeness"],
        summary: "Data completeness score for a cancer type",
        operationId: "getCompleteness",
        parameters: [
          {
            name: "cancerType",
            in: "path",
            required: true,
            description: "Cancer type identifier",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Completeness score breakdown",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    cancerType: { type: "string" },
                    overallScore: { type: "number" },
                    breakdown: { type: "object" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Dataset: {
        type: "object",
        properties: {
          id: { type: "string" },
          repositoryId: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          cancerTypes: { type: "array", items: { type: "string" } },
          dataTypes: { type: "array", items: { type: "string" } },
          patientCount: { type: "integer", nullable: true },
          sampleCount: { type: "integer", nullable: true },
          url: { type: "string", format: "uri" },
          accessModel: { type: "string" },
          lastUpdated: { type: "string" },
        },
      },
      Drug: {
        type: "object",
        properties: {
          name: { type: "string" },
          targets: { type: "array", items: { type: "string" } },
          mechanism: { type: "string" },
          approvalStatus: { type: "string" },
          indications: { type: "array", items: { type: "string" } },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
        required: ["error"],
      },
    },
    responses: {
      BadRequest: {
        description: "Missing or invalid query parameter",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
          },
        },
      },
    },
  },
} as const;
