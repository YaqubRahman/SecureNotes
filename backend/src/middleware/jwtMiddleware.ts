import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

export interface AuthenticatedRequest extends Request {
  user?: any;
}

const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const tokenHeader = req.headers["authorization"];

  if (!tokenHeader?.startsWith("Bearer ")) {
    return res.status(403).json({ error: "No token provided" });
  }

  const token = tokenHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default authenticateToken;
