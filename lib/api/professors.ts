import { apiFetch, ApiError } from "./client";
import { professors as mockProfessors, reviews as mockReviews } from "../mockData";
import type { Professor, Review } from "../types";

interface FetchOptions {
  signal?: AbortSignal;
  useMockOnError?: boolean;
  allowFallbackToRate?: boolean;
}

export async function fetchProfessors(options: FetchOptions = {}): Promise<Professor[]> {
  try {
    return await apiFetch<Professor[]>("/api/professors", { signal: options.signal });
  } catch (error) {
    if (options.useMockOnError) {
      return mockProfessors;
    }
    throw error;
  }
}

export async function fetchProfessorById(id: number, options: FetchOptions = {}): Promise<Professor> {
  try {
    return await apiFetch<Professor>(`/api/professors/${id}`, { signal: options.signal });
  } catch (error) {
    const shouldFallback = options.allowFallbackToRate !== false;
    if (shouldFallback) {
      const fallbackFromRate = await fetchProfessorFromRateEndpoint(id, options);
      if (fallbackFromRate) return fallbackFromRate;
    }

    if (options.useMockOnError) {
      const fallback = mockProfessors.find((p) => p.id === id);
      if (fallback) return fallback;
    }
    throw error;
  }
}

export async function fetchProfessorReviews(id: number, options: FetchOptions = {}): Promise<Review[]> {
  try {
    return await apiFetch<Review[]>(`/api/professors/${id}/reviews`, { signal: options.signal });
  } catch (error) {
    const shouldFallback = options.allowFallbackToRate !== false;
    if (shouldFallback) {
      const fallbackFromRate = await fetchProfessorReviewsFromRateEndpoint(id, options);
      if (fallbackFromRate) return fallbackFromRate;
    }

    if (options.useMockOnError) {
      return mockReviews.filter((r) => r.professorId === id);
    }
    throw error;
  }
}

export function isNotFound(error: unknown) {
  return error instanceof ApiError && error.status === 404;
}

async function fetchProfessorFromRateEndpoint(
  id: number,
  options: FetchOptions,
): Promise<Professor | null> {
  try {
    const data = await apiFetch<RateProfessorResponse>(`/api/rate/professor/${id}`, {
      signal: options.signal,
    });

    return {
      id: data.id,
      name: data.name,
      department: data.department,
      schoolId: data.schoolId,
      schoolName: data.schoolName,
      averageRating: data.averageRating,
      totalRatings: data.totalRatings,
      wouldTakeAgain: data.wouldTakeAgain,
      difficultyLevel: data.difficultyLevel,
    };
  } catch (err) {
    return null;
  }
}

async function fetchProfessorReviewsFromRateEndpoint(
  id: number,
  options: FetchOptions,
): Promise<Review[] | null> {
  try {
    const data = await apiFetch<RateProfessorResponse>(`/api/rate/professor/${id}`, {
      signal: options.signal,
    });
    return data.sampleReviews ?? null;
  } catch (err) {
    return null;
  }
}

interface RateProfessorResponse {
  type: "professor";
  id: number;
  name: string;
  department: string;
  schoolId: number;
  schoolName: string;
  averageRating: number;
  totalRatings: number;
  wouldTakeAgain: number;
  difficultyLevel: number;
  sampleReviews?: Review[];
}

export interface SubmitProfessorRatingBody {
  rating: number;
  difficulty: number;
  wouldTakeAgain: boolean;
  course: string;
  isOnlineCourse: boolean;
  textbook: "yes" | "no" | null;
  attendance: "mandatory" | "optional" | null;
  forCredit: "yes" | "no" | null;
  grade: string;
  review: string;
  tags: string[];
}

export async function submitProfessorRating(
  id: number,
  body: SubmitProfessorRatingBody,
  options: FetchOptions = {},
) {
  return apiFetch<{ message: string; reviewId?: number }>(
    `/api/professors/${id}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body, professorId: id }),
      signal: options.signal,
      credentials: "include",
    },
  );
}
