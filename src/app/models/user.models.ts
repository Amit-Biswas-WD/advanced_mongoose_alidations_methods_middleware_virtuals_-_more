import { model, Schema } from "mongoose";
import { IAddress, IUser } from "../interfaces/user.interface";
import validator from "validator";

const AddressSchema = new Schema<IAddress>(
  {
    city: { type: String, required: true },
    street: { type: String, required: true },
    zip_code: { type: Number, required: true },
  },
  {
    _id: false,
  },
);

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "first name keno deu nai???"], // custom error message
      trim: true,
      minlength: [3, "First name Must be at least 3, got {VALUE}"], // built in error message
      maxLength: 10,
    },
    lastName: {
      type: String,
      trim: true,
      minlength: [3, "Last name Must be at least 3, got {VALUE}"],
      maxLength: 12,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: [true, "Email common hoye giyeche!"],
      trim: true,
      // custom email validator
      // validate: {
      //   validator: function (value) {
      //     // return /^[^\s@]+@[^\s@]+$/.test(value);
      //     // or
      //     return false;
      //   },
      //   message: function (props) {
      //     return `Email ${props.value} isn,t valid email.`;
      //   },
      // },

      // npm i validator
      validate: [validator.isEmail, "Invalid Email {VALUE}"],
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Must be at least 18, got {VALUE}"],
      max: 28,
    },
    password: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["USER", "ADMIN", "SUPER_ADMIN"],
        message: "Role is not valid. got {VALUE} role",
      },
      default: "USER",
      uppercase: true,
    },
    address: { type: AddressSchema },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const User = model<IUser>("User", UserSchema);
