import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Login.css";
import usernameIcon from "../assets/login/user.png";
import passwordIcon from "../assets/login/password.png";

const BASE_URL = "http://localhost:5000"; // My backend port

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("Login successful", data);

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="loginfont">
        <h1>SecureNotes Login</h1>

        <p>Username</p>
        <img src={usernameIcon} className="loginicon" alt="Username Icon" />
        <input
          type="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <p>Password</p>
        <img src={passwordIcon} className="loginicon" alt="Password Icon" />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="loginbutton">
          <button className="button" onClick={handleLogin}>
            Login
          </button>
        </div>
        {error && <p className="error">Incorrect credentials</p>}
      </div>
    </div>
  );
}

export default Login;
