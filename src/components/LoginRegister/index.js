import React, { useState } from "react";
import { Typography, Button, TextField, Divider } from "@mui/material";

function LoginRegister({ setCurrentUser }) {
  // States cho form Login
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // States cho form Register
  const [regLoginName, setRegLoginName] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPasswordConfirm, setRegPasswordConfirm] = useState("");
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regMessage, setRegMessage] = useState("");

  const BASE_API = "https://w2279d-8080.csb.app/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sử dụng fetch với POST request
      const response = await fetch(`${BASE_API}admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_name: loginName,
          password: password,
        }),
        credentials: "include", // gửi/nhận session cookie
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      // Parse JSON và cập nhật trạng thái user
      const data = await response.json();
      setCurrentUser(data);
      localStorage.setItem("currentUser", JSON.stringify(data));
      setLoginError("");
    } catch (error) {
      setLoginError("Login failed: " + error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (regPassword !== regPasswordConfirm) {
      setRegMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${BASE_API}user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_name: regLoginName,
          password: regPassword,
          first_name: regFirstName,
          last_name: regLastName,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      setRegMessage("Registration successful! You can now log in.");
      setRegLoginName("");
      setRegPassword("");
      setRegPasswordConfirm("");
      setRegFirstName("");
      setRegLastName("");
    } catch (error) {
      setRegMessage("Registration failed: " + error.message);
    }
  };

  return (
    <div>
      <Typography variant="h4">Login</Typography>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "300px",
        }}
      >
        <TextField
          label="Login Name"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
        {loginError && <Typography color="error">{loginError}</Typography>}
      </form>

      <Divider style={{ margin: "30px 0" }} />

      <Typography variant="h4">Register</Typography>
      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "300px",
        }}
      >
        <TextField
          label="Login Name"
          value={regLoginName}
          onChange={(e) => setRegLoginName(e.target.value)}
          required
        />
        <TextField
          label="First Name"
          value={regFirstName}
          onChange={(e) => setRegFirstName(e.target.value)}
          required
        />
        <TextField
          label="Last Name"
          value={regLastName}
          onChange={(e) => setRegLastName(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={regPassword}
          onChange={(e) => setRegPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={regPasswordConfirm}
          onChange={(e) => setRegPasswordConfirm(e.target.value)}
          required
        />
        <Button variant="contained" color="secondary" type="submit">
          Register Me
        </Button>
        {regMessage && (
          <Typography
            color={regMessage.includes("successful") ? "primary" : "error"}
          >
            {regMessage}
          </Typography>
        )}
      </form>
    </div>
  );
}

export default LoginRegister;
