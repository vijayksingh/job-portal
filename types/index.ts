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
