import { Request, Response } from "express";
import {
  createNote,
  readNote,
  updateNote,
} from "../controllers/notesController";
import authenticateToken from "../middleware/jwtMiddleware";
const express = require("express");
const router = express.Router();

router.post("/notes", authenticateToken, createNote);

router.get("/notes", authenticateToken, readNote);

router.put("/:id", authenticateToken, updateNote);

export default router;
