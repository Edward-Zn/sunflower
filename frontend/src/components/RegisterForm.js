import React, { useState } from "react";

const RegisterForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      console.error("All fields are required.");
      return;
    }

    console.log("Submitting registration:", formData);
    try {
      console.log(JSON.stringify(formData));
      const response = await fetch(
        "http://localhost:5000/api/player/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log("On Register data:", JSON.stringify(data));
      if (response.ok) {
        console.log("Player registered successfully:", data);
        onRegister(data); // Call the prop function to update parent state (App.js)

        setFormData({ username: "", email: "", password: "" });
      } else {
        console.error("Registration failed (RF):", data.message);
      }
    } catch (error) {
      console.error("Error registering player (RF):", error);
    }
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
