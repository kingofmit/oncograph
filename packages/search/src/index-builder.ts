import { Dataset, Biomarker, Drug } from "@oncograph/core";

/** Simple inverted index for cancer data search */
export class CancerSearchIndex {
  private index = new Map<string, Set<string>>();
  private documents = new Map<string, { text: string; type: string; metadata: Record<string, unknown> }>();

  addDataset(ds: Dataset): void {
    const text = [ds.name, ds.description, ds.cancerTypes.join(" "), ds.dataTypes.join(" ")].join(" ");
    this.addDocument(ds.id, text, "dataset", { name: ds.name, repositoryId: ds.repositoryId });
  }

  addBiomarker(bm: Biomarker): void {
    const text = [bm.name, bm.gene ?? "", bm.description, bm.cancerTypes.join(" "), bm.type].join(" ");
    this.addDocument(bm.id, text, "biomarker", { name: bm.name, gene: bm.gene });
  }

  addDrug(drug: Drug): void {
    const text = [drug.name, ...drug.aliases, drug.mechanism, drug.targets.join(" "), drug.cancerTypes.join(" ")].join(" ");
    this.addDocument(drug.id, text, "drug", { name: drug.name, targets: drug.targets });
  }

  search(query: string, limit = 20): Array<{ id: string; score: number; type: string; metadata: Record<string, unknown> }> {
    const tokens = this.tokenize(query);
    const scores = new Map<string, number>();
    for (const token of tokens) {
      const docIds = this.index.get(token);
      if (!docIds) continue;
      const idf = Math.log(this.documents.size / docIds.size);
      for (const docId of docIds) scores.set(docId, (scores.get(docId) ?? 0) + idf);
    }
    return Array.from(scores.entries())
      .map(([id, score]) => ({ id, score, type: this.documents.get(id)?.type ?? "", metadata: this.documents.get(id)?.metadata ?? {} }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  private addDocument(id: string, text: string, type: string, metadata: Record<string, unknown>): void {
    this.documents.set(id, { text, type, metadata });
    for (const token of this.tokenize(text)) {
      if (!this.index.has(token)) this.index.set(token, new Set());
      this.index.get(token)!.add(id);
    }
  }

  private tokenize(text: string): string[] {
    return text.toLowerCase().replace(/[^\w\s-]/g, " ").split(/\s+/).filter((t) => t.length > 1);
  }

  get size(): number { return this.documents.size; }
}
