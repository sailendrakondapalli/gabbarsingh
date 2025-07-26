import React, { useState } from "react";
import { toast } from "react-toastify";

function User() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    category: "",
    cost: "",
    stock: user?.city || "",
    store: user?.email || "",
    city: user?.city || "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please select an image.");

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }
    formData.append("image", image);
    formData.append("userId", user.email);

    try {
      const res = await fetch("http://localhost:5000/api/products/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      toast.success("Product added successfully!");
      setForm({ ...form, name: "", category: "", cost: "" });
      setImage(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Your Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input name="cost" placeholder="Cost" type="number" value={form.cost} onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default User;
