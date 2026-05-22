import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  loginApi,
  registerApi,
} from "../../api/authApi";

import { useAuth } from "../../contexts/AuthContext";

export default function LoginRegister() {
  const navigate = useNavigate();

  const { login } =
    useAuth();

  const [isRegister, setIsRegister] =
    useState(false);

  const [formData, setFormData] =
    useState({
      login_name: "",
      password: "",
      first_name: "",
      last_name: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      if (isRegister) {
        await registerApi(
          formData
        );

        alert(
          "Register successful"
        );

        setIsRegister(false);

        return;
      }

      const result =
        await loginApi({
          login_name:
            formData.login_name,

          password:
            formData.password,
        });

      login(
        result.user,
        result.token
      );

      navigate(
        `/users/${result.user._id}`
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>
        {isRegister
          ? "Register"
          : "Login"}
      </h2>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="login_name"
          placeholder="Login Name"
          value={
            formData.login_name
          }
          onChange={
            handleChange
          }
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
          required
        />

        {isRegister && (
          <>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={
                formData.first_name
              }
              onChange={
                handleChange
              }
              required
            />

            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={
                formData.last_name
              }
              onChange={
                handleChange
              }
              required
            />
          </>
        )}

        <button type="submit">
          {isRegister
            ? "Register"
            : "Login"}
        </button>
      </form>

      <p>
        {isRegister
          ? "Already have an account?"
          : "Don't have an account?"}
      </p>

      <button
        onClick={() =>
          setIsRegister(
            !isRegister
          )
        }
      >
        {isRegister
          ? "Go to Login"
          : "Go to Register"}
      </button>
    </div>
  );
}