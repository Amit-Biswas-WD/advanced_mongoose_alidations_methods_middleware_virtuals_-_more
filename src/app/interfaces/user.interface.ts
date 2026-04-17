import { Model } from "mongoose";

export interface IAddress {
  city: string;
  street: string;
  zip_code: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  address: IAddress;
}

// build it custom instance method
export interface UserInstanceMethod {
  hasPassword(plainPassword: string): Promise<string>;
}

// built in custom static method
export interface UserStaticMethods extends Model<IUser> {
  hasPassword(plainPassword: string): Promise<string>;
}
