import React from "react";
import { Link } from "react-router-dom";

// Category images (keep in /public/images/)
const categories = [
  { src: "/images/biriyani.jpeg", name: "Biriyani", path: "biriyani" },
  { src: "/images/roti.jpeg", name: "Roti", path: "roti" },
  { src: "/images/pickle.jpeg", name: "Pickels", path: "pickle" },
  { src: "/images/milk.jpeg", name: "Milk", path: "milk" },
  { src: "/images/sweet.jpeg", name: "Sweet", path: "sweet" },
  { src: "/images/biriyani.jpeg", name: "TownyArsensl Spl", path: "biriyani" }
];

class Food extends React.Component {
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
          console.log("Fetched products:", data);
          // Show only 'food' items initially
           const initialProducts = data.filter(
            (p) => ["biriyani", "roti", "pickels", "milk","sweet","townyarsenalspl"].includes(p.category?.toLowerCase())
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
                  {item.unit !== undefined && (
    <p className="product-unit">Quantity: {item.unit}</p>
  )}
                  <p className="product-cost">Cost: ₹{item.cost}</p>
                  <h5 className="product-stock">📍 {item.stock}</h5>
                </div>
              </Link>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "red" }}>
              🚫 No food products found in <b>{userCity}</b>
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Food;
