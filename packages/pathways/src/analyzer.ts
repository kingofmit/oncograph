import type { PathwayAnalysis } from "@oncograph/core";
import { CANCER_PATHWAYS, getPathwaysByGene } from "./pathways";

/**
 * Downstream effect descriptions keyed by pathway id.
 * Describes the biological consequence when the pathway is somatically altered.
 */
const DOWNSTREAM_EFFECTS: Record<string, string> = {
  "mapk-erk":
    "Constitutive RAS-RAF-MEK-ERK activation drives uncontrolled proliferation and resistance to apoptosis.",
  "pi3k-akt-mtor":
    "Unchecked PI3K/AKT/mTOR signaling promotes cell survival, metabolic reprogramming, and protein synthesis.",
  "wnt-beta-catenin":
    "Beta-catenin stabilization activates Wnt target genes, expanding stem-like cell populations.",
  "p53":
    "Loss of p53 function impairs DNA damage checkpoints, enabling accumulation of genomic instability.",
  "rb-cell-cycle":
    "Disrupted Rb/E2F axis allows unchecked G1-to-S transition and uncontrolled DNA replication.",
  "notch":
    "Dysregulated Notch signaling perturbs cell fate decisions and can promote or suppress tumors depending on context.",
  "hedgehog":
    "Aberrant Hedgehog activation drives tumor-initiating cell self-renewal, especially in basal cell carcinoma and medulloblastoma.",
  "jak-stat":
    "Constitutive JAK/STAT activation promotes proliferation, survival, and immune evasion via cytokine-independent signaling.",
  "nf-kb":
    "Chronic NF-kB activation sustains inflammatory microenvironment and anti-apoptotic gene expression.",
  "tgf-beta":
    "Loss of TGF-beta tumor suppression enables epithelial-mesenchymal transition and metastatic dissemination.",
  "hippo":
    "YAP/TAZ nuclear accumulation drives transcription of pro-growth and anti-apoptotic target genes.",
  "hrr-dna-repair":
    "Homologous recombination deficiency leads to genomic instability, increased mutagenesis, and PARP inhibitor sensitivity.",
  "mmr":
    "Mismatch repair deficiency causes microsatellite instability, high mutational burden, and neoantigen generation.",
  "rtk":
    "Constitutive receptor tyrosine kinase signaling feeds into MAPK, PI3K, and STAT cascades driving proliferation and survival.",
  "vegf-angiogenesis":
    "Upregulated VEGF signaling promotes tumor neovascularization, enabling growth beyond diffusion limits.",
  "apoptosis":
    "Evasion of apoptosis allows damaged cells to survive and accumulate further oncogenic alterations.",
  "chromatin-remodeling":
    "SWI/SNF loss disrupts chromatin accessibility, silencing tumor suppressors and creating epigenetic dependencies.",
  "idh-metabolic":
    "IDH mutation-derived 2-HG blocks differentiation through DNA and histone hypermethylation.",
  "epigenetic":
    "Disrupted epigenetic regulation leads to aberrant gene silencing/activation and clonal hematopoiesis.",
  "immune-checkpoint":
    "Tumor upregulation of checkpoint ligands suppresses anti-tumor T cell responses, enabling immune evasion.",
};

/**
 * Analyze which cancer signaling pathways are affected by a set of mutated genes.
 *
 * @param mutatedGenes - Array of HUGO gene symbols (case-insensitive).
 * @returns PathwayAnalysis with affected pathways, downstream effects, and drug targets.
 */
export function analyzePathways(mutatedGenes: string[]): PathwayAnalysis {
  const normalised = mutatedGenes.map((g) => g.toUpperCase());
  const seen = new Set<string>();

  const affectedPathways = CANCER_PATHWAYS.filter((p) => {
    const hit = p.genes.some((g) => normalised.includes(g));
    if (hit && !seen.has(p.id)) {
      seen.add(p.id);
      return true;
    }
    return false;
  });

  const downstreamEffects = affectedPathways
    .map((p) => DOWNSTREAM_EFFECTS[p.id])
    .filter((e): e is string => e !== undefined);

  const drugTargets: PathwayAnalysis["drugTargets"] = [];

  for (const gene of normalised) {
    const pathways = getPathwaysByGene(gene);
    for (const pathway of pathways) {
      for (const drug of pathway.therapeuticVulnerabilities) {
        drugTargets.push({
          drug,
          target: gene,
          pathway: pathway.name,
        });
      }
    }
  }

  // Deduplicate drug targets
  const unique = new Map<string, (typeof drugTargets)[number]>();
  for (const dt of drugTargets) {
    const key = `${dt.drug}|${dt.target}|${dt.pathway}`;
    if (!unique.has(key)) {
      unique.set(key, dt);
    }
  }

  return {
    mutatedGenes: normalised,
    affectedPathways,
    downstreamEffects,
    drugTargets: [...unique.values()],
  };
}
