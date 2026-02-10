import { apiFetch, ApiError } from "./client";
import type { Professor, Review } from "../types";

interface FetchOptions {
  signal?: AbortSignal;
}

interface LecturerResponse {
  _id: string;
  name: string;
  university: string;
  department: string;
  courses: string[];
  rating: number;
  count: number;
  createdAt: string;
  updatedAt: string;
  wouldTakeAgain?: number;
  difficulty?: number;
}

interface LecturerRatingResponse {
  _id: string;
  lecturerId: string;
  userId: string;
  course: string;
  difficulty: number;
  wouldTakeAgain?: boolean;
  quality: number;
  creditHr: number;
  grade: string;
  textbook: boolean;
  comment?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export async function fetchProfessors(
  options: FetchOptions = {}
): Promise<Professor[]> {
  const res = await apiFetch<{ data: LecturerResponse[] }>("/lecturer", {
    signal: options.signal,
    credentials: "include",
  });

  return res.data.map(mapLecturerToProfessor);
}

export async function fetchProfessorById(
  id: string,
  options: FetchOptions = {}
): Promise<Professor> {
  const res = await apiFetch<{ data: LecturerResponse }>(`/lecturer/${id}`, {
    signal: options.signal,
    credentials: "include",
  });
  return mapLecturerToProfessor(res.data);
}

export async function fetchProfessorReviews(
  id: string,
  options: FetchOptions = {}
): Promise<Review[]> {
  const res = await apiFetch<{ data: LecturerRatingResponse[] }>(
    `/lecturer-ratings/lecturer/${id}`,
    { signal: options.signal, credentials: "include" }
  );

  // Backend might return data directly in array or wrapped in { data: [] }
  const ratings = res.data ?? (res as unknown as LecturerRatingResponse[]);

  if (!Array.isArray(ratings)) {
    console.error("Unexpected response format:", res);
    return [];
  }

  return ratings.map(mapLecturerRatingToReview);
}

export function isNotFound(error: unknown) {
  return error instanceof ApiError && error.status === 404;
}

export interface SubmitProfessorRatingBody {
  rating: number;
  difficulty: number;
  wouldTakeAgain: boolean;
  course: string;
  creditHr: number;
  textbook: "yes" | "no" | null;
  grade: string;
  comment?: string;
  tags: string[];
}

export async function submitProfessorRating(
  id: string,
  body: SubmitProfessorRatingBody,
  options: FetchOptions = {}
) {
  const payload = {
    lecturerId: id,
    course: body.course,
    difficulty: body.difficulty,
    wouldTakeAgain: body.wouldTakeAgain,
    quality: body.rating,
    creditHr: body.creditHr,
    grade: body.grade,
    textbook: body.textbook === "yes",
    comment: body.comment,
    tags: body.tags,
  };

  return apiFetch<{ message: string; reviewId?: string }>(`/lecturer-ratings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: options.signal,
    credentials: "include",
  });
}

export async function addCourseToProfessor(
  id: string,
  courseName: string,
  options: FetchOptions = {}
) {
  return apiFetch<{
    message: string;
    data: { _id: string; courses: string[] };
  }>(`/lecturer/${id}/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: courseName }),
    signal: options.signal,
    credentials: "include",
  });
}

function mapLecturerToProfessor(lecturer: LecturerResponse): Professor {
  return {
    id: lecturer._id,
    name: lecturer.name,
    department: lecturer.department,
    schoolId: null,
    schoolName: lecturer.university,
    courses: lecturer.courses,
    averageRating: lecturer.rating ?? 0,
    totalRatings: lecturer.count ?? 0,
    wouldTakeAgain:
      typeof lecturer.wouldTakeAgain === "number"
        ? lecturer.wouldTakeAgain
        : null,
    difficultyLevel:
      typeof lecturer.difficulty === "number" ? lecturer.difficulty : null,
  };
}

function mapLecturerRatingToReview(rating: LecturerRatingResponse): Review {
  return {
    id: rating._id,
    professorId: rating.lecturerId,
    authorId: rating.userId,
    rating: rating.quality,
    difficulty: rating.difficulty,
    course: rating.course,
    text: rating.comment ?? "",
    date: rating.createdAt,
    helpfulCount: 0,
    notHelpfulCount: 0,
    tags: rating.tags ?? [],
    grade: rating.grade,
    textbook:
      typeof rating.textbook === "boolean"
        ? rating.textbook
          ? "Yes"
          : "No"
        : rating.textbook,
  };
}
