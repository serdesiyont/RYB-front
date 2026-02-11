import { apiFetch } from "./client";
import type { SearchMode, SearchResult } from "@/hooks/use-search";

interface SearchRequest {
  mode: SearchMode;
  query: string;
  campusName?: string;
  lecturerName?: string;
}

interface LecturerLike {
  _id?: string;
  id?: string;
  name?: string;
  lecturerName?: string;
  department?: string;
  university?: string;
  schoolName?: string;
}

interface CampusLike {
  _id?: string;
  id?: string;
  name?: string;
  address?: string;
  location?: string;
}

interface SearchResponseShape {
  lecturers?: LecturerLike[];
  campuses?: CampusLike[];
  lecturerResults?: LecturerLike[];
  campusResults?: CampusLike[];
  count?: number;
  data?: {
    lecturers?: LecturerLike[];
    campuses?: CampusLike[];
    lecturerResults?: LecturerLike[];
    campusResults?: CampusLike[];
    count?: number;
  };
  results?: {
    lecturers?: LecturerLike[];
    campuses?: CampusLike[];
  };
}

export interface SearchResponse {
  results: SearchResult[];
  count?: number;
}

function mapLecturers(list: LecturerLike[] = []): SearchResult[] {
  return list
    .map((item) => {
      const id = (item._id || item.id || "").toString();
      if (!id) return null;
      return {
        id,
        name: item.name || item.lecturerName || "Unknown lecturer",
        subtitle: item.university || item.schoolName || item.department,
        type: "professors" as const,
      } as SearchResult;
    })
    .filter(Boolean) as SearchResult[];
}

function mapCampuses(list: CampusLike[] = []): SearchResult[] {
  return list
    .map((item) => {
      const id = (item._id || item.id || "").toString();
      if (!id) return null;
      return {
        id,
        name: item.name || "Unknown school",
        subtitle: item.address || item.location,
        type: "schools" as const,
      } as SearchResult;
    })
    .filter(Boolean) as SearchResult[];
}

export async function searchEntities(
  req: SearchRequest,
  signal?: AbortSignal
): Promise<SearchResponse> {
  const params = new URLSearchParams();
  if (req.mode === "professors") {
    if (req.lecturerName || req.query) {
      params.set("lecturerName", req.lecturerName || req.query);
    }
    if (req.campusName) {
      params.set("campusName", req.campusName);
    }
  } else {
    params.set("campusName", req.query);
  }

  const res = await apiFetch<SearchResponseShape | unknown>(
    `/search?${params.toString()}`,
    {
      signal,
    }
  );

  const shape = res || {};
  const shapeAny = shape as SearchResponseShape & Record<string, unknown>;
  const directResults =
    shapeAny.results && Array.isArray(shapeAny.results)
      ? shapeAny.results
      : (shapeAny.data as Record<string, unknown> | undefined)?.results &&
          Array.isArray((shapeAny.data as Record<string, unknown>).results)
        ? (shapeAny.data as Record<string, unknown>).results
        : Array.isArray(shapeAny)
          ? shapeAny
          : null;

  if (directResults) {
    const responseType = shapeAny.type;
    const isLecturerResponse = responseType === "lecturer" || req.mode === "professors";
    const mapped = isLecturerResponse
      ? mapLecturers(directResults as LecturerLike[])
      : mapCampuses(directResults as CampusLike[]);
    const count =
      typeof shapeAny.count === "number"
        ? shapeAny.count
        : typeof (shapeAny.data as Record<string, unknown> | undefined)?.count ===
            "number"
          ? ((shapeAny.data as Record<string, unknown>).count as number)
          : mapped.length;
    return { results: mapped, count };
  }

  const dataBlock =
    (shapeAny.data as Record<string, unknown>) ||
    (shapeAny.results as Record<string, unknown>) ||
    shapeAny;
  const lecturers =
    (dataBlock as Record<string, unknown>).lecturers ||
    (dataBlock as Record<string, unknown>).lecturerResults ||
    shapeAny.lecturers ||
    shapeAny.lecturerResults;
  const campuses =
    (dataBlock as Record<string, unknown>).campuses ||
    (dataBlock as Record<string, unknown>).campusResults ||
    shapeAny.campuses ||
    shapeAny.campusResults;

  const count =
    typeof shapeAny.count === "number"
      ? shapeAny.count
      : typeof (shapeAny.data as Record<string, unknown> | undefined)?.count ===
          "number"
        ? ((shapeAny.data as Record<string, unknown>).count as number)
        : undefined;

  if (req.mode === "professors") {
    const mapped = mapLecturers(lecturers as LecturerLike[]);
    return { results: mapped, count: count ?? mapped.length };
  }
  const mapped = mapCampuses(campuses as CampusLike[]);
  return { results: mapped, count: count ?? mapped.length };
}
