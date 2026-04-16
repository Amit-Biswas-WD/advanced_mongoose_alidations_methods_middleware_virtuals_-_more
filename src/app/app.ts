import express from "express";
import type { Application, Request, Response } from "express";
import { notesRoutes } from "./controllers/notes.controller";
import { usersRoutes } from "./controllers/user.controller";

export const app: Application = express();

app.use(express.json());

app.use("/notes", notesRoutes);
app.use("/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send(`Welcome to Note App is Running.`);
});

/// updateOne, findOne ===== mane One use korle {_id: noteId} === eivabe likhe dite hobe
// mvc pattern ==== Model, View, Controller
