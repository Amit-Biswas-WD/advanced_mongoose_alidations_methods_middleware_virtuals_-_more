export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: number;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
}
