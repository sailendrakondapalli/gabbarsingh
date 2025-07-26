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
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && (user.city || user.address)) {
    const city = (user.city || user.address).trim();

    fetch(`https://backendta-fr54.onrender.com/api/products?city=${city}`)
      .then((res) => res.json())
      .then((data) => {
        const shuffled = this.shuffleArray(data);
        this.setState({
          userCity: city,
          shuffledProducts: shuffled,
          filteredProducts: shuffled
        }); 
      })
      .catch((error) => {
        console.error("❌ Error fetching products from API:", error);
      });
  } else {
    console.warn("⚠️ No city found in user data");
  }

  window.addEventListener("scroll", this.handleScroll);
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
