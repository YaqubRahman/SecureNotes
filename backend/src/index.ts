import notesRoutes from "./routes/notesRoutes";
import dotenv from "dotenv";
dotenv.config();

console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

import express from "express";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("notes", notesRoutes);

app.get("/", (_req, res) => {
  res.send("Hello from backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
