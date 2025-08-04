import React from "react";
import { Link } from "react-router-dom";

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
      userCity: "",
      loading:true
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.fetchProductsFromLocation,
        (err) => {
          console.error("❌ Geolocation error in Fashion:", err);
          this.fallbackToIPorLocalStorage();
        }
      );
    } else {
      console.warn("⚠️ Geolocation not supported");
      this.fallbackToIPorLocalStorage();
    }
  }

  fetchProductsFromLocation = async (position) => {
    const { latitude, longitude } = position.coords;
    console.log("📍 Fashion page GPS:", latitude, longitude);

    try {
      const overpassQuery = `
        [out:json];
        (
          node(around:5000,${latitude},${longitude})["place"];
        );
        out body;
      `;
      const overpassURL = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
      const response = await fetch(overpassURL);
      const data = await response.json();

      const citySet = new Set();
      data.elements.forEach((el) => {
        if (el.tags?.name) {
          citySet.add(el.tags.name.trim());
        }
      });
      const nearbyCities = Array.from(citySet);
      console.log("🍽 Nearby cities for Fashion:", nearbyCities);

      if (nearbyCities.length > 0) {
        const user = JSON.parse(localStorage.getItem("user")) || {};
        user.city = nearbyCities[0];
        localStorage.setItem("user", JSON.stringify(user));

        this.fetchProductsByCityList(nearbyCities, nearbyCities[0]);
      }
    } catch (err) {
      console.error("❌ Fashion fetch failed:", err);
    }
  };

  fallbackToIPorLocalStorage = () => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((locationData) => {
        const city = locationData.city?.trim();
        if (city) {
          console.log("🌐 IP-based city:", city);
          const user = JSON.parse(localStorage.getItem("user")) || {};
          user.city = city;
          localStorage.setItem("user", JSON.stringify(user));

          this.fetchProductsByCityList([city], city);
        }
      })
      .catch(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.city) {
          this.fetchProductsByCityList([user.city], user.city);
        }
      });
  };

  //Groceries
//["topwere", "bottomwere", "chains", "luguagebags","watches","shoes"]
  fetchProductsByCityList = async (cities, primaryCity) => {
    try {
      const cityQueryParam = cities.map(encodeURIComponent).join(",");
      const res = await fetch(`https://backendta-fr54.onrender.com/api/products?cities=${cityQueryParam}`);
      const allProducts = await res.json();

      const allowedCategories = ["topwere", "bottomwere", "chains", "luguagebags","watches","shoes"];
      const filtered = allProducts.filter(
        (p) =>
          p.category &&
          allowedCategories.includes(p.category.trim().toLowerCase())
      );

      this.setState({ products: filtered, userCity: primaryCity ,loading:false});
    } catch (err) {
      console.error("❌ Error fetching Fashion items:", err);
    }
  };

  render() {
    const { products, userCity,loading } = this.state;

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
  {loading ? (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Loading fashion products near you...</p>
    </div>
  ) : products.length > 0 ? (
    products.map((item, index) => (
      <Link
        to={`/product/${item.name}`}
        state={item}
        key={index}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="product-card">
          <img src={item.src} alt={item.name} />
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
      🚫 No Fashion products found in <b>{userCity}</b>
    </p>
  )}
</div>

      </div>
    );
  }
}

export default Fashion;
