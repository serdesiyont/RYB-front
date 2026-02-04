export interface School {
  id: number;
  name: string;
  location: string;
  ratings: {
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
  };
  averageRating: number;
  totalRatings: number;
}

export interface Professor {
  id: number;
  name: string;
  department: string;
  schoolId: number;
  schoolName: string;
  averageRating: number;
  totalRatings: number;
  wouldTakeAgain: number;
  difficultyLevel: number;
}

export interface Review {
  id: number;
  professorId?: number;
  schoolId?: number;
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
}

export const schools: School[] = [
  {
    id: 399,
    name: 'Harvard University',
    location: 'Cambridge, MA',
    ratings: {
      reputation: 3.8,
      opportunities: 3.5,
      internet: 3.3,
      location: 3.3,
      facilities: 3.2,
      safety: 3.2,
      food: 3.1,
      clubs: 3.0,
      happiness: 3.0,
      social: 2.8,
    },
    averageRating: 3.3,
    totalRatings: 147,
  },
  {
    id: 1,
    name: 'Stanford University',
    location: 'Palo Alto, CA',
    ratings: {
      reputation: 3.9,
      opportunities: 3.8,
      internet: 3.5,
      location: 3.4,
      facilities: 3.6,
      safety: 3.3,
      food: 3.2,
      clubs: 3.2,
      happiness: 3.3,
      social: 3.1,
    },
    averageRating: 3.5,
    totalRatings: 234,
  },
  {
    id: 2,
    name: 'MIT',
    location: 'Cambridge, MA',
    ratings: {
      reputation: 4.0,
      opportunities: 3.9,
      internet: 3.7,
      location: 3.5,
      facilities: 3.8,
      safety: 3.4,
      food: 3.0,
      clubs: 3.1,
      happiness: 3.2,
      social: 2.9,
    },
    averageRating: 3.6,
    totalRatings: 189,
  },
];

export const professors: Professor[] = [
  {
    id: 816421,
    name: 'John Stilgoe',
    department: 'Environmental Studies',
    schoolId: 399,
    schoolName: 'Harvard University',
    averageRating: 3.4,
    totalRatings: 8,
    wouldTakeAgain: 0.25,
    difficultyLevel: 2.9,
  },
  {
    id: 1,
    name: 'Jane Smith',
    department: 'Computer Science',
    schoolId: 399,
    schoolName: 'Harvard University',
    averageRating: 4.2,
    totalRatings: 15,
    wouldTakeAgain: 0.87,
    difficultyLevel: 3.1,
  },
  {
    id: 2,
    name: 'Robert Johnson',
    department: 'Physics',
    schoolId: 399,
    schoolName: 'Harvard University',
    averageRating: 3.8,
    totalRatings: 12,
    wouldTakeAgain: 0.75,
    difficultyLevel: 3.5,
  },
  {
    id: 3,
    name: 'Alexander Keyssar',
    department: 'History',
    schoolId: 399,
    schoolName: 'Harvard University',
    averageRating: 4.0,
    totalRatings: 10,
    wouldTakeAgain: 0.8,
    difficultyLevel: 2.8,
  },
  {
    id: 4,
    name: 'Beth Simmons',
    department: 'Government',
    schoolId: 399,
    schoolName: 'Harvard University',
    averageRating: 4.0,
    totalRatings: 9,
    wouldTakeAgain: 0.78,
    difficultyLevel: 3.2,
  },
  {
    id: 5,
    name: 'Dale Soak',
    department: 'English',
    schoolId: 399,
    schoolName: 'Harvard University',
    averageRating: 4.0,
    totalRatings: 11,
    wouldTakeAgain: 0.82,
    difficultyLevel: 2.9,
  },
];

export const reviews: Review[] = [
  {
    id: 1,
    professorId: 816421,
    authorId: 'user1',
    rating: 1.0,
    quality: 1.0,
    difficulty: 1.0,
    course: 'GSD600',
    text: 'He was a guest speaker at my GSD seminar. He was arrogant in his presentation and mentioned that boys\' landscape experience was different from girls\'. When I asked him about it, he said he blames the feminism movement for why there is gender violence and literally said there were many benefits for women staying home instead of pursuing careers.',
    date: 'Sep 15th, 2022',
    helpfulCount: 0,
    notHelpfulCount: 0,
    attendance: 'Mandatory',
    grade: 'Audit/No Grade',
    textbook: 'N/A',
    forCredit: 'No',
    tags: [],
  },
  {
    id: 2,
    professorId: 816421,
    authorId: 'user2',
    rating: 4.5,
    quality: 4.0,
    difficulty: 4.0,
    course: 'GSD600',
    text: 'Somewhere beyond right and wrong, there is a garden. I will meet you there. Rumi. - Let me say, that Stilgoe is by far, the most inspirational professor I have ever come across. I am one myself now, and looking back, I can truly appreciate that he has left me with something enduring; a love of exploration and a search for real experience.',
    date: 'Apr 15th, 2016',
    helpfulCount: 1,
    notHelpfulCount: 0,
    attendance: 'Mandatory',
    grade: 'A',
    textbook: 'Yes',
    forCredit: 'Yes',
    tags: ['INSPIRATIONAL', 'AMAZING LECTURES'],
  },
  {
    id: 3,
    schoolId: 399,
    authorId: 'user3',
    rating: 2.3,
    text: 'Harvard University is an exceptional place for students to learn and grow academically and personally. The university boasts a diverse curriculum that caters to various interests including advanced courses, research opportunities, and a wide range of extracurricular activities and organizations that encourage participation and teamwork. food sucks',
    date: 'Jan 27th, 2026',
    helpfulCount: 0,
    notHelpfulCount: 0,
    tags: [],
  },
  {
    id: 4,
    schoolId: 399,
    authorId: 'user4',
    rating: 1.7,
    text: 'woke',
    date: 'Jan 18th, 2026',
    helpfulCount: 0,
    notHelpfulCount: 0,
    tags: [],
  },
  {
    id: 5,
    schoolId: 399,
    authorId: 'user5',
    rating: 1.0,
    text: 'trump was right about this school, it sucks buns',
    date: 'Jan 28th, 2026',
    helpfulCount: 0,
    notHelpfulCount: 0,
    tags: [],
  },
];
