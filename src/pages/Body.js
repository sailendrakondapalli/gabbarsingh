import React from "react";
import { Link } from "react-router-dom";
// import productsData from "../productsData/productsData";

// Images
// import fashion from '../images/fashion.jpeg';
// import grocerie from '../images/grocerie.jpeg';
// import hotel from '../images/onfoodd.png';
// import laptops from '../images/laptops.jpeg';
// import makeup from '../images/makeup.jpeg';
// import mobiles from '../images/mobiles.jpeg';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleProducts: 4,
      userCity: "",
      filteredProducts: [],
      shuffledProducts: []
    };
  }




  
componentDidMount() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("📍 User GPS:", latitude, longitude);

        try {
          // Step 1: Fetch nearby cities from Overpass API
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

          // Step 2: Extract unique nearby city names
          const citySet = new Set();
          data.elements.forEach((el) => {
            if (el.tags && el.tags.name) {
              citySet.add(el.tags.name.trim());
            }
          });
          const nearbyCities = Array.from(citySet);
          console.log("🗺 Nearby Cities (5km):", nearbyCities);

          if (nearbyCities.length > 0) {
            const user = JSON.parse(localStorage.getItem("user")) || {};
            user.city = nearbyCities[0]; // Save primary one if needed
            localStorage.setItem("user", JSON.stringify(user));

            // Step 3: Fetch products from your backend with cities list
            const cityQueryParam = nearbyCities.map(encodeURIComponent).join(",");
            const productsRes = await fetch(
              `https://backendta-fr54.onrender.com/api/products?cities=${cityQueryParam}`
            );
            const products = await productsRes.json();
            const shuffled = this.shuffleArray(products);

            this.setState({
              userCity: nearbyCities[0],
              shuffledProducts: shuffled,
              filteredProducts: shuffled
            });
          } else {
            console.warn("⚠️ No nearby cities found");
            this.setState({ userCity: "Unknown" });
          }
        } catch (err) {
          console.error("❌ Error with Overpass API or product fetch:", err);
        }
      },
      (error) => {
        console.error("❌ Geolocation error:", error.message);
        this.fallbackToIPorLocalStorage();
      }
    );
  } else {
    console.warn("⚠️ Geolocation not supported");
    this.fallbackToIPorLocalStorage();
  }

  window.addEventListener("scroll", this.handleScroll);
}


fallbackToIPorLocalStorage() {
  fetch("https://ipapi.co/json/")
    .then((res) => res.json())
    .then((locationData) => {
      const city = locationData.city?.trim();
      if (city) {
        console.log("🌐 IP-based city:", city);
        const user = JSON.parse(localStorage.getItem("user")) || {};
        user.city = city;
        localStorage.setItem("user", JSON.stringify(user));

        fetch(`https://backendta-fr54.onrender.com/api/products?cities=${encodeURIComponent(city)}`)
          .then((res) => res.json())
          .then((products) => {
            const shuffled = this.shuffleArray(products);
            this.setState({
              userCity: city,
              shuffledProducts: shuffled,
              filteredProducts: shuffled
            });
          });
      }
    })
    .catch(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.city) {
        const city = user.city.trim();
        fetch(`https://backendta-fr54.onrender.com/api/products?cities=${encodeURIComponent(city)}`)
          .then((res) => res.json())
          .then((products) => {
            const shuffled = this.shuffleArray(products);
            this.setState({
              userCity: city,
              shuffledProducts: shuffled,
              filteredProducts: shuffled
            });
          });
      }
    });
}




  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  handleScroll = () => {
    const { visibleProducts, filteredProducts } = this.state;
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.offsetHeight &&
      visibleProducts < filteredProducts.length
    ) {
      this.setState({ visibleProducts: visibleProducts + 4 });
    }
  };

  render() {
    const { visibleProducts, filteredProducts, userCity } = this.state;

    const images = [
  { src: '/images/fashion.jpeg', name: 'Fashion' },
  { src: '/images/grocerie.jpeg', name: 'Groceries' },
  { src: '/images/onfoodd.png', name: 'Food' },
  { src: '/images/laptops.jpeg', name: 'Laptops' },
  { src: '/images/makeup.jpeg', name: 'Makeup' },
  { src: '/images/mobiles.jpeg', name: 'Mobiles' }
];


    const visibleList = filteredProducts.slice(0, visibleProducts);

    return (
      <div>
        <div className="all">
          {images.map((item, index) => (
            <Link
              to={`/category/${item.name.toLowerCase()}`}
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

        <div className="product-grid">
          {visibleList.map((item, index) => (
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
              </div>
            </Link>
          ))}

          {visibleList.length === 0 && (
            <p style={{ color: "red", textAlign: "center" }}>

              No products found for your city ({userCity})
              
            </p>
          )}
        </div>

        {visibleProducts < filteredProducts.length && (
          <p style={{ textAlign: "center", padding: "20px" }}> Scroll to load more...</p>
        )}
      </div>
    );
  }
}

export default Body;
