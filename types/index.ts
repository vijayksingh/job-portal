/* eslint-disable no-unused-vars */
export const enum UserRole {
  Freelancer = "freelancer",
  Employer = "employer",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  githubUsername: string;
}

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  posted_at: string;
  skills: string[];
  salary?: string;
  experience?: string;
};

// union of job and companyID + application
export type AppliedJob = Job & {
  companyId: string;
  applied: string[];
};
