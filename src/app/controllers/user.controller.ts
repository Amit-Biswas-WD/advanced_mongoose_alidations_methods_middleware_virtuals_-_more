import express, { Request, Response } from "express";
import { User } from "../models/user.models";

export const usersRoutes = express.Router();

// create a user
usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  const body = req.body;
  const user = await User.create(body);

  res.status(201).json({
    success: true,
    message: "User created successfully.",
    user,
  });
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
