import dotenv from "dotenv";
dotenv.config();

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.log("JWT_SECRET is not defined!");
  throw new Error("JWT_SECRET is not defined!");
}

const generateAccessToken = (username: string) => {
  const payload = { username };
  const options = { expiresIn: "15m" };
  return jwt.sign(payload, JWT_SECRET, options);
};

const verifyAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { success: true, data: decoded };
  } catch (error) {
    console.error("Token verification failed", error);
    return { success: false, error: "Invalid token" };
  }
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
