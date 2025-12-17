import type { Option, Job, Interviewer } from "./types";

export const DOMAIN_OPTIONS: Option[] = [
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "product", label: "Product" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
];

export const JOB_LEVEL_OPTIONS: Option[] = [
  { value: "intern", label: "Intern" },
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
];

export const USER_TYPE_OPTIONS: Option[] = [
  { value: "fulltime", label: "Full-time" },
  { value: "parttime", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

export const ROUND_TYPE_OPTIONS: Option[] = [
  { value: "technical", label: "Technical" },
  { value: "behavioral", label: "Behavioral" },
  { value: "cultural", label: "Cultural Fit" },
  { value: "case-study", label: "Case Study" },
];

export const LANGUAGE_OPTIONS: Option[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
];

export const DURATION_OPTIONS: Option[] = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
  { value: "90", label: "90 minutes" },
];

export const REMINDER_TIME_OPTIONS: Option[] = [
  { value: "15", label: "15 minutes before" },
  { value: "30", label: "30 minutes before" },
  { value: "60", label: "1 hour before" },
  { value: "120", label: "2 hours before" },
  { value: "1440", label: "1 day before" },
  { value: "2880", label: "2 days" },
];

export const AI_QUESTION_COUNTS = [3, 5, 7, 10, 15] as const;
export const CUSTOM_QUESTION_COUNTS = [1, 2, 3, 4, 5] as const;

// Mock data - In production, these would come from API calls
export const MOCK_INTERVIEWERS: Interviewer[] = [
  { id: "1", name: "Product Manager", image: "/interviewer-male.jpg" },
  { id: "2", name: "HR Manager", image: "/interviewer-female.jpg" },
  { id: "3", name: "UX Designer", image: "/interviewer-male.jpg" },
  { id: "4", name: "Sales", image: "/interviewer-female.jpg" },
  { id: "5", name: "Marketing", image: "/interviewer-male.jpg" },
  { id: "6", name: "Software Engineer", image: "/interviewer-female.jpg" },
];

export const MOCK_EXISTING_JOBS: Job[] = [
  { id: "1", title: "Senior Frontend Developer", domain: "Engineering" },
  { id: "2", title: "Product Designer", domain: "Design" },
  { id: "3", title: "Backend Engineer", domain: "Engineering" },
];

export const MOCK_ROUNDS = [
  { value: "round1", label: "Technical Round" },
  { value: "round2", label: "Behavioral Round" },
  { value: "round3", label: "HR Round" },
] as const;
