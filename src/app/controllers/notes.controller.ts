import express, { Request, Response } from "express";
import { Note } from "../models/notes.models";

export const notesRoutes = express.Router();

// Create data
notesRoutes.post("/create-note", async (req: Request, res: Response) => {
  // Approach - 1 creating a data

  // const myNote = new Note({
  //   title: "Learning Typescript",
  //   tags: {
  //     level: "Database",
  //   },
  // });
  // await myNote.save();

  // Approach - 1 creating a data

  const body = req.body;
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: note,
  });
});

// Read data
notesRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: notes,
  });
});

// Read Single data
notesRoutes.get("/:nodeId", async (req: Request, res: Response) => {
  const id = req.params.nodeId;
  const notes = await Note.findById(id);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: notes,
  });
});

// Delete Single data
notesRoutes.delete("/:nodeId", async (req: Request, res: Response) => {
  const id = req.params.nodeId;

  // const notes = await Note.findByIdAndDelete(id);
  // const notes = await Note.findOneAndDelete({ _id: id });
  const notes = await Note.deleteOne({ _id: id });

  res.status(201).json({
    success: true,
    message: "Note Deleted successfully",
    note: notes,
  });
});

// Update Single data
notesRoutes.patch("/:nodeId", async (req: Request, res: Response) => {
  const id = req.params.nodeId;
  const UpdatedBody = req.body;

  // const notes = await Note.findByIdAndUpdate(id, UpdatedBody, { new: true });
  const notes = await Note.findOneAndUpdate({ _id: id }, UpdatedBody, {
    new: true,
  });
  // const notes = await Note.updateOne({ _id: id }, UpdatedBody);

  res.status(201).json({
    success: true,
    message: "Note updated successfully",
    note: notes,
  });
});
