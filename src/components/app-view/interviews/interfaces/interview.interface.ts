export type InterviewStatus = "Scheduled" | "Completed" | "Cancelled";

export interface InterviewDetail {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  interviewerName: string;
  status: InterviewStatus;
  interviewDate: string;
  roundName: string;
  score: number;
}

export interface APIInterviewValue {
  propertyId: string;
  key: string;
  value: any;
}

export interface APIInterviewItem {
  values: APIInterviewValue[];
  createdOn: number;
  updatedOn: number;
  id: string;
}

export interface APIPaginationInfo {
  total: number;
  nextOffset: number | null;
  previousOffset: number | null;
  limit: number;
}

export interface InterviewsWithPagination {
  interviews: InterviewDetail[];
  pagination: APIPaginationInfo;
}
