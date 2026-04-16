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
  password: number;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  address: IAddress;
}
