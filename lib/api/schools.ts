import { apiFetch, ApiError } from "./client";
import { schools as mockSchools, reviews as mockReviews } from "../mockData";
import type { Review, School } from "../types";

interface FetchOptions {
  signal?: AbortSignal;
  useMockOnError?: boolean;
  allowFallbackToRate?: boolean;
}

export async function fetchSchools(options: FetchOptions = {}): Promise<School[]> {
  try {
    return await apiFetch<School[]>("/api/schools", { signal: options.signal });
  } catch (error) {
    if (options.useMockOnError) {
      return mockSchools;
    }
    throw error;
  }
}

export async function fetchSchoolById(id: number, options: FetchOptions = {}): Promise<School> {
  try {
    return await apiFetch<School>(`/api/schools/${id}`, { signal: options.signal });
  } catch (error) {
    const shouldFallback = options.allowFallbackToRate !== false;
    if (shouldFallback) {
      const fallbackFromRate = await fetchSchoolFromRateEndpoint(id, options);
      if (fallbackFromRate) return fallbackFromRate;
    }

    if (options.useMockOnError) {
      const fallback = mockSchools.find((s) => s.id === id);
      if (fallback) return fallback;
    }
    throw error;
  }
}

export async function fetchSchoolReviews(id: number, options: FetchOptions = {}): Promise<Review[]> {
  try {
    return await apiFetch<Review[]>(`/api/schools/${id}/reviews`, { signal: options.signal });
  } catch (error) {
    const shouldFallback = options.allowFallbackToRate !== false;
    if (shouldFallback) {
      const fallbackFromRate = await fetchSchoolReviewsFromRateEndpoint(id, options);
      if (fallbackFromRate) return fallbackFromRate;
    }

    if (options.useMockOnError) {
      return mockReviews.filter((r) => r.schoolId === id);
    }
    throw error;
  }
}

export function isNotFound(error: unknown) {
  return error instanceof ApiError && error.status === 404;
}

async function fetchSchoolFromRateEndpoint(
  id: number,
  options: FetchOptions,
): Promise<School | null> {
  try {
    const data = await apiFetch<RateSchoolResponse>(`/api/rate/school/${id}`, {
      signal: options.signal,
    });

    return {
      id: data.id,
      name: data.name,
      location: data.location,
      ratings: data.ratingsBreakdown,
      averageRating: data.averageRating,
      totalRatings: data.totalRatings,
    };
  } catch (err) {
    return null;
  }
}

async function fetchSchoolReviewsFromRateEndpoint(
  id: number,
  options: FetchOptions,
): Promise<Review[] | null> {
  try {
    const data = await apiFetch<RateSchoolResponse>(`/api/rate/school/${id}`, {
      signal: options.signal,
    });
    return data.sampleReviews ?? null;
  } catch (err) {
    return null;
  }
}

interface RateSchoolResponse {
  type: "school";
  id: number;
  name: string;
  location: string;
  averageRating: number;
  totalRatings: number;
  ratingsBreakdown: School["ratings"];
  sampleReviews?: Review[];
}

export interface SubmitSchoolRatingBody {
  ratings: School["ratings"];
  review: string;
  tags?: string[];
}

export async function submitSchoolRating(
  id: number,
  body: SubmitSchoolRatingBody,
  options: FetchOptions = {},
) {
  return apiFetch<{ message: string; reviewId?: number }>(`/api/schools/${id}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body, schoolId: id }),
    signal: options.signal,
    credentials: "include",
  });
}
