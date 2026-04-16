import { model, Schema } from "mongoose";
import { INotes } from "../interfaces/notes.interface";

const NoteSchema = new Schema<INotes>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    category: {
      type: String,
      enum: ["personal", "group", "single"],
      default: "personal",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      level: { type: String, required: true },
      color: { type: String, default: "Black" },
    },
    user: {
      // referencing
      type: Schema.Types.ObjectId,
      ref: "User", // jar sathe reference hote tar model er nam
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Note = model<INotes>("Note", NoteSchema);
