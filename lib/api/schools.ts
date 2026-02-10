import { apiFetch, ApiError } from "./client";
import type { Review, School, SchoolRatings } from "../types";

interface FetchOptions {
  signal?: AbortSignal;
}

interface CampusResponse {
  _id: string;
  name: string;
  address: string;
  description?: string;
  overallRating?: number;
  count?: number;
}

interface CampusRatingsResponse {
  data: Array<{
    _id: string;
    campusId: string;
    userId: string;
    reputation: number;
    social: number;
    clubs: number;
    opportunities: number;
    location: number;
    happiness: number;
    facilities: number;
    safety: number;
    internet: number;
    food: number;
    comment?: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

export async function fetchSchools(
  options: FetchOptions = {}
): Promise<School[]> {
  const res = await apiFetch<{ data: CampusResponse[] }>("/campus", {
    signal: options.signal,
  });

  return res.data.map((campus) => mapCampusToSchool(campus));
}

export async function fetchSchoolById(
  id: string,
  options: FetchOptions = {}
): Promise<School> {
  const campus = await apiFetch<{ data: CampusResponse }>(`/campus/${id}`, {
    signal: options.signal,
  });

  const ratings = await fetchCampusRatings(id, options.signal);
  return mapCampusToSchool(campus.data, ratings);
}

export async function fetchSchoolReviews(
  id: string,
  options: FetchOptions = {}
): Promise<Review[]> {
  const ratings = await fetchCampusRatings(id, options.signal);
  return ratings.map((rating) => mapCampusRatingToReview(rating));
}

export function isNotFound(error: unknown) {
  return error instanceof ApiError && error.status === 404;
}

export interface SubmitSchoolRatingBody {
  ratings: SchoolRatings;
  review: string;
  tags?: string[];
}

export async function submitSchoolRating(
  id: string,
  body: SubmitSchoolRatingBody,
  options: FetchOptions = {}
) {
  const payload = {
    campusId: id,
    reputation: body.ratings.reputation,
    social: body.ratings.social,
    clubs: body.ratings.clubs,
    opportunities: body.ratings.opportunities,
    location: body.ratings.location,
    happiness: body.ratings.happiness,
    facilities: body.ratings.facilities,
    safety: body.ratings.safety,
    internet: body.ratings.internet,
    food: body.ratings.food,
    comment: body.review,
  };

  return apiFetch<{ message: string; reviewId?: string }>(`/campus-rating`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: options.signal,
    credentials: "include",
  });
}

function mapCampusToSchool(
  campus: CampusResponse,
  ratings?: CampusRatingsResponse["data"]
): School {
  const derivedRatings =
    ratings && ratings.length > 0
      ? averageCampusRatings(ratings)
      : emptyRatings();

  return {
    id: campus._id,
    name: campus.name,
    location: campus.address,
    ratings: derivedRatings,
    averageRating: campus.overallRating ?? averageAll(derivedRatings),
    totalRatings: campus.count ?? ratings?.length ?? 0,
  };
}

async function fetchCampusRatings(campusId: string, signal?: AbortSignal) {
  const res = await apiFetch<CampusRatingsResponse>(
    `/campus-rating/campus/${campusId}`,
    { signal }
  );
  return res.data;
}

function mapCampusRatingToReview(
  rating: CampusRatingsResponse["data"][number]
): Review {
  const schoolRatings: SchoolRatings = {
    reputation: rating.reputation,
    social: rating.social,
    clubs: rating.clubs,
    opportunities: rating.opportunities,
    location: rating.location,
    happiness: rating.happiness,
    facilities: rating.facilities,
    safety: rating.safety,
    internet: rating.internet,
    food: rating.food,
  };

  return {
    id: rating._id,
    schoolId: rating.campusId,
    authorId: rating.userId,
    rating: averageAll(schoolRatings),
    text: rating.comment ?? "",
    date: rating.createdAt,
    helpfulCount: 0,
    notHelpfulCount: 0,
    tags: [],
    schoolRatings,
  };
}

function averageAll(ratings: SchoolRatings): number {
  const values = Object.values(ratings);
  if (!values.length) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

function averageCampusRatings(
  ratings: CampusRatingsResponse["data"]
): SchoolRatings {
  if (!ratings.length) return emptyRatings();
  const totals = ratings.reduce((acc, curr) => {
    acc.reputation += curr.reputation;
    acc.social += curr.social;
    acc.clubs += curr.clubs;
    acc.opportunities += curr.opportunities;
    acc.location += curr.location;
    acc.happiness += curr.happiness;
    acc.facilities += curr.facilities;
    acc.safety += curr.safety;
    acc.internet += curr.internet;
    acc.food += curr.food;
    return acc;
  }, emptyRatings());

  return {
    reputation: totals.reputation / ratings.length,
    social: totals.social / ratings.length,
    clubs: totals.clubs / ratings.length,
    opportunities: totals.opportunities / ratings.length,
    location: totals.location / ratings.length,
    happiness: totals.happiness / ratings.length,
    facilities: totals.facilities / ratings.length,
    safety: totals.safety / ratings.length,
    internet: totals.internet / ratings.length,
    food: totals.food / ratings.length,
  };
}

function emptyRatings(): SchoolRatings {
  return {
    reputation: 0,
    opportunities: 0,
    internet: 0,
    location: 0,
    facilities: 0,
    safety: 0,
    food: 0,
    clubs: 0,
    happiness: 0,
    social: 0,
  };
}
