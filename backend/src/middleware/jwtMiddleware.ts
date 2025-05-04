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
    return res.status(401).json({ error: "No token provided" });
  }

  const token = tokenHeader.split(" ")[1];
  console.log("Recieved token", token);
  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in enviroment");
      return res
        .status(500)
        .json({ error: "Server authentication configuration error" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    console.log("Decoded user", req.user);
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default authenticateToken;
