export interface SchoolRatings {
  reputation: number;
  opportunities: number;
  internet: number;
  location: number;
  facilities: number;
  safety: number;
  food: number;
  clubs: number;
  happiness: number;
  social: number;
}

export interface School {
  id: string | number;
  name: string;
  location: string;
  ratings: SchoolRatings;
  averageRating: number;
  totalRatings: number;
}

export interface Professor {
  id: string | number;
  name: string;
  department: string;
  schoolId?: string | number | null;
  schoolName?: string;
  averageRating: number;
  totalRatings: number;
  wouldTakeAgain?: number | null;
  difficultyLevel?: number | null;
}

export interface Lecturer {
  _id: string;
  name: string;
  university: string;
  department: string;
  courses: string[];
  rating: number;
  count: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string | number;
  professorId?: string | number;
  schoolId?: string | number;
  authorId: string;
  rating: number;
  quality?: number;
  difficulty?: number;
  course?: string;
  text: string;
  date: string;
  helpfulCount: number;
  notHelpfulCount: number;
  attendance?: string;
  grade?: string;
  textbook?: string;
  forCredit?: string;
  tags?: string[];
  attendance_mandatory?: boolean;
  schoolRatings?: SchoolRatings;
}
