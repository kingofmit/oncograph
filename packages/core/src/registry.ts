import { Repository, Dataset, Biomarker, Drug, ClinicalTrial } from "./types";

/** Central registry for all data sources */
export class DataRegistry {
  private repositories = new Map<string, Repository>();
  private datasets: Dataset[] = [];
  private biomarkers: Biomarker[] = [];
  private drugs: Drug[] = [];
  private trials: ClinicalTrial[] = [];

  registerRepository(repo: Repository): void { this.repositories.set(repo.id, repo); }
  registerDataset(ds: Dataset): void { this.datasets.push(ds); }
  registerBiomarker(bm: Biomarker): void { this.biomarkers.push(bm); }
  registerDrug(drug: Drug): void { this.drugs.push(drug); }
  registerTrial(trial: ClinicalTrial): void { this.trials.push(trial); }

  findDatasets(cancerTypeId: string, dataTypes?: string[]): Dataset[] {
    return this.datasets.filter((ds) => {
      const matchesCancer = ds.cancerTypes.includes(cancerTypeId) || ds.cancerTypes.includes("pan-cancer");
      const matchesType = !dataTypes || dataTypes.some((dt) => ds.dataTypes.includes(dt as any));
      return matchesCancer && matchesType;
    });
  }

  findBiomarkers(cancerTypeId: string): Biomarker[] {
    return this.biomarkers.filter((bm) => bm.cancerTypes.includes(cancerTypeId));
  }

  findDrugs(cancerTypeId: string): Drug[] {
    return this.drugs.filter((d) => d.cancerTypes.includes(cancerTypeId));
  }

  findTrials(cancerTypeId: string): ClinicalTrial[] {
    return this.trials.filter((t) => t.cancerTypes.includes(cancerTypeId));
  }

  getRepository(id: string): Repository | undefined { return this.repositories.get(id); }
  getAllRepositories(): Repository[] { return Array.from(this.repositories.values()); }
  getDatasetCount(): number { return this.datasets.length; }
}
