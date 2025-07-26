import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    city: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("https://backendta-fr54.onrender.com/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    toast.success("Registered! Please log in.");
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="animation-container">
        <p className="login-message">Welcome! Let's get you registered 💼</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input name="city" placeholder="City" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
        <p>Already Have account?<a href="/login">Login</a></p>
        <hr></hr>
        <p>Want to Become admin?<a href="/admincreate">Be an Admin</a></p>

      </form>
    </div>
  );
}

export default Register;
