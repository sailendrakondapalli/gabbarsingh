import React from "react";
import { Navigate } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")) || null
    };
  }

  render() {
    const { user } = this.state;

    // Redirect to login if not logged in
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div style={styles.container}>
        <h2>My Profile</h2>
        <div style={styles.card}>
          <img
            src="/images/user.png"
            alt="User Avatar"
            style={styles.avatar}
          />
          <div>
            <p><strong>Name:</strong> {user.name || "N/A"}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>City:</strong> {user.city || "Not Set"}</p>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9"
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "20px"
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%"
  }
};

export default Profile;
