import React, { Component } from "react";
import axios from "axios";

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      cost: "",
      city: "",
      store: "",
      stock: "",
      src: null,
      unit: "", // <- NEW
  showUnit: false,
      message: "",
      user: null,
      isAuthorized: false,
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      this.setState({ message: "Please login to continue." });
    } else if (user.role !== "admin") {
      this.setState({ message: "Access denied. You are not an admin." });
    } else {
      this.setState({ user, isAuthorized: true });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
     if (name === "category") {
    const lower = value.toLowerCase();
    this.setState({
      category: value,
      showUnit: lower === "food", // show unit dropdown only for "food"
    });
  } else {
    this.setState({ [name]: value });
  }
    
  };

  handleFileChange = (e) => {
    this.setState({ src: e.target.files[0] });
  };

 handleSubmit = async (e) => {
  e.preventDefault();
  const { name, category, cost, store, stock, src, city, user, unit  } = this.state;

  if (!name || !category || !cost || !store || !stock || !src || !city || (this.state.showUnit && !unit)) {
    this.setState({ message: "Please fill in all fields." });
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("category", category);
  formData.append("cost", cost);
  formData.append("store", store);
  formData.append("stock", stock);
  formData.append("city", city);
  formData.append("image", src); // image field name expected in multer
  formData.append("adminEmail", user.email);
  formData.append("unit", unit);

  try {
    const res = await axios.post("https://backendta-fr54.onrender.com/api/add-product", formData);
    this.setState({ message: "✅ Product uploaded successfully!" });
  } catch (error) {
    console.error(error);
    this.setState({ message: "❌ Failed to upload product." });
  }
};


  render() {
    const { isAuthorized, message } = this.state;

    if (!isAuthorized) {
      return (
        <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
          <h2>{message || "Checking authorization..."}</h2>
        </div>
      );
    }

    return (
      <div className="admin-panel">
      <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
        <h2>🛒 Admin Product Upload</h2>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <input type="text" name="name" placeholder="Product Name" onChange={this.handleChange} /><br /><br />
          <input type="text" name="category" placeholder="Category" onChange={this.handleChange} /><br /><br />
          <input type="text" name="cost" placeholder="Cost" onChange={this.handleChange} /><br /><br />
          <input type="text" name="store" placeholder="Store Name" onChange={this.handleChange} /><br /><br />
          <input type="text" name="stock" placeholder="Stock Count" onChange={this.handleChange} /><br /><br />
          <input type="text" name="city" placeholder="City" onChange={this.handleChange} /><br /><br />
          <input type="file" onChange={this.handleFileChange} /><br /><br />
          {this.state.showUnit && (
  <>
    <select name="unit" value={this.state.unit} onChange={this.handleChange}>
      <option value="">--Select Quantity--</option>
      <option value="0.5kg">0.5 kg</option>
      <option value="1kg">1 kg</option>
      <option value="2kg">2 kg</option>
    </select><br /><br />
  </>
)}

          <button type="submit">Upload Product</button>
        </form>
        {message && (
          <p style={{ marginTop: "20px", color: message.includes("✅") ? "green" : "red" }}>{message}</p>
        )}
      </div>
      </div>
    );
  }
}

export default AdminPanel;
