import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const tokenHeader = req.headers["authorization"];

  if (!tokenHeader?.startsWith("Bearer ")) {
    return res.status(403).json({ error: "No token provided" });
  }

  const token = tokenHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch {
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default authenticateToken;
