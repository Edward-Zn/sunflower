import React, { useState } from "react";

const RegisterForm = () => {
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
        console.log("Submitting registration:", formData);

        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Player registered successfully:", data);
                onRegister(data); // Pass player data to the parent component (App.js)
            } else {
                console.error("Registration failed:", data.message);
            }
        } catch (error) {
            console.error("Error registering player:", error);
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
                    required
                />

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>
                {/* <label>---</label>
                <button type="submit" class="error-button">Cancel</button> */}
            </form>
        </div>
    );
};

export default RegisterForm;
