import { Request, Response } from "express";
import {
  createNote,
  readNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController";
const express = require("express");
const router = express.Router();

router.post("/notes", createNote);

router.get("/notes", readNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
