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
  schoolRatings?: {
    reputation: number;
    location: number;
    opportunities: number;
    facilities: number;
    internet: number;
    safety: number;
    food: number;
    clubs: number;
    happiness: number;
    social: number;
  };
}

export const schools: School[] = [
  {
    id: 399,
    name: "Harvard University",
    location: "Cambridge, MA",
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
    name: "Stanford University",
    location: "Palo Alto, CA",
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
    name: "MIT",
    location: "Cambridge, MA",
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
    name: "John Stilgoe",
    department: "Environmental Studies",
    schoolId: 399,
    schoolName: "Harvard University",
    averageRating: 3.4,
    totalRatings: 8,
    wouldTakeAgain: 0.25,
    difficultyLevel: 2.9,
  },
  {
    id: 1,
    name: "Jane Smith",
    department: "Computer Science",
    schoolId: 399,
    schoolName: "Harvard University",
    averageRating: 4.2,
    totalRatings: 15,
    wouldTakeAgain: 0.87,
    difficultyLevel: 3.1,
  },
  {
    id: 2,
    name: "Robert Johnson",
    department: "Physics",
    schoolId: 399,
    schoolName: "Harvard University",
    averageRating: 3.8,
    totalRatings: 12,
    wouldTakeAgain: 0.75,
    difficultyLevel: 3.5,
  },
  {
    id: 3,
    name: "Alexander Keyssar",
    department: "History",
    schoolId: 399,
    schoolName: "Harvard University",
    averageRating: 4.0,
    totalRatings: 10,
    wouldTakeAgain: 0.8,
    difficultyLevel: 2.8,
  },
  {
    id: 4,
    name: "Beth Simmons",
    department: "Government",
    schoolId: 399,
    schoolName: "Harvard University",
    averageRating: 4.0,
    totalRatings: 9,
    wouldTakeAgain: 0.78,
    difficultyLevel: 3.2,
  },
  {
    id: 5,
    name: "Dale Soak",
    department: "English",
    schoolId: 399,
    schoolName: "Harvard University",
    averageRating: 4.0,
    totalRatings: 11,
    wouldTakeAgain: 0.82,
    difficultyLevel: 2.9,
  },
  {
    id: 123456,
    name: "Ada Lovelace",
    department: "Computer Science",
    schoolId: 1,
    schoolName: "Stanford University",
    averageRating: 4.6,
    totalRatings: 128,
    wouldTakeAgain: 0.93,
    difficultyLevel: 2.7,
  },
];

export const reviews: Review[] = [
  {
    id: 1,
    professorId: 816421,
    authorId: "user1",
    rating: 1.0,
    quality: 1.0,
    difficulty: 1.0,
    course: "GSD600",
    text: "He was a guest speaker at my GSD seminar. He was arrogant in his presentation and mentioned that boys' landscape experience was different from girls'. When I asked him about it, he said he blames the feminism movement for why there is gender violence and literally said there were many benefits for women staying home instead of pursuing careers.",
    date: "Sep 15th, 2022",
    helpfulCount: 0,
    notHelpfulCount: 0,
    attendance: "Mandatory",
    grade: "Audit/No Grade",
    textbook: "N/A",
    forCredit: "No",
    tags: [],
  },
  {
    id: 2,
    professorId: 816421,
    authorId: "user2",
    rating: 4.5,
    quality: 4.0,
    difficulty: 4.0,
    course: "GSD600",
    text: "Somewhere beyond right and wrong, there is a garden. I will meet you there. Rumi. - Let me say, that Stilgoe is by far, the most inspirational professor I have ever come across. I am one myself now, and looking back, I can truly appreciate that he has left me with something enduring; a love of exploration and a search for real experience.",
    date: "Apr 15th, 2016",
    helpfulCount: 1,
    notHelpfulCount: 0,
    attendance: "Mandatory",
    grade: "A",
    textbook: "Yes",
    forCredit: "Yes",
    tags: ["INSPIRATIONAL", "AMAZING LECTURES"],
  },
  {
    id: 3,
    schoolId: 399,
    authorId: "user3",
    rating: 2.3,
    text: "Harvard University is an exceptional place for students to learn and grow academically and personally. The university boasts a diverse curriculum that caters to various interests including advanced courses, research opportunities, and a wide range of extracurricular activities and organizations that encourage participation and teamwork. food sucks",
    date: "Jan 27th, 2026",
    helpfulCount: 0,
    notHelpfulCount: 0,
    tags: ["CROWDED DORMS", "STRESSFUL", "FOOD NEEDS WORK"],
    schoolRatings: {
      safety: 2.4,
      location: 3.1,
      reputation: 3.2,
      happiness: 2.8,
      opportunities: 2.9,
      facilities: 2.7,
      clubs: 2.5,
      internet: 2.6,
      food: 1.8,
      social: 2.4,
    },
  },
  {
    id: 6,
    professorId: 123456,
    authorId: "demo1",
    rating: 5,
    quality: 5.0,
    difficulty: 2.5,
    course: "CS101",
    text: "Sharp lectures, weekly labs that stay practical, and feedback arrives fast enough to iterate on projects.",
    date: "Jan 10th, 2026",
    helpfulCount: 12,
    notHelpfulCount: 1,
    attendance: "Optional",
    grade: "A",
    textbook: "Optional",
    forCredit: "Yes",
    tags: ["INSPIRATIONAL", "CLEAR GRADING CRITERIA", "AMAZING LECTURES"],
  },
  {
    id: 7,
    professorId: 123456,
    authorId: "demo2",
    rating: 4.2,
    quality: 4.0,
    difficulty: 3.0,
    course: "CS229",
    text: "Projects are tough but extremely relevant to industry tools; office hours fill up fast so come prepared.",
    date: "Feb 1st, 2026",
    helpfulCount: 8,
    notHelpfulCount: 2,
    attendance: "Mandatory",
    grade: "A-",
    textbook: "Yes",
    forCredit: "Yes",
    tags: ["GROUP PROJECTS", "LOTS OF HOMEWORK", "RESPECTED"],
  },
  {
    id: 8,
    professorId: 123456,
    authorId: "demo3",
    rating: 3.4,
    quality: 3.5,
    difficulty: 3.2,
    course: "CS210",
    text: "Lecture pacing can feel rushed, but slides and recorded demos help if you review after class.",
    date: "Feb 14th, 2026",
    helpfulCount: 5,
    notHelpfulCount: 3,
    attendance: "Optional",
    grade: "B+",
    textbook: "N/A",
    forCredit: "Yes",
    tags: ["ACCESSIBLE OUTSIDE CLASS", "LECTURE HEAVY"],
  },
  {
    id: 9,
    professorId: 123456,
    authorId: "demo4",
    rating: 2.2,
    quality: 2.0,
    difficulty: 3.8,
    course: "CS147",
    text: "Heavy workload and unclear project rubrics early in the quarter; improved after midterm feedback.",
    date: "Mar 2nd, 2026",
    helpfulCount: 2,
    notHelpfulCount: 4,
    attendance: "Mandatory",
    grade: "B",
    textbook: "Yes",
    forCredit: "Yes",
    tags: ["TOUGH GRADER", "LOTS OF HOMEWORK"],
  },
  {
    id: 4,
    schoolId: 399,
    authorId: "user4",
    rating: 1.7,
    text: "woke",
    date: "Jan 18th, 2026",
    helpfulCount: 0,
    notHelpfulCount: 0,
    tags: ["CAMPUS CULTURE DEBATES"],
    schoolRatings: {
      safety: 2.0,
      location: 2.8,
      reputation: 2.5,
      happiness: 2.1,
      opportunities: 2.3,
      facilities: 2.4,
      clubs: 2.0,
      internet: 2.3,
      food: 1.9,
      social: 2.2,
    },
  },
  {
    id: 5,
    schoolId: 399,
    authorId: "user5",
    rating: 1.0,
    text: "trump was right about this school, it sucks buns",
    date: "Jan 28th, 2026",
    helpfulCount: 0,
    notHelpfulCount: 0,
    tags: ["CAMPUS POLITICS", "FOOD NEEDS WORK"],
    schoolRatings: {
      safety: 1.9,
      location: 2.6,
      reputation: 2.2,
      happiness: 1.8,
      opportunities: 2.0,
      facilities: 2.1,
      clubs: 1.9,
      internet: 2.3,
      food: 1.6,
      social: 2.0,
    },
  },
  {
    id: 10,
    schoolId: 1,
    authorId: "demo-school1",
    rating: 4.3,
    text: "Collaborative culture, strong CS labs, and plenty of project funding if you apply early.",
    date: "Feb 2nd, 2026",
    helpfulCount: 6,
    notHelpfulCount: 1,
    tags: ["STRONG ACADEMICS", "PROJECT FUNDING", "COLLABORATIVE"],
    schoolRatings: {
      safety: 4.4,
      location: 4.1,
      reputation: 4.0,
      happiness: 3.9,
      opportunities: 3.9,
      facilities: 3.8,
      clubs: 3.5,
      internet: 3.4,
      food: 3.3,
      social: 3.2,
    },
  },
  {
    id: 11,
    schoolId: 1,
    authorId: "demo-school2",
    rating: 3.8,
    text: "Housing lottery is stressful but dining hall variety has improved a lot this year.",
    date: "Feb 12th, 2026",
    helpfulCount: 3,
    notHelpfulCount: 2,
    tags: ["HOUSING PRESSURE", "BETTER DINING", "STRESSFUL"],
    schoolRatings: {
      safety: 3.6,
      location: 3.8,
      reputation: 3.7,
      happiness: 3.5,
      opportunities: 3.9,
      facilities: 3.4,
      clubs: 3.2,
      internet: 3.3,
      food: 3.6,
      social: 3.4,
    },
  },
  {
    id: 12,
    schoolId: 1,
    authorId: "demo-school3",
    rating: 4.6,
    text: "Career fairs are packed with recruiters, and the alumni network is gold for internships.",
    date: "Mar 1st, 2026",
    helpfulCount: 9,
    notHelpfulCount: 0,
    tags: ["GREAT CAREER SUPPORT", "RECRUITING", "ALUMNI NETWORK"],
    schoolRatings: {
      safety: 4.5,
      location: 4.3,
      reputation: 4.4,
      happiness: 4.2,
      opportunities: 4.7,
      facilities: 4.1,
      clubs: 3.9,
      internet: 4.0,
      food: 3.7,
      social: 4.0,
    },
  },
];
