import { Request, Response } from "express";
import {
  createNote,
  readNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController";
const express = require("express");
const router = express.Router();

router.post("/", createNote);

router.get("/", readNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
