import React, { Component } from "react";
import axios from "axios";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
      error: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, message: "", error: "" });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const res = await axios.post("https://backendta-fr54.onrender.com/api/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        this.setState({ message: res.data.message });
        window.location.href = "/admin"; // ✅ redirect after login
      } else {
        this.setState({ error: res.data.message });
      }
    } catch (err) {
      console.error(err);
      this.setState({ error: "Login failed. Try again." });
    }
  };

  render() {
    const { email, password, message, error } = this.state;

    return (
        <div className="admin-login">
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
        <h2>Admin Login</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
            required
          /><br /><br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
            required
          /><br /><br />
          <button type="submit">Login</button>
        </form>
        <br />

        <p>Want to Become admin?<a href="/admincreate">Be an Admin</a></p>

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      </div>
    );
  }
}

export default AdminLogin;
