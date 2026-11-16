"""OncoGraph Python client."""

from __future__ import annotations

from typing import Any, Dict, List, Optional, Union

import requests

from .types import (
    Biomarker,
    DataCompletenessScore,
    Dataset,
    DiscoveryResult,
    Drug,
    PathwayAnalysis,
    SurvivalData,
)


class OncoGraphError(Exception):
    """Raised when the OncoGraph API returns a non-200 response."""

    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message
        super().__init__(f"[{status_code}] {message}")


class OncoGraphClient:
    """Thin wrapper around the OncoGraph REST API.

    Parameters
    ----------
    base_url:
        Root URL of the OncoGraph API server (default ``http://localhost:3737``).
    timeout:
        Request timeout in seconds (default ``30``).
    """

    def __init__(
        self,
        base_url: str = "http://localhost:3737",
        timeout: int = 30,
    ):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self._session = requests.Session()

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    def _get(self, path: str, params: Optional[Dict[str, Any]] = None) -> Any:
        """Perform a GET request and return parsed JSON."""
        url = f"{self.base_url}{path}"
        resp = self._session.get(url, params=params, timeout=self.timeout)
        if resp.status_code != 200:
            try:
                detail = resp.json().get("error", resp.text)
            except Exception:
                detail = resp.text
            raise OncoGraphError(resp.status_code, detail)
        return resp.json()

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def health(self) -> dict:
        """Check API server health.

        Returns a dict with keys like ``status``, ``version``, ``packages``, ``timestamp``.
        """
        return self._get("/health")

    def discover(
        self,
        cancer: str,
        data_types: Optional[List[str]] = None,
        access_model: Optional[List[str]] = None,
    ) -> DiscoveryResult:
        """Multi-modal cancer data discovery.

        Parameters
        ----------
        cancer:
            Cancer type identifier (e.g. ``"brca"``, ``"nsclc"``).
        data_types:
            Optional list of data types to filter (e.g. ``["genomic", "imaging"]``).
        access_model:
            Optional list of access models (e.g. ``["open", "controlled"]``).
        """
        params: Dict[str, str] = {"cancer": cancer}
        if data_types:
            params["dataTypes"] = ",".join(data_types)
        if access_model:
            params["accessModel"] = ",".join(access_model)
        data = self._get("/discover", params)
        return DiscoveryResult.from_dict(data)

    def biomarkers(self, cancer_type: str) -> List[Biomarker]:
        """Get biomarkers for a cancer type.

        Parameters
        ----------
        cancer_type:
            Cancer type identifier (e.g. ``"brca"``).
        """
        data = self._get(f"/biomarkers/{cancer_type}")
        raw = data.get("biomarkers", [])
        return [Biomarker.from_dict(b) for b in raw]

    def drugs(self, target: str) -> List[Drug]:
        """Get drugs targeting a specific gene or molecular target.

        Parameters
        ----------
        target:
            Gene or target name (e.g. ``"BRAF"``, ``"EGFR"``).
        """
        data = self._get(f"/drugs/{target}")
        raw = data.get("drugs", [])
        return [Drug.from_dict(d) for d in raw]

    def datasets(self, repository: str) -> List[Dataset]:
        """Get datasets for a given repository.

        Parameters
        ----------
        repository:
            Repository identifier (e.g. ``"gdc"``, ``"depmap"``).
        """
        data = self._get(f"/datasets/{repository}")
        raw = data.get("datasets", [])
        return [Dataset.from_dict(ds) for ds in raw]

    def search(self, query: str) -> dict:
        """Full-text search across all data.

        Parameters
        ----------
        query:
            Free-text search string.

        Returns a dict with ``query``, ``results``, and ``total`` keys.
        """
        return self._get("/search", {"q": query})

    def pathways(self, genes: List[str]) -> PathwayAnalysis:
        """Pathway analysis for a set of mutated genes.

        Parameters
        ----------
        genes:
            List of gene names (e.g. ``["TP53", "KRAS", "BRAF"]``).
        """
        data = self._get("/pathways", {"genes": ",".join(genes)})
        return PathwayAnalysis.from_dict(data)

    def survival(
        self,
        cancer: str,
        biomarker: Optional[str] = None,
    ) -> Union[SurvivalData, dict]:
        """Survival statistics for a cancer type.

        Parameters
        ----------
        cancer:
            Cancer type identifier.
        biomarker:
            Optional biomarker for stratified survival comparison.

        Returns :class:`SurvivalData` when possible, or the raw dict for
        complex comparison responses.
        """
        params: Dict[str, str] = {"cancer": cancer}
        if biomarker:
            params["biomarker"] = biomarker
        data = self._get("/survival", params)
        try:
            return SurvivalData.from_dict(data)
        except (KeyError, TypeError):
            return data

    def completeness(self, cancer_type: str) -> DataCompletenessScore:
        """Data completeness score for a cancer type.

        Parameters
        ----------
        cancer_type:
            Cancer type identifier.
        """
        data = self._get(f"/completeness/{cancer_type}")
        return DataCompletenessScore.from_dict(data)

    def trials(
        self,
        cancer: str,
        biomarker: Optional[str] = None,
    ) -> List[dict]:
        """Clinical trials for a cancer type.

        Parameters
        ----------
        cancer:
            Cancer type identifier.
        biomarker:
            Optional biomarker to narrow results.
        """
        params: Dict[str, str] = {"cancer": cancer}
        if biomarker:
            params["biomarker"] = biomarker
        data = self._get("/trials", params)
        return data.get("trials", [])
