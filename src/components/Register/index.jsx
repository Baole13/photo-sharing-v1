import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { apiPost } from "../../lib/api";

function Register() {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    login_name: "",
    password: "",
    password_repeat: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegisterChange = (field, value) => {
    setRegisterForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (registerForm.password !== registerForm.password_repeat) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      await apiPost("/user", {
        login_name: registerForm.login_name,
        password: registerForm.password,
        first_name: registerForm.first_name,
        last_name: registerForm.last_name,
        location: registerForm.location,
        description: registerForm.description,
        occupation: registerForm.occupation,
      });

      setSuccessMessage("Đăng ký thành công. Đang chuyển về trang đăng nhập...");

      setRegisterForm({
        login_name: "",
        password: "",
        password_repeat: "",
        first_name: "",
        last_name: "",
        location: "",
        description: "",
        occupation: "",
      });

      setTimeout(() => {
        navigate("/login-register");
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 520,
        margin: "0 auto",
        padding: 4,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Register
      </Typography>

      <TextField
        label="Login Name"
        value={registerForm.login_name}
        onChange={(event) =>
          handleRegisterChange("login_name", event.target.value)
        }
        fullWidth
        margin="normal"
      />

      <TextField
        label="Password"
        type="password"
        value={registerForm.password}
        onChange={(event) =>
          handleRegisterChange("password", event.target.value)
        }
        fullWidth
        margin="normal"
      />

      <TextField
        label="Repeat Password"
        type="password"
        value={registerForm.password_repeat}
        onChange={(event) =>
          handleRegisterChange("password_repeat", event.target.value)
        }
        fullWidth
        margin="normal"
      />

      <TextField
        label="First Name"
        value={registerForm.first_name}
        onChange={(event) =>
          handleRegisterChange("first_name", event.target.value)
        }
        fullWidth
        margin="normal"
      />

      <TextField
        label="Last Name"
        value={registerForm.last_name}
        onChange={(event) =>
          handleRegisterChange("last_name", event.target.value)
        }
        fullWidth
        margin="normal"
      />

      <TextField
        label="Location"
        value={registerForm.location}
        onChange={(event) =>
          handleRegisterChange("location", event.target.value)
        }
        fullWidth
        margin="normal"
      />

      <TextField
        label="Description"
        value={registerForm.description}
        onChange={(event) =>
          handleRegisterChange("description", event.target.value)
        }
        fullWidth
        margin="normal"
        multiline
        rows={2}
      />

      <TextField
        label="Occupation"
        value={registerForm.occupation}
        onChange={(event) =>
          handleRegisterChange("occupation", event.target.value)
        }
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        fullWidth
        onClick={handleRegister}
        sx={{ marginTop: 2 }}
      >
        Register Me
      </Button>

      {errorMessage && (
        <Typography color="error" sx={{ marginTop: 2 }} align="center">
          {errorMessage}
        </Typography>
      )}

      {successMessage && (
        <Typography color="primary" sx={{ marginTop: 2 }} align="center">
          {successMessage}
        </Typography>
      )}

      <Typography sx={{ marginTop: 3 }} align="center">
        Bạn đã có tài khoản?{" "}
        <MuiLink component={Link} to="/login-register">
          Quay lại đăng nhập
        </MuiLink>
      </Typography>
    </Box>
  );
}

export default Register;