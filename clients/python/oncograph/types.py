"""Typed dataclasses for OncoGraph API responses."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, List, Optional


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _get(d: dict, key: str, default=None):
    """Safely retrieve a value from *d*, returning *default* when missing or ``None``."""
    v = d.get(key)
    return default if v is None else v


# ---------------------------------------------------------------------------
# Domain types
# ---------------------------------------------------------------------------

@dataclass
class CancerType:
    id: str
    name: str
    parent: Optional[str] = None
    tissue: Optional[str] = None
    aliases: List[str] = field(default_factory=list)
    oncoTreeCode: Optional[str] = None
    icdO3Code: Optional[str] = None
    whoGrade: Optional[str] = None
    molecularSubtype: Optional[str] = None
    prevalence: Optional[float] = None

    @classmethod
    def from_dict(cls, d: dict) -> "CancerType":
        return cls(
            id=d["id"],
            name=d["name"],
            parent=_get(d, "parent"),
            tissue=_get(d, "tissue"),
            aliases=_get(d, "aliases", []),
            oncoTreeCode=_get(d, "oncoTreeCode"),
            icdO3Code=_get(d, "icdO3Code"),
            whoGrade=_get(d, "whoGrade"),
            molecularSubtype=_get(d, "molecularSubtype"),
            prevalence=_get(d, "prevalence"),
        )


@dataclass
class Dataset:
    id: str
    repositoryId: str
    name: str
    description: Optional[str] = None
    cancerTypes: List[str] = field(default_factory=list)
    dataTypes: List[str] = field(default_factory=list)
    patientCount: Optional[int] = None
    sampleCount: Optional[int] = None
    url: Optional[str] = None
    accessModel: Optional[str] = None
    lastUpdated: Optional[str] = None

    @classmethod
    def from_dict(cls, d: dict) -> "Dataset":
        return cls(
            id=d.get("id", ""),
            repositoryId=d.get("repositoryId", ""),
            name=d.get("name", ""),
            description=_get(d, "description"),
            cancerTypes=_get(d, "cancerTypes", []),
            dataTypes=_get(d, "dataTypes", []),
            patientCount=_get(d, "patientCount"),
            sampleCount=_get(d, "sampleCount"),
            url=_get(d, "url"),
            accessModel=_get(d, "accessModel"),
            lastUpdated=_get(d, "lastUpdated"),
        )


@dataclass
class Biomarker:
    id: str
    name: str
    gene: Optional[str] = None
    type: Optional[str] = None
    cancerTypes: List[str] = field(default_factory=list)
    clinicalSignificance: Optional[str] = None
    description: Optional[str] = None
    linkedDrugs: List[str] = field(default_factory=list)
    companionDiagnostics: List[str] = field(default_factory=list)
    source: Optional[str] = None

    @classmethod
    def from_dict(cls, d: dict) -> "Biomarker":
        return cls(
            id=d.get("id", ""),
            name=d.get("name", ""),
            gene=_get(d, "gene"),
            type=_get(d, "type"),
            cancerTypes=_get(d, "cancerTypes", []),
            clinicalSignificance=_get(d, "clinicalSignificance"),
            description=_get(d, "description"),
            linkedDrugs=_get(d, "linkedDrugs", []),
            companionDiagnostics=_get(d, "companionDiagnostics", []),
            source=_get(d, "source"),
        )


@dataclass
class Drug:
    id: str
    name: str
    aliases: List[str] = field(default_factory=list)
    targets: List[str] = field(default_factory=list)
    mechanism: Optional[str] = None
    cancerTypes: List[str] = field(default_factory=list)
    approvalStatus: Optional[str] = None
    drugClass: Optional[str] = None
    fdaApprovalIndications: List[str] = field(default_factory=list)
    associatedBiomarkers: List[str] = field(default_factory=list)

    @classmethod
    def from_dict(cls, d: dict) -> "Drug":
        return cls(
            id=d.get("id", ""),
            name=d.get("name", ""),
            aliases=_get(d, "aliases", []),
            targets=_get(d, "targets", []),
            mechanism=_get(d, "mechanism"),
            cancerTypes=_get(d, "cancerTypes", []),
            approvalStatus=_get(d, "approvalStatus"),
            drugClass=_get(d, "drugClass"),
            fdaApprovalIndications=_get(d, "fdaApprovalIndications", []),
            associatedBiomarkers=_get(d, "associatedBiomarkers", []),
        )


@dataclass
class KMCurvePoint:
    time: float
    survival: float

    @classmethod
    def from_dict(cls, d: dict) -> "KMCurvePoint":
        return cls(time=d["time"], survival=d["survival"])


@dataclass
class SurvivalData:
    cancerType: str
    biomarker: Optional[str] = None
    fiveYearSurvival: Optional[float] = None
    medianSurvivalMonths: Optional[float] = None
    hazardRatio: Optional[float] = None
    source: Optional[str] = None
    citation: Optional[str] = None
    sampleSize: Optional[int] = None
    kmCurvePoints: List[KMCurvePoint] = field(default_factory=list)

    @classmethod
    def from_dict(cls, d: dict) -> "SurvivalData":
        km_raw = _get(d, "kmCurvePoints", [])
        return cls(
            cancerType=d.get("cancerType", ""),
            biomarker=_get(d, "biomarker"),
            fiveYearSurvival=_get(d, "fiveYearSurvival") or _get(d, "fiveYearRate"),
            medianSurvivalMonths=_get(d, "medianSurvivalMonths") or _get(d, "medianMonths"),
            hazardRatio=_get(d, "hazardRatio"),
            source=_get(d, "source"),
            citation=_get(d, "citation"),
            sampleSize=_get(d, "sampleSize"),
            kmCurvePoints=[KMCurvePoint.from_dict(p) for p in km_raw],
        )


@dataclass
class PathwayAnalysis:
    mutatedGenes: List[str] = field(default_factory=list)
    affectedPathways: List[dict] = field(default_factory=list)
    downstreamEffects: List[str] = field(default_factory=list)
    drugTargets: List[str] = field(default_factory=list)

    @classmethod
    def from_dict(cls, d: dict) -> "PathwayAnalysis":
        return cls(
            mutatedGenes=_get(d, "mutatedGenes") or _get(d, "genes", []),
            affectedPathways=_get(d, "affectedPathways") or _get(d, "pathways", []),
            downstreamEffects=_get(d, "downstreamEffects", []),
            drugTargets=_get(d, "drugTargets", []),
        )


@dataclass
class DataCompletenessScore:
    cancerTypeId: str
    modalities: dict = field(default_factory=dict)
    score: Optional[float] = None
    gaps: List[str] = field(default_factory=list)

    @classmethod
    def from_dict(cls, d: dict) -> "DataCompletenessScore":
        return cls(
            cancerTypeId=d.get("cancerTypeId") or d.get("cancerType", ""),
            modalities=_get(d, "modalities") or _get(d, "breakdown", {}),
            score=_get(d, "score") or _get(d, "overallScore"),
            gaps=_get(d, "gaps", []),
        )


@dataclass
class DiscoveryResult:
    query: str = ""
    cancerType: Optional[str] = None
    datasets: List[Dataset] = field(default_factory=list)
    biomarkers: List[Biomarker] = field(default_factory=list)
    drugs: List[Drug] = field(default_factory=list)
    trials: List[dict] = field(default_factory=list)
    repositories: List[dict] = field(default_factory=list)
    timestamp: Optional[str] = None
    disclaimer: Optional[str] = None

    @classmethod
    def from_dict(cls, d: dict) -> "DiscoveryResult":
        datasets_raw = _get(d, "datasets", [])
        biomarkers_raw = _get(d, "biomarkers", [])
        drugs_raw = _get(d, "drugs", [])
        return cls(
            query=d.get("query", ""),
            cancerType=_get(d, "cancerType"),
            datasets=[Dataset.from_dict(ds) for ds in datasets_raw],
            biomarkers=[Biomarker.from_dict(b) for b in biomarkers_raw],
            drugs=[Drug.from_dict(dr) for dr in drugs_raw],
            trials=_get(d, "trials", []),
            repositories=_get(d, "repositories", []),
            timestamp=_get(d, "timestamp"),
            disclaimer=_get(d, "disclaimer"),
        )
