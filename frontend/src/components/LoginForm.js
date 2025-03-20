import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    // Prevent the default behavior of the form submit that is:
    // Reloading the page -> Clear the inputs
    e.preventDefault();

    // So the axios.post() call will handle the form data instead
    try {
      const response = await axios.post(
        "http://localhost:5000/api/player/login",
        {
          email,
          password,
        }
      );

      const { token, player } = response.data;

      // Save JWT token to the browser local storage
      localStorage.setItem("token", token);
      
      toast.success(`Welcome back, ${player.username}!`);
      onLoginSuccess(player);
    } catch (error) {
      toast.error(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
