import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // ✅ New state for booking success

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  const handleCashOnDelivery = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://backendta-fr54.onrender.com/api/book-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item, email: userEmail })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true); // ✅ Show success screen
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
      handler: async function (response) {
        setLoading(true);
        try {
          const res = await fetch("https://backendta-fr54.onrender.com/api/book-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item, email: userEmail })
          });

          const data = await res.json();
          if (res.ok) {
            setSuccess(true); // ✅ Show success screen
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
        email: userEmail
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleBuyNow = () => {
    if (!userEmail) {
      alert("Please login to book");
      return;
    }

    const userChoice = window.prompt("Choose payment method:\n1 for Razorpay\n2 for Cash on Delivery");
    if (userChoice === "1") {
      handleRazorpayPayment();
    } else if (userChoice === "2") {
      handleCashOnDelivery();
    } else {
      alert("Invalid choice.");
    }
  };

  if (!item) return <p>No product data</p>;

  // ✅ Show success screen
  if (success) {
    return (
      <div className="success-screen">
        <h2>🎉 Your order has been booked successfully!</h2>
        <p>We'll send you an email with delivery details.</p>
        <button onClick={() => navigate("/")}>Go back to Home</button>
      </div>
    );
  }

  return (
    <div>
      <h2>{item.name}</h2>
      {/* <img src={`/images/${item.src}`} alt={item.name}  /> */}
<img src={item.src} alt={item.name} style={{ width: "200px" }} />
      <p>{item.store}</p>
      <p>₹{item.cost}</p>
      <p>{item.stock}</p>

      <button onClick={handleBuyNow} disabled={loading}>
        {loading ? "Processing..." : "Buy Now"}
      </button>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-message-box">
            <p>Your order is processing...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
