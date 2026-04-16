import express, { Request, Response } from "express";
import { User } from "../models/user.models";
import z from "zod";

export const usersRoutes = express.Router();

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  age: z.number(),
  password: z.number(),
  role: z.string(),
});

// create a user
usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    const zodBody = await CreateUserZodSchema.parseAsync(req.body);
    // console.log(zodBody, "zod body");

    const body = req.body;

    const user = await User.create(body);

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

// read all data
usersRoutes.get("/", async (req: Request, res: Response) => {
  const body = req.body;
  const user = await User.find(body);

  res.status(201).json({
    success: true,
    message: "User all data.",
    user,
  });
});

// read single data /:userId
usersRoutes.get("/:userId", async (req: Request, res: Response) => {
  const id = req.params.userId;
  const user = await User.findById(id);

  res.status(201).json({
    success: true,
    message: "User single data.",
    user,
  });
});

// delete single user data
usersRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const id = req.params.userId;
  const user = await User.deleteOne({ _id: id });

  res.status(201).json({
    success: true,
    message: "User data delete successfully.",
    user,
  });
});

// update single user data
usersRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const id = req.params.userId;
  const updateBody = req.body;
  const user = await User.findOneAndUpdate({ _id: id }, updateBody);

  res.status(201).json({
    success: true,
    message: "User data update successfully.",
    user,
  });
});
