import { apiFetch } from "./client";
import type { Lecturer } from "../types";

interface FetchOptions {
  signal?: AbortSignal;
  useMockOnError?: boolean;
}

interface CreateLecturerBody {
  name: string;
  university: string;
  department: string;
  courses: string[];
}

interface CreateLecturerResponse {
  message: string;
  data: Lecturer;
}

export async function createLecturer(body: CreateLecturerBody, options: FetchOptions = {}) {
  return apiFetch<CreateLecturerResponse>("/lecturer", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: options.signal,
  });
}

export async function fetchLecturers(options: FetchOptions = {}): Promise<Lecturer[]> {
  try {
    const res = await apiFetch<{ data: Lecturer[] }>("/lecturer", {
      signal: options.signal,
      credentials: "include",
    });
    return res.data;
  } catch (error) {
    if (options.useMockOnError) {
      return [];
    }
    throw error;
  }
}

export async function fetchLecturerById(id: string, options: FetchOptions = {}): Promise<Lecturer | null> {
  try {
    const res = await apiFetch<{ data: Lecturer }>(`/lecturer/${id}`, {
      signal: options.signal,
      credentials: "include",
    });
    return res.data;
  } catch (error) {
    if (options.useMockOnError) {
      return null;
    }
    throw error;
  }
}
