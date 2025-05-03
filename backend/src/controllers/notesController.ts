import { Response } from "express";
import notes from "../db/notesData";
import { AuthenticatedRequest } from "../middleware/jwtMiddleware";

let currentID = 0;

const createNote = (req: AuthenticatedRequest, res: Response) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required!" });
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

const readNote = (req: AuthenticatedRequest, res: Response) => {
  const userNotes = notes.filter(
    (note) => note.username === req.user?.username
  );
  res.json(userNotes);
};

const updateNote = (req: AuthenticatedRequest, res: Response) => {
  const noteID = parseInt(req.params.id);
  const { text } = req.body;
  const username = req.user?.username;

  const note = notes.find(
    (note) => note.id === noteID && note.username === username
  );
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  note.text = text ?? note.text;
  res.json(note);
};

const deleteNote = (req: AuthenticatedRequest, res: Response) => {
  const noteID = parseInt(req.params.id);
  const username = req.user?.username;

  const index = notes.findIndex(
    (note) => note.username === req.user?.username && note.id === noteID
  );

  const deletedNote = notes.splice(index, 1);
  res.json({ message: "Note deleted", deleted: deletedNote[0] });
};

export { createNote, readNote, updateNote, deleteNote };
