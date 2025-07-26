import React from "react";
import { Link } from "react-router-dom";

class Luguagebags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topProducts: [],
      userCity: ""
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    const city = (user?.city || user?.address || "").trim().toLowerCase();

    if (city) {
      this.setState({ userCity: city });

      fetch(`https://backendta-fr54.onrender.com/api/products?city=${city}`)
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter(
            (p) => p.category?.toLowerCase() === "luguagebags"

          );
          this.setState({ topProducts: filtered });
        })
        .catch((err) => {
          console.error("❌ Failed to fetch products:", err);
        });
    }
  }

  render() {
    const { topProducts, userCity } = this.state;

    return (
      <div className="product-grid">
        
        {topProducts.length > 0 ? (
          topProducts.map((item, index) => (
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
                <h5 className="product-stock">{item.stock}</h5>
              </div>
            </Link>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "red" }}>
            🚫 No topwear products available for your city ({userCity})
          </p>
        )}
      </div>
    );
  }
}

export default Luguagebags;

//Luguagebags