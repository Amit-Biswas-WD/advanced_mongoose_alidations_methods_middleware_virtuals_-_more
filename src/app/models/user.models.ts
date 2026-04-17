import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  UserInstanceMethod,
  UserStaticMethods,
} from "../interfaces/user.interface";
import validator from "validator";
import bcrypt from "bcryptjs";
import { Note } from "./notes.models";

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

// const UserSchema = new Schema<IUser, Model<IUser, {}, UserInstanceMethod>, UserInstanceMethod>( // instance method
const UserSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethod>( // static method
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
      type: String,
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  },
);

// instance method
UserSchema.method("hasPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(String(plainPassword), 10);
  return password;
});

// static method
UserSchema.static("hasPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(String(plainPassword), 10);
  return password;
});

// ----------- Pre Hooks ------------

//Document Middleware
UserSchema.pre("save", async function () {
  // console.log("pre save hook.");
  this.password = await bcrypt.hash(String(this.password), 10);
  // console.log(this);
});

// Query Middleware
UserSchema.pre("find", function (next) {
  console.log("inside pre find hook");
});

// ----------- Post Hooks ------------

// Document Middleware
UserSchema.post("save", function (doc) {
  // console.log("%s has been saved", doc._id);
  console.log(`${doc.email} has been saved`);
});

// Query Middleware
UserSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    console.log(doc);
    await Note.deleteMany({ user: doc._id });
  }
});

// Create a virtual property
UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// // instance
// export const User = model<IUser, Model<IUser, {}, UserInstanceMethod>>(
//   "User",
//   UserSchema,
// ); // model er nam use korte hobe ref: e (example: User)

// static
export const User = model<IUser, UserStaticMethods>("User", UserSchema);
