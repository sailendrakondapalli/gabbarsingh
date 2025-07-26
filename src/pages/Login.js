import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import deliveryAnimation from "../animations/delivery.json"; // Lottie file
// toast.configure();
function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
    const res = await fetch("https://backendta-fr54.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
       toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error(data.message);
    }}
    catch(err){
      toast.error("Login failed. Please try again.");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <Lottie  animationData={deliveryAnimation} loop={true} />
        <p className="login-message">Bag not open yet. Please login first!</p>
      </div>

      <div className="login-right">
        <form onSubmit={handleLogin} className="login-form">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {
          loading ? <div className="spinner">Loading...</div> : <button type="submit">Login</button>
          }

          <p>Don't have an account? <a href="/register">Create one</a></p>
          <hr></hr>
          <p>Are You Admin? <a href="/adminlogin">Login As Admin</a></p>

        </form>
      </div>
    </div>
  );
}

export default Login;
