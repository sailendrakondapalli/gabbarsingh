import React from "react";
import { Link } from "react-router-dom";

// Category images (keep in /public/images/)
const categories = [
  { src: "/images/topweres.jpg", name: "Top Weres", path: "top-weres" },
  { src: "/images/bottomwere.jpg", name: "Bottom Weres", path: "bottom-weres" },
  { src: "/images/watches.jpg", name: "Watches", path: "watches" },
  { src: "/images/shooes.jpg", name: "Shoes", path: "shoes" },
  { src: "/images/luggage.jpg", name: "Luggage Bags", path: "luguagebags" },
  { src: "/images/chains.jpg", name: "Chains", path: "chains" }
];

class Fashion extends React.Component {
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
            (p) => ["topwere", "bottomwere", "chains", "luguagebags","watches","shoes"].includes(p.category?.toLowerCase())
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

                  {/* <img src={`/images/${item.src}`} alt={item.name} /> */}
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

export default Fashion;
