import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import app from "../app";
import dotenv from "dotenv";
dotenv.config();

describe("Auth Routes", () => {
  it("should succeed with correct credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "intern", password: "password123" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should fail with incorrect credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "inter", password: "wrongpassword" });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});
