import React from "react";
import { Link } from "react-router-dom";

// Category images (keep in /public/images/)
const categories = [
  { src: "/images/homecareee.jpeg", name: "Personal & Home Care", path: "homecare" },
  { src: "/images/bekaryyy.jpeg", name: "Bakery", path: "bakery" },
  { src: "/images/eggsss.jpeg", name: "Dairy & Eggs", path: "eggs" },
  { src: "/images/oilsss.jpeg", name: " Oils & Ghee", path: "oils" },
  { src: "/images/spicesss.jpeg", name: "Spices & Condiments", path: "spices" },
  { src: "/images/pulsesss.jpeg", name: "Pulses & Lentils", path: "pulses" },
  { src: "/images/riceee.jpeg", name: "Grains & Rice", path: "rice" },
  { src: "/images/fruitsss.jpeg", name: "Fruits", path: "fruits" },
  { src: "/images/vegiesss.jpeg", name: "Vegetables", path: "vegies" }

];

class Groceries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      userCity: ""
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    const city = (user?.city || user?.address || "").trim().toLowerCase();

    if (city) {
      this.setState({ userCity: city });

      fetch(`https://backendta-fr54.onrender.com/api/products?city=${city}`)
        .then(res => res.json())
        .then(data => {
          // Show only 'topwere' items initially
           const initialProducts = data.filter(
            (p) => ["bakery", "eggs", "fruits", "homecare","oils","pulses","rice","spices","vegetables"].includes(p.category?.toLowerCase())
          );
          this.setState({ products: initialProducts });
        })
        .catch(err => {
          console.error("❌ Failed to fetch products:", err);
        });
    }
  }

  render() {
    const { products, userCity } = this.state;

    return (
      <div>
        {/* Category Links */}
        <div className="all">
          {categories.map((item, index) => (
            <Link
              to={`/category/${item.path}`}
              key={index}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div>
                <img src={item.src} alt={item.name} />
                <p>{item.name}</p>
              </div>
            </Link>
          ))}
        </div>

        <hr />

        {/* Product Grid */}
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((item, index) => (
              <Link
                to={`/product/${item.name}`}
                state={item}
                key={index}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="product-card">
                  <img src={item.src} alt={item.name}  />
                  <p className="product-name">{item.name}</p>
                  <p>From: {item.store}</p>
                  <p className="product-cost">Cost: ₹{item.cost}</p>
                  <h5 className="product-stock">📍 {item.stock}</h5>
                </div>
              </Link>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "red" }}>
              🚫 No topwear products found in <b>{userCity}</b>
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Groceries;
