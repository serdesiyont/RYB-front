"use client";

import { useEffect, useRef, useState } from "react";
import { searchEntities } from "@/lib/api/search";

export type SearchMode = "professors" | "schools";

export interface SearchResult {
  id: string;
  name: string;
  subtitle?: string;
  type: SearchMode;
}

interface SearchParams {
  mode: SearchMode;
  query: string;
  schoolFilter?: string;
}

interface UseSearchReturn {
  results: SearchResult[];
  count: number | null;
  loading: boolean;
  error: string | null;
  search: (params: SearchParams) => void;
}

export function useSearch(): UseSearchReturn {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const latestParamsRef = useRef<SearchParams | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const cacheRef = useRef(
    new Map<string, { results: SearchResult[]; count: number | null }>()
  );

  const search = (params: SearchParams) => {
    latestParamsRef.current = params;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const current = latestParamsRef.current;
      if (!current) return;

      const query = current.query.trim();
      const schoolFilter = current.schoolFilter?.trim() || "";

      if (query.length < 3) {
        setResults([]);
        setCount(null);
        setError(null);
        setLoading(false);
        return;
      }

      const cacheKey = `${current.mode}:${query.toLowerCase()}:${schoolFilter.toLowerCase()}`;
      if (cacheRef.current.has(cacheKey)) {
        const cached = cacheRef.current.get(cacheKey);
        setResults(cached?.results || []);
        setCount(cached?.count ?? null);
        setError(null);
        setLoading(false);
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);
      setError(null);

      searchEntities({
        mode: current.mode,
        query,
        campusName: current.mode === "professors" ? schoolFilter : query,
        lecturerName: current.mode === "professors" ? query : undefined,
      }, controller.signal)
        .then((res) => {
          cacheRef.current.set(cacheKey, {
            results: res.results,
            count: typeof res.count === "number" ? res.count : res.results.length,
          });
          setResults(res.results);
          setCount(typeof res.count === "number" ? res.count : res.results.length);
        })
        .catch((err) => {
          if (err?.name === "AbortError") return;
          setError(
            err instanceof Error ? err.message : "Unable to search right now."
          );
          setCount(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, []);

  return { results, count, loading, error, search };
}
