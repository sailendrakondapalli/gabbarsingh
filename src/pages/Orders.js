import React from "react";
import { Link } from "react-router-dom";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loading: true,
      error: null
    };
  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user?.email;

    if (!userEmail) {
      this.setState({ error: "Please login to view your orders", loading: false });
      return;
    }

    try {
      const res = await fetch(`https://backendta-fr54.onrender.com/api/orders?email=${userEmail}`);
      const data = await res.json();

      if (res.ok) {
        this.setState({ orders: data.orders, loading: false });
      } else {
        this.setState({ error: data.message, loading: false });
      }
    } catch (err) {
      this.setState({ error: "Failed to fetch orders", loading: false });
    }
  }

  render() {
    const { orders, loading, error } = this.state;

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (orders.length === 0) return <p>You have no orders.</p>;

    return (
      <div>
        <h2>Your Orders</h2>
        <ul>
          {orders.map((order, index) => (
            <Link
  to={`/product/${order.item.name}`}
  state={order.item}
  key={index}
  style={{ textDecoration: "none", color: "inherit" }}
>
  <li style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px" }}>
    <img src={order.item.src} alt={order.item.name} style={{ width: "100px" }} />
    <p><strong>{order.item.name}</strong></p>
    <p>Store: {order.item.store}</p>
    <p>Price: ₹{order.item.cost}</p>
    <p>City: {order.item.stock}</p>
  </li>
</Link>

            
          ))}
         
        </ul>
      </div>
    );
  }
}

export default Orders;
