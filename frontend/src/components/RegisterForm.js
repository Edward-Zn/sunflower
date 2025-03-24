import React, { useState } from "react";
import log from "../utils/logger";
import fetchWithAuth from "../utils/api";

const API_URL = process.env.REACT_APP_API_URL;

const RegisterForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  // For disabling Register Button while submitting data
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      log.error("All fields are required");
      return;
    }

    setIsSubmitting(true);

    log.info("Submitting registration: ", formData);
    try {
      log.info(JSON.stringify(formData));

      const response = await fetchWithAuth("/api/player/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      log.info("On register data:", JSON.stringify(data));

      if (response.ok) {
        log.info("Player registered successfully:", data);
        onRegister(data); // Call the prop function to update parent state (App.js)

        setFormData({ username: "", email: "", password: "" });
      } else {
        log.error("Registration failed (RegisterForm)", data.message);
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      log.error("Error registering player (RegisterForm):", error);
      alert("An error occurred while registering.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="register-container">
      <h2>Player Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
          className="input-field"
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-field"
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input-field"
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
