import notesRoutes from "./routes/notesRoutes";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/dashboard", notesRoutes);

app.get("/", (_req, res) => {
  res.send("Hello from backend");
});

export default app;
