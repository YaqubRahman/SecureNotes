const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const generateAccessToken = (username: string) => {
  const payload = { username };
  const options = { expiresIn: "15m" };
  return jwt.sign(payload, JWT_SECRET, options);
};

const verifyAccessToken = (token: string) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return { success: true, data: decoded };
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
