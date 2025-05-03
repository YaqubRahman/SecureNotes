import { Response } from "express";
import notes from "../db/notesData";
import { AuthenticatedRequest } from "../middleware/jwtMiddleware";

let currentID = 0;

const createNotes = (req: AuthenticatedRequest, res: Response) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ error: "Text is required!" });
  }

  const newNote = {
    id: currentID++,
    text,
    username: req.user?.username,
    timestamp: Date.now(),
  };

  notes.push(newNote);
  res.status(201).json(newNote);
};

const readNotes = (req: AuthenticatedRequest, res: Response) => {
  const userNotes = notes.filter(
    (notes) => notes.username === req.user?.username
  );
  res.json(userNotes);
};

const updateNotes = (req: AuthenticatedRequest, res: Response) => {};

const deleteNotes = (req: AuthenticatedRequest, res: Response) => {};
