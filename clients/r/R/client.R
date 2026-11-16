#' Connect to OncoGraph API
#'
#' Creates a connection object that stores the API base URL. Pass this object
#' as the first argument to all other \code{og_*} functions.
#'
#' @param base_url Base URL of the OncoGraph API server (default: \code{"http://localhost:3737"})
#' @return An OncoGraph connection object (environment)
#' @export
#' @examples
#' \dontrun{
#' conn <- og_connect()
#' conn <- og_connect("https://api.oncograph.org")
#' }
og_connect <- function(base_url = "http://localhost:3737") {
  # Strip trailing slash
  base_url <- sub("/$", "", base_url)
  conn <- new.env(parent = emptyenv())
  conn$base_url <- base_url
  class(conn) <- "oncograph_connection"
  conn
}

#' @export
print.oncograph_connection <- function(x, ...) {
  cat("OncoGraph connection\n")
  cat("  base_url:", x$base_url, "\n")
  invisible(x)
}

#' Discover cancer data
#'
#' Performs a multi-modal discovery query across all federated repositories,
#' returning datasets, biomarkers, drugs, trials, and repository information
#' for a given cancer type.
#'
#' @param conn OncoGraph connection object created by \code{\link{og_connect}}
#' @param cancer Cancer type query string (e.g. \code{"lung adenocarcinoma"})
#' @param data_types Optional character vector of data types to filter
#'   (e.g. \code{c("genomic", "imaging")})
#' @param access_model Optional character vector of access models to filter
#'   (e.g. \code{c("open", "controlled")})
#' @return A list with datasets, biomarkers, drugs, trials, and repositories
#' @export
#' @examples
#' \dontrun{
#' conn <- og_connect()
#' result <- og_discover(conn, "breast cancer")
#' result <- og_discover(conn, "NSCLC", data_types = c("genomic", "clinical"))
#' }
og_discover <- function(conn, cancer, data_types = NULL, access_model = NULL) {
  query <- list(cancer = cancer)
  if (!is.null(data_types)) {
    query$dataTypes <- paste(data_types, collapse = ",")
  }
  if (!is.null(access_model)) {
    query$accessModel <- paste(access_model, collapse = ",")
  }
  .og_get(conn, "/discover", query)
}

#' Get biomarkers for a cancer type
#'
#' Returns biomarkers associated with the specified cancer type, including
#' gene names, alteration types, clinical significance, and evidence levels.
#'
#' @param conn OncoGraph connection object created by \code{\link{og_connect}}
#' @param cancer_type Cancer type ID (e.g. \code{"brca"}, \code{"nsclc"})
#' @return A data.frame of biomarkers
#' @export
#' @examples
#' \dontrun{
#' conn <- og_connect()
#' biomarkers <- og_biomarkers(conn, "brca")
#' }
og_biomarkers <- function(conn, cancer_type) {
  res <- .og_get(conn, paste0("/biomarkers/", cancer_type))
  .to_df(res$biomarkers, c("gene", "alteration", "cancerTypes",
                            "clinicalSignificance", "evidenceLevel"))
}

#' Get drugs by molecular target
#'
#' Returns drugs that target the specified gene or molecular target.
#'
#' @param conn OncoGraph connection object created by \code{\link{og_connect}}
#' @param target Gene or molecular target name (e.g. \code{"BRAF"}, \code{"EGFR"})
#' @return A data.frame of drugs
#' @export
#' @examples
#' \dontrun{
#' conn <- og_connect()
#' drugs <- og_drugs(conn, "BRAF")
#' }
og_drugs <- function(conn, target) {
  res <- .og_get(conn, paste0("/drugs/", target))
  .to_df(res$drugs, c("name", "targets", "mechanism", "approvedIndications"))
}

#' Get datasets for a repository
#'
#' Returns all datasets registered under the specified repository.
#'
#' @param conn OncoGraph connection object created by \code{\link{og_connect}}
#' @param repository Repository ID (e.g. \code{"gdc"}, \code{"idc"})
#' @return A data.frame of datasets
#' @export
#' @examples
#' \dontrun{
#' conn <- og_connect()
#' datasets <- og_datasets(conn, "gdc")
#' }
og_datasets <- function(conn, repository) {
  res <- .og_get(conn, paste0("/datasets/", repository))
  .to_df(res$datasets, c("id", "name", "repositoryId", "dataType",
                          "accessModel", "cancerTypes"))
}

#' Full-text search
#'
#' Searches across all datasets, biomarkers, and drugs in the OncoGraph index.
#'
#' @param conn OncoGraph connection object created by \code{\link{og_connect}}
#' @param query Search query string
#' @return A list with \code{results} and \code{total} count
#' @export
#' @examples
#' \dontrun{
#' conn <- og_connect()
#' results <- og_search(conn, "KRAS mutation")
#' }
og_search <- function(conn, query) {
  .og_get(conn, "/search", list(q = query))
}

#' Analyze cancer signaling pathways
#'
#' Given a set of mutated genes, identifies affected signaling pathways,
#' potential drug targets, and downstream effects.
#'
#' @param conn OncoGraph connection object created by \code{\link{og_connect}}
#' @param genes Character vector of gene names (e.g. \code{c("BRAF", "KRAS")})
#' @return A list with \code{affectedPathways}, \code{drugTargets}, and
#'   \code{downstreamEffects}
#' @export
#' @examples
#' \dontrun{
#' conn <- og_connect()
#' pathways <- og_pathways(conn, c("BRAF", "KRAS", "TP53"))
#' }
og_pathways <- function(conn, genes) {
  .og_get(conn, "/pathways", list(genes = paste(genes, collapse = ",")))
}

#' Get survival statistics
#'
#' Returns survival data for a cancer type, optionally stratified by biomarker.
#' When a biomarker is provided, returns a comparison between biomarker-positive
#' and biomarker-negative groups.
#'
#' @param conn OncoGraph connection object created by \code{\link{og_connect}}
#' @param cancer Cancer type (e.g. \code{"breast cancer"}, \code{"NSCLC"})
#' @param biomarker Optional biomarker for stratified survival analysis
#' @return A list with survival data including Kaplan-Meier curve points
#' @export
#' @examples
#' \dontrun{
#' conn <- og_connect()
#' surv <- og_survival(conn, "breast cancer")
#' surv_strat <- og_survival(conn, "NSCLC", biomarker = "EGFR")
#' }
og_survival <- function(conn, cancer, biomarker = NULL) {
  query <- list(cancer = cancer)
  if (!is.null(biomarker)) {
    query$biomarker <- biomarker
  }
  .og_get(conn, "/survival", query)
}

#' Get data completeness score
#'
#' Returns a data completeness assessment for the specified cancer type,
#' including an overall score, per-modality coverage, and identified gaps.
#'
#' @param conn OncoGraph connection object created by \code{\link{og_connect}}
#' @param cancer_type Cancer type ID (e.g. \code{"brca"})
#' @return A list with \code{score}, \code{modalities}, and \code{gaps}
#' @export
#' @examples
#' \dontrun{
#' conn <- og_connect()
#' completeness <- og_completeness(conn, "brca")
#' }
og_completeness <- function(conn, cancer_type) {
  .og_get(conn, paste0("/completeness/", cancer_type))
}

#' Get clinical trials
#'
#' Returns clinical trials for a cancer type, optionally filtered by biomarker.
#'
#' @param conn OncoGraph connection object created by \code{\link{og_connect}}
#' @param cancer Cancer type (e.g. \code{"lung cancer"})
#' @param biomarker Optional biomarker filter
#' @return A data.frame of clinical trials
#' @export
#' @examples
#' \dontrun{
#' conn <- og_connect()
#' trials <- og_trials(conn, "lung cancer")
#' trials <- og_trials(conn, "NSCLC", biomarker = "EGFR")
#' }
og_trials <- function(conn, cancer, biomarker = NULL) {
  query <- list(cancer = cancer)
  if (!is.null(biomarker)) {
    query$biomarker <- biomarker
  }
  res <- .og_get(conn, "/trials", query)
  .to_df(res$trials, c("id", "title", "phase", "status", "cancerType"))
}

#' Check API health
#'
#' Returns the health status of the OncoGraph API server, including version
#' and package count.
#'
#' @param conn OncoGraph connection object created by \code{\link{og_connect}}
#' @return A list with \code{status}, \code{version}, \code{packages}, and
#'   \code{timestamp}
#' @export
#' @examples
#' \dontrun{
#' conn <- og_connect()
#' og_health(conn)
#' }
og_health <- function(conn) {
  .og_get(conn, "/health")
}
