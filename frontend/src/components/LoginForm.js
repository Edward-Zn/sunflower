import React, { useState } from "react";
import axios from "axios";
import { showSuccess, showError } from "../utils/toastNotifications";
import log from "../utils/logger";
import fetchWithAuth from "../utils/api";

const API_URL = process.env.REACT_APP_API_URL;

const LoginForm = ({ onLoginSuccess }) => {
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

      showSuccess(`Welcome back, ${player.username}!`);
      onLoginSuccess(player);
    } catch (error) {
      log.error('Login failed', error);
      showError(
        "Login failed (Form): " + (error.response?.data?.message || error.message)
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          required
          className="input-field"
          autoFocus
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" disabled={isLoggingIn} className="accept">
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
