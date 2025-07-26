import React, { Component } from "react";
import axios from "axios";

class CreateAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      city: "",
      message: "",
      error: "",
      otp: "",
otpSent: false,
otpVerified: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, message: "", error: "" });
  };

sendOtp = async () => {
  try {
    const res = await axios.post("https://backendta-fr54.onrender.com/api/create-otp", {
      email: this.state.email,
    });

    if (res.data.success) {
      this.setState({ otpSent: true, message: "OTP sent to email" });
    } else {
      this.setState({ error: res.data.message });
    }
  } catch (err) {
    console.error(err);
    this.setState({ error: "Failed to send OTP" });
  }
};

verifyOtp = async () => {
  try {
    const res = await axios.post("https://backendta-fr54.onrender.com/api/verify-admin-otp", {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      city: this.state.city,
      otp: this.state.otp,
    });

    if (res.data.success) {
      this.setState({ otpVerified: true, message: "Admin created after OTP verification" });
    } else {
      this.setState({ error: res.data.message });
    }
  } catch (err) {
    console.error(err);
    this.setState({ error: "Failed to verify OTP" });
  }
};





  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //    if (!this.state.otpVerified) {
  //   this.setState({ error: "Please verify OTP first" });
  //   return;
  // }
  //   const { name, email, password, city } = this.state;

  //   try {
  //     const res = await axios.post("http://192.168.29.28:5000/api/create-admin", {
  //       name,
  //       email,
  //       password,
  //       city,
  //     });

  //     if (res.data.success) {
  //       this.setState({
  //         message: res.data.message,
  //         name: "",
  //         email: "",
  //         password: "",
  //         city: "",
  //       });
  //     } else {
  //       this.setState({ error: res.data.message });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     this.setState({ error: "Something went wrong" });
  //   }
  // };

  render() {
    const { name, email, password, city, message, error } = this.state;

    return (
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
        <h2>Create Admin</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            value={name}
            onChange={this.handleChange}
            required
          /><br /><br />
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={email}
            onChange={this.handleChange}
            required
          /><br /><br />
          <button
  type="button"
  onClick={this.sendOtp}
  disabled={!email || this.state.otpSent}
>
  Send OTP
</button>
<br /><br />

{this.state.otpSent && !this.state.otpVerified && (
  <>
    <input
      type="text"
      name="otp"
      placeholder="Enter OTP"
      value={this.state.otp}
      onChange={this.handleChange}
      required
    /><br /><br />
    <button type="button" onClick={this.verifyOtp}>
      Verify OTP
    </button><br /><br />
  </>
)}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
            required
          /><br /><br />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={city}
            onChange={this.handleChange}
            required
          /><br /><br />
          <button type="submit" disabled={this.state.otpVerified}>
  Create Admin
</button>
        </form>
        <br />
          <p>Are You Admin? <a href="/adminlogin">Login As Admin</a></p>
        
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }
}

export default CreateAdmin;
