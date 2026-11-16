import {
  Dataset,
  Biomarker,
  Drug,
  Pathway,
  SurvivalData,
  ClinicalTrial,
} from "@oncograph/core";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SearchResult {
  id: string;
  score: number;
  type: string;
  metadata: Record<string, unknown>;
}

/** Per-field weight multipliers used when computing TF-IDF scores. */
const FIELD_BOOST: Record<string, number> = {
  name: 3,
  title: 3,
  gene: 2,
  genes: 2,
  cancerType: 2,
  cancerTypes: 2,
  nctId: 2,
  description: 1,
  mechanism: 1,
  aliases: 1,
  targets: 1,
  dataTypes: 1,
  interventions: 1,
  therapeuticVulnerabilities: 1,
  source: 1,
  citation: 1,
  drugClass: 1,
  fdaApprovalIndications: 1,
  linkedDrugs: 1,
  companionDiagnostics: 1,
  type: 1,
};

// ---------------------------------------------------------------------------
// Synonym map
// ---------------------------------------------------------------------------

const SYNONYM_ENTRIES: Array<[string, string[]]> = [
  ["gbm", ["glioblastoma", "glioblastoma multiforme"]],
  ["glioblastoma", ["gbm", "glioblastoma multiforme"]],
  ["brca", ["breast cancer", "breast carcinoma"]],
  ["breast cancer", ["brca", "breast carcinoma"]],
  ["crc", ["colorectal", "colon cancer", "colorectal cancer"]],
  ["colorectal", ["crc", "colon cancer", "colorectal cancer"]],
  ["colon cancer", ["crc", "colorectal", "colorectal cancer"]],
  ["nsclc", ["non-small cell lung", "lung adenocarcinoma", "non-small cell lung cancer"]],
  ["lung adenocarcinoma", ["nsclc", "non-small cell lung", "non-small cell lung cancer"]],
  ["aml", ["acute myeloid leukemia"]],
  ["acute myeloid leukemia", ["aml"]],
  ["cml", ["chronic myeloid leukemia"]],
  ["chronic myeloid leukemia", ["cml"]],
  ["all", ["acute lymphoblastic leukemia"]],
  ["acute lymphoblastic leukemia", ["all"]],
  ["hcc", ["hepatocellular", "hepatocellular carcinoma", "liver cancer"]],
  ["hepatocellular", ["hcc", "hepatocellular carcinoma", "liver cancer"]],
  ["liver cancer", ["hcc", "hepatocellular", "hepatocellular carcinoma"]],
  ["rcc", ["renal cell carcinoma", "kidney cancer"]],
  ["renal cell carcinoma", ["rcc", "kidney cancer"]],
  ["kidney cancer", ["rcc", "renal cell carcinoma"]],
  ["tnbc", ["triple negative breast", "triple negative breast cancer"]],
  ["triple negative breast", ["tnbc", "triple negative breast cancer"]],
  ["dlbcl", ["diffuse large b-cell lymphoma"]],
  ["diffuse large b-cell lymphoma", ["dlbcl"]],
  ["sclc", ["small cell lung cancer"]],
  ["small cell lung cancer", ["sclc"]],
  ["melanoma", ["malignant melanoma"]],
  ["malignant melanoma", ["melanoma"]],
  ["nhl", ["non-hodgkin lymphoma"]],
  ["non-hodgkin lymphoma", ["nhl"]],
  ["hl", ["hodgkin lymphoma", "hodgkin disease"]],
  ["hodgkin lymphoma", ["hl", "hodgkin disease"]],
  ["pcnsl", ["primary cns lymphoma"]],
  ["primary cns lymphoma", ["pcnsl"]],
  ["mpn", ["myeloproliferative neoplasm"]],
  ["myeloproliferative neoplasm", ["mpn"]],
  ["mds", ["myelodysplastic syndrome"]],
  ["myelodysplastic syndrome", ["mds"]],
  ["gist", ["gastrointestinal stromal tumor"]],
  ["gastrointestinal stromal tumor", ["gist"]],
  ["pdac", ["pancreatic ductal adenocarcinoma", "pancreatic cancer"]],
  ["pancreatic cancer", ["pdac", "pancreatic ductal adenocarcinoma"]],
];

/** Lookup: normalised query term -> set of synonym tokens to also search. */
const SYNONYM_MAP = new Map<string, Set<string>>();
for (const [key, synonyms] of SYNONYM_ENTRIES) {
  const tokens = new Set<string>();
  for (const syn of synonyms) {
    for (const t of tokenizeRaw(syn)) tokens.add(t);
  }
  SYNONYM_MAP.set(key, tokens);
}

// ---------------------------------------------------------------------------
// Tokenisation helpers (module-level so the synonym bootstrap can use them)
// ---------------------------------------------------------------------------

/**
 * Tokenise text while keeping:
 *  - hyphens inside words  (HER2-positive)
 *  - numbers attached to letters (BRCA1, 1p19q, CDK4)
 */
function tokenizeRaw(text: string): string[] {
  return text
    .toLowerCase()
    // Replace characters that are NOT word-chars, hyphens, or whitespace
    .replace(/[^\w\s-]/g, " ")
    // Collapse whitespace
    .split(/\s+/)
    // Drop very short tokens and stray hyphens
    .filter((t) => t.length > 1 && t !== "--");
}

// ---------------------------------------------------------------------------
// Internal document representation
// ---------------------------------------------------------------------------

interface IndexedField {
  tokens: string[];
  boost: number;
}

interface StoredDocument {
  type: string;
  metadata: Record<string, unknown>;
  /** All fields that were indexed, with their tokens and boosts. */
  fields: IndexedField[];
  /** Total token count across all fields (used to normalise TF). */
  totalTokens: number;
}

// ---------------------------------------------------------------------------
// Main class
// ---------------------------------------------------------------------------

/** Full-text TF-IDF search index for oncology entities. */
export class CancerSearchIndex {
  /** Inverted index: token -> set of doc IDs containing that token. */
  private invertedIndex = new Map<string, Set<string>>();

  /** Forward store of all indexed documents. */
  private documents = new Map<string, StoredDocument>();

  // -----------------------------------------------------------------------
  // Public add* methods
  // -----------------------------------------------------------------------

  addDataset(ds: Dataset): void {
    this.indexEntity(ds.id, "dataset", { name: ds.name, repositoryId: ds.repositoryId }, [
      { text: ds.name, boost: FIELD_BOOST.name! },
      { text: ds.description, boost: FIELD_BOOST.description! },
      { text: ds.cancerTypes.join(" "), boost: FIELD_BOOST.cancerTypes! },
      { text: ds.dataTypes.join(" "), boost: FIELD_BOOST.dataTypes! },
    ]);
  }

  addBiomarker(bm: Biomarker): void {
    this.indexEntity(bm.id, "biomarker", { name: bm.name, gene: bm.gene }, [
      { text: bm.name, boost: FIELD_BOOST.name! },
      { text: bm.gene ?? "", boost: FIELD_BOOST.gene! },
      { text: bm.description, boost: FIELD_BOOST.description! },
      { text: bm.cancerTypes.join(" "), boost: FIELD_BOOST.cancerTypes! },
      { text: bm.type, boost: FIELD_BOOST.type! },
      { text: (bm.linkedDrugs ?? []).join(" "), boost: FIELD_BOOST.linkedDrugs! },
      { text: (bm.companionDiagnostics ?? []).join(" "), boost: FIELD_BOOST.companionDiagnostics! },
    ]);
  }

  addDrug(drug: Drug): void {
    this.indexEntity(drug.id, "drug", { name: drug.name, targets: drug.targets }, [
      { text: drug.name, boost: FIELD_BOOST.name! },
      { text: drug.aliases.join(" "), boost: FIELD_BOOST.aliases! },
      { text: drug.mechanism, boost: FIELD_BOOST.mechanism! },
      { text: drug.targets.join(" "), boost: FIELD_BOOST.targets! },
      { text: drug.cancerTypes.join(" "), boost: FIELD_BOOST.cancerTypes! },
      { text: drug.drugClass ?? "", boost: FIELD_BOOST.drugClass! },
      { text: (drug.fdaApprovalIndications ?? []).join(" "), boost: FIELD_BOOST.fdaApprovalIndications! },
    ]);
  }

  addPathway(pathway: Pathway): void {
    this.indexEntity(pathway.id, "pathway", { name: pathway.name, genes: pathway.genes }, [
      { text: pathway.name, boost: FIELD_BOOST.name! },
      { text: pathway.genes.join(" "), boost: FIELD_BOOST.genes! },
      { text: pathway.description, boost: FIELD_BOOST.description! },
      { text: pathway.therapeuticVulnerabilities.join(" "), boost: FIELD_BOOST.therapeuticVulnerabilities! },
    ]);
  }

  addSurvivalData(data: SurvivalData): void {
    const id = `survival:${data.cancerType}:${data.biomarker ?? "all"}`;
    this.indexEntity(id, "survival", { cancerType: data.cancerType, biomarker: data.biomarker, fiveYearSurvival: data.fiveYearSurvival }, [
      { text: data.cancerType, boost: FIELD_BOOST.cancerType! },
      { text: data.biomarker ?? "", boost: FIELD_BOOST.gene! },
      { text: data.source, boost: FIELD_BOOST.source! },
      { text: data.citation ?? "", boost: FIELD_BOOST.citation! },
    ]);
  }

  addTrial(trial: ClinicalTrial): void {
    this.indexEntity(trial.id, "trial", { nctId: trial.nctId, title: trial.title }, [
      { text: trial.nctId, boost: FIELD_BOOST.nctId! },
      { text: trial.title, boost: FIELD_BOOST.title! },
      { text: trial.interventions.join(" "), boost: FIELD_BOOST.interventions! },
      { text: trial.cancerTypes.join(" "), boost: FIELD_BOOST.cancerTypes! },
    ]);
  }

  // -----------------------------------------------------------------------
  // Search
  // -----------------------------------------------------------------------

  search(query: string, limit = 20): SearchResult[] {
    const queryTokens = tokenizeRaw(query);

    // Expand query with synonyms
    const expandedTokens = new Set(queryTokens);
    // Also try multi-token synonym matches against the original lowered query
    const lowerQuery = query.toLowerCase();
    for (const [phrase, synTokens] of SYNONYM_MAP) {
      // Check if the query contains this synonym phrase
      if (lowerQuery.includes(phrase)) {
        for (const t of synTokens) expandedTokens.add(t);
      }
    }
    // Single-token synonym lookup
    for (const token of queryTokens) {
      const syns = SYNONYM_MAP.get(token);
      if (syns) {
        for (const s of syns) expandedTokens.add(s);
      }
    }

    const totalDocs = this.documents.size;
    if (totalDocs === 0) return [];

    const scores = new Map<string, number>();

    for (const token of expandedTokens) {
      const postings = this.invertedIndex.get(token);
      if (!postings || postings.size === 0) continue;

      const idf = Math.log(totalDocs / postings.size);

      for (const docId of postings) {
        const doc = this.documents.get(docId)!;
        // Compute boosted TF across all fields
        let weightedTf = 0;
        for (const field of doc.fields) {
          let count = 0;
          for (const ft of field.tokens) {
            if (ft === token) count++;
          }
          if (count > 0) {
            // TF normalised by total document tokens, boosted by field weight
            const tf = count / doc.totalTokens;
            weightedTf += tf * field.boost;
          }
        }

        if (weightedTf > 0) {
          const tfidf = weightedTf * idf;
          scores.set(docId, (scores.get(docId) ?? 0) + tfidf);
        }
      }
    }

    return Array.from(scores.entries())
      .map(([id, score]) => {
        const doc = this.documents.get(id)!;
        return { id, score, type: doc.type, metadata: doc.metadata };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  // -----------------------------------------------------------------------
  // Accessors
  // -----------------------------------------------------------------------

  get size(): number {
    return this.documents.size;
  }

  // -----------------------------------------------------------------------
  // Internals
  // -----------------------------------------------------------------------

  private indexEntity(
    id: string,
    type: string,
    metadata: Record<string, unknown>,
    rawFields: Array<{ text: string; boost: number }>,
  ): void {
    const fields: IndexedField[] = [];
    let totalTokens = 0;

    for (const rf of rawFields) {
      const tokens = tokenizeRaw(rf.text);
      totalTokens += tokens.length;
      fields.push({ tokens, boost: rf.boost });

      // Populate inverted index
      for (const token of tokens) {
        let set = this.invertedIndex.get(token);
        if (!set) {
          set = new Set();
          this.invertedIndex.set(token, set);
        }
        set.add(id);
      }
    }

    // Guard against zero-length docs (avoid division by zero in TF)
    if (totalTokens === 0) totalTokens = 1;

    this.documents.set(id, { type, metadata, fields, totalTokens });
  }
}
