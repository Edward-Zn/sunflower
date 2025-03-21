import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import log from "../utils/logger";

const LoginForm = ({ onLoginSuccess }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // For Login Button disable while submitting data
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e) => {
    // Prevent the default behavior of the form submit that is:
    // Reloading the page -> Clear the inputs
    e.preventDefault();
    setIsLoggingIn(true);

    // So the axios.post() call will handle the form data instead
    try {
      const response = await axios.post(`${API_URL}/api/player/login`, {
        email,
        password,
      });

      const { token, player } = response.data;

      // Save JWT token to the browser local storage
      localStorage.setItem("token", token);

      onLoginSuccess(player);
    } catch (error) {
      toast.error(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
        autoFocus
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={isLoggingIn}>
        {isLoggingIn ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
