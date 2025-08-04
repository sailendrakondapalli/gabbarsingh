import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [products, setProducts] = useState([]);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [userCity, setUserCity] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  // Check login
  useEffect(() => {
  if (!item) {
    navigate("/"); // Redirect if no item found
  }
}, []);


  // Get city from GPS → IP → localStorage
  useEffect(() => {
    const getCity = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const overpassQuery = `
            [out:json];
          node(around:5000,${latitude},${longitude})["place"="town"];

            out body;
          `;
          const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
          try {
            const res = await fetch(url);
            const data = await res.json();
            const city = data?.elements?.[0]?.tags?.name;
            if (city) {
              setUserCity(city);
              user.city = city;
              localStorage.setItem("user", JSON.stringify(user));
              fetchProducts(city);
              return;
            }
          } catch {
            fallbackToIP();
          }
        }, fallbackToIP);
      } else {
        fallbackToIP();
      }
    };

    const fallbackToIP = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const city = data?.city;
        if (city) {
          setUserCity(city);
          user.city = city;
          localStorage.setItem("user", JSON.stringify(user));
          fetchProducts(city);
        }
      } catch {
        const fallbackCity = user?.city;
        if (fallbackCity) {
          setUserCity(fallbackCity);
          fetchProducts(fallbackCity);
        }
      }
    };

    const fetchProducts = async (city) => {
      try {
        const res = await fetch(`https://backendta-fr54.onrender.com/api/products?cities=${encodeURIComponent(city)}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    getCity();
  }, []);

  // Handle Payments
  const handleCashOnDelivery = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://backendta-fr54.onrender.com/api/book-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item, email: userEmail }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayPayment = () => {
    const options = {
      key: "rzp_test_kjGP4sXmdn48WN",
      amount: item.cost * 100,
      currency: "INR",
      name: "TownyArsenal",
      description: `Purchase ${item.name}`,
      handler: async function () {
        setLoading(true);
        try {
          const res = await fetch("https://backendta-fr54.onrender.com/api/book-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item, email: userEmail }),
          });

          const data = await res.json();
          if (res.ok) {
            setSuccess(true);
          } else {
            alert(data.message);
          }
        } catch (error) {
          alert("Something went wrong after payment.");
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        email: userEmail,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleBuyNow = () => setShowPaymentOptions(true);

  if (!item) return <p>No product data</p>;

  if (success) {
    return (
      <div className="success-screen">
        <h2>🎉 Your order has been booked successfully!</h2>
        <p>We'll send you an email with delivery details.</p>
        <button onClick={() => navigate("/")}>Go back to Home</button>
      </div>
    );
  }

  // Related + Suggested Products (Filtered by City)
  const relatedProducts = products.filter(
    (p) =>
      (p.category === item.category || p.store === item.store) &&
      p._id !== item._id
  );

  const moreProducts = products
    .filter((p) => p._id !== item._id && p.category !== item.category)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div>
      <h2>{item.name}</h2>
      <img src={item.src} alt={item.name} style={{ width: "200px" }} />
      <p><strong>Store:</strong> {item.store}</p>
      <p><strong>Price:</strong> ₹{item.cost}</p>
      <p><strong>Stock:</strong> {item.stock}</p>

      {user ? (
  !showPaymentOptions && (
    <button onClick={handleBuyNow} disabled={loading}>
      {loading ? "Processing..." : "Buy Now"}
    </button>
  )
) : (
  <p style={{ color: "red", marginTop: "10px" }}>Please login to book this product.</p>
)}


      {showPaymentOptions && user && (
  <div style={{ marginTop: "10px" }}>
    <h4>Select Payment Method:</h4>
    <button onClick={handleRazorpayPayment} disabled={loading}>
      Pay with Razorpay
    </button>
    <button onClick={handleCashOnDelivery} disabled={loading}>
      Cash on Delivery
    </button>
  </div>
)}


      {loading && (
        <div className="loading-overlay">
          <div className="loading-message-box">
            <p>Your order is processing...</p>
          </div>
        </div>
      )}

      <hr />
      {/* <h3>Related Products in {userCity}</h3> */}
      {/* <div style={{ display: "flex", flexWrap: "wrap" }}>
        {relatedProducts.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
              width: "150px",
              cursor: "pointer"
            }}
            onClick={() => navigate("/product-detail", { state: p })}
          >
            <img src={p.src} alt={p.name} style={{ width: "100%" }} />
            <p>{p.name}</p>
            <p>₹{p.cost}</p>
          </div>
        ))}
      </div> */}

      <h3>Recommended for You</h3>
<div style={{ display: "flex", flexWrap: "wrap" }}>
  {moreProducts.map((p) => (
    <div
      key={p._id}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        width: "150px",
        cursor: "pointer"
      }}
      onClick={() => navigate(`/product/${p.name}`, { state: p })}
    >
      <img src={p.src} alt={p.name} style={{ width: "100%" }} />
      <p>{p.name}</p>
      <p>₹{p.cost}</p>
    </div>
  ))}
</div>

    </div>
  );
}

export default ProductDetail;
