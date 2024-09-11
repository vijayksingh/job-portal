import { User, UserRole } from "@/types";

export const mockLogin = (
  email: string,
  password: string,
  role: UserRole,
): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        email === "freelancer@example.com" &&
        password === "password" &&
        role === UserRole.Freelancer
      ) {
        resolve({
          id: "1",
          name: "John Doe",
          email,
          role: UserRole.Freelancer,
        });
      } else if (
        email === "employer@example.com" &&
        password === "password" &&
        role === UserRole.Employer
      ) {
        resolve({
          id: "2",
          name: "Jane Smith",
          email,
          role: UserRole.Employer,
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};

export const mockLogout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
};
