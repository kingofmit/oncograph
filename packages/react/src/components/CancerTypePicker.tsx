import React, { useState, useCallback } from "react";
import type { CancerType } from "@oncograph/core";
import { useCancerType } from "../hooks/use-cancer-type";

export interface CancerTypePickerProps {
  onSelect: (cancerType: CancerType) => void;
  placeholder?: string;
}

export function CancerTypePicker({
  onSelect,
  placeholder = "Search cancer types...",
}: CancerTypePickerProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { data: match, loading } = useCancerType(query);

  const handleSelect = useCallback(
    (ct: CancerType) => {
      setQuery(ct.name);
      setOpen(false);
      onSelect(ct);
    },
    [onSelect],
  );

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        aria-label="Cancer type search"
        role="combobox"
        aria-expanded={open && match != null}
      />
      {open && query.length > 0 && (
        <ul role="listbox" style={{ position: "absolute", margin: 0, padding: 0, listStyle: "none", zIndex: 10 }}>
          {loading && <li aria-busy="true">Loading...</li>}
          {match && (
            <li key={match.id} role="option" onClick={() => handleSelect(match)} style={{ cursor: "pointer" }}>
              <strong>{match.name}</strong>
              {match.tissue && <span> — {match.tissue}</span>}
              {match.oncoTreeCode && <small> ({match.oncoTreeCode})</small>}
            </li>
          )}
          {!loading && !match && <li>No results found</li>}
        </ul>
      )}
    </div>
  );
}
