import React, { useState } from "react";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting registration:", formData);
        // Here, the form data will be sent to the backend later
    };

    return (
        <div className="register-container">
            <h2>Player Registration</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />

                <button type="submit">Register</button>
                {/* <label>---</label>
                <button type="submit" class="error-button">Cancel</button> */}
            </form>
        </div>
    );
};

export default RegisterForm;
