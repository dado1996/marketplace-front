import { axiosInstance } from "../utils/axios";

export const loginService = (email: string, password: string) => {
  return axiosInstance.post<{
    status: number;
    message: string;
    data: {
      firstName: string;
      lastName: string;
      email: string;
      type: "buyer" | "salesman" | "admin";
    };
    token: string;
  }>("/auth/login", { email, password });
};

export const registerService = (
  email: string,
  password: string,
  confirmPassword: string,
  type: "salesman" | "buyer" | "admin"
) => {
  return axiosInstance.post<{
    status: number;
    message: string;
    data: {
      email: string;
      type: string;
      firstName: string | null;
      lastName: string | null;
      createdAt: string;
    };
  }>("/auth/register", { email, password, confirmPassword, type });
};
