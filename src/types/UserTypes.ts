export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  type: "salesman" | "buyer" | "admin";
}

export interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
