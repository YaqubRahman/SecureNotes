import { Request, Response } from "express";
const { checkUsername, checkPassword } = require("../middleware/validation");
const { generateAccessToken } = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } =
    req.body;
  const usernameValidation = checkUsername(username);
  const passwordValidation = checkPassword(password);

  if (!usernameValidation.isValid) {
    return res.status(401).json({ error: usernameValidation.error });
  }
  if (!passwordValidation.isValid) {
    return res.status(401).json({ error: passwordValidation.error });
  }

  const token = generateAccessToken(username);

  res.status(200).json({ token });
});

export default router;
