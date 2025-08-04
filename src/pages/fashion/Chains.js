import React from "react";
import { Link } from "react-router-dom";

class Chains extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topProducts: [],
      userCity: "",
      loading:true
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.fetchProductsFromLocation,
        (err) => {
          console.error("❌ Geolocation error in Chains:", err);
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
    console.log("📍 Chains GPS:", latitude, longitude);

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
      console.log("🍛 Nearby cities for Chains:", nearbyCities);

      if (nearbyCities.length > 0) {
        const user = JSON.parse(localStorage.getItem("user")) || {};
        user.city = nearbyCities[0];
        localStorage.setItem("user", JSON.stringify(user));

        this.fetchBiriyaniProducts(nearbyCities, nearbyCities[0]);
      } else {
        this.setState({ loading: false }); 
      }
    } catch (err) {
      console.error("❌ Chains location fetch failed:", err);
        this.setState({ loading: false }); 

    }
  };

  fallbackToIPorLocalStorage = () => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((locationData) => {
        const city = locationData.city?.trim();
        if (city) {
          console.log("🌐 IP-based city for Chains:", city);
          const user = JSON.parse(localStorage.getItem("user")) || {};
          user.city = city;
          localStorage.setItem("user", JSON.stringify(user));

          this.fetchBiriyaniProducts([city], city);
        }
        else{
        this.setState({ loading: false }); 

        }
      })
      .catch(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.city) {
          this.fetchBiriyaniProducts([user.city], user.city);
        }
        else{
        this.setState({ loading: false }); 

        }
      });
  };

  fetchBiriyaniProducts = async (cities, primaryCity) => {
    try {
      const cityQueryParam = cities.map(encodeURIComponent).join(",");
      const res = await fetch(`https://backendta-fr54.onrender.com/api/products?cities=${cityQueryParam}`);
      const allProducts = await res.json();

      // Normalize function to handle diacritics like "chāmavaram" vs "chamavaram"
      const normalize = (str) =>
        str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

      const filtered = allProducts.filter(
        (p) =>
          p.category &&
          normalize(p.category) === "chains"
      );

      this.setState({ topProducts: filtered, userCity: primaryCity, loading: false });
    } catch (err) {
      console.error("❌ Failed to fetch biriyani products:", err);
      this.setState({ loading: false });
    }
  };

  render() {
  const { topProducts, userCity, loading } = this.state;

  return (
    <div className="product-grid">
      {loading ? (
        <div className="loader-container">
  <div className="spinner"></div>
  <p>Loading products near you...</p>
</div>
      ) : topProducts.length > 0 ? (
        topProducts.map((item, index) => (
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
              {item.unit && <p>Quantity: {item.unit}</p>}
              <p className="product-cost">Cost: ₹{item.cost}</p>
              <h5 className="product-stock">📍 {item.stock}</h5>
            </div>
          </Link>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "red" }}>
          🚫 No Chains products found near you{userCity ? ` in ${userCity}` : ""}.
        </p>
      )}
    </div>
  );
}

}

export default Chains;
