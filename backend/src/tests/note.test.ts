import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import app from "../app";
import dotenv from "dotenv";
dotenv.config();

let token: string;

beforeAll(async () => {
  const res = await request(app).post("/auth/login").send({
    username: "intern",
    password: "password123",
  });
  token = res.body.token;
});

describe("Notes Routes", () => {
  it("should reject access without token", async () => {
    const rest = await request(app).get("/dashboard/notes");
    expect(rest.statusCode).toBe(401);
  });

  it("should allow adding a note with correct token", async () => {
    const res = await request(app)
      .post("/dashboard/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Test note" });
    expect(res.statusCode).toBe(201);
    expect(res.body.text).toBe("Test note");
  });
});
