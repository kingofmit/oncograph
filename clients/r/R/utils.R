# Internal helper functions for the oncograph R client
# These are not exported and are used by the client functions in client.R.

#' Make a GET request to the OncoGraph API
#'
#' @param conn OncoGraph connection object
#' @param path API endpoint path (e.g. "/health")
#' @param query Named list of query parameters
#' @return Parsed response body as a list
#' @keywords internal
.og_get <- function(conn, path, query = list()) {
  url <- paste0(conn$base_url, path)
  resp <- httr::GET(url, query = query)
  if (httr::status_code(resp) != 200) {
    body <- tryCatch(
      httr::content(resp, as = "parsed"),
      error = function(e) list(error = "Unknown error")
    )
    stop(
      paste0("OncoGraph API error (", httr::status_code(resp), "): ", body$error),
      call. = FALSE
    )
  }
  httr::content(resp, as = "parsed")
}

#' Convert a list of records to a data.frame
#'
#' @param lst A list of lists (each inner list is one record)
#' @param cols Character vector of column names to extract
#' @return A data.frame, or an empty data.frame if lst is empty
#' @keywords internal
.to_df <- function(lst, cols) {
  if (length(lst) == 0) return(data.frame())
  rows <- lapply(lst, function(x) {
    vals <- lapply(cols, function(col) {
      val <- x[[col]]
      if (is.null(val)) {
        NA
      } else if (is.list(val)) {
        paste(unlist(val), collapse = ", ")
      } else {
        val
      }
    })
    names(vals) <- cols
    data.frame(vals, stringsAsFactors = FALSE)
  })
  do.call(rbind, rows)
}
