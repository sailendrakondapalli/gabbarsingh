import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      user: JSON.parse(localStorage.getItem("user")) || null
    };
    this.userCheckInterval = null;
  }

  componentDidMount() {
    // Listen for manual updates
    window.addEventListener("storage", this.syncUser);
    window.addEventListener("userChanged", this.syncUser);

    // Fallback: check every 2s if user changed
    this.userCheckInterval = setInterval(() => {
      const latestUser = JSON.parse(localStorage.getItem("user")) || null;
      if (
        JSON.stringify(latestUser) !== JSON.stringify(this.state.user)
      ) {
        this.setState({ user: latestUser });
      }
    }, 2000);
  }

  componentWillUnmount() {
    window.removeEventListener("storage", this.syncUser);
    window.removeEventListener("userChanged", this.syncUser);
    clearInterval(this.userCheckInterval);
  }

  syncUser = () => {
    const updatedUser = JSON.parse(localStorage.getItem("user")) || null;
    this.setState({ user: updatedUser });
  };

  toggle = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  };

  handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    this.setState({ user: null });
  };

  render() {
    const { isOpen, user } = this.state;
    const isLoggedIn = !!user;

    return (
      <div>
        <div className="navbar">
          <div className="logo" onClick={this.toggle}>
            <h2 className="hamburger">☰</h2>
          </div>

          {isOpen && (
            <div className="sidebar">
              <p onClick={this.toggle}>
                <img className="shape" src="/images/shape.png" alt="Close Tab" />
              </p>
              <Link to="/" onClick={this.toggle}><p>Home</p></Link>
              <Link to="/orders" onClick={this.toggle}><p>Orders</p></Link>
              <Link to="/help" onClick={this.toggle}><p>Help</p></Link>

              {isLoggedIn ? (
                <p onClick={this.handleLogout} style={{ cursor: "pointer", color: "red" }}>Logout</p>
              ) : (
                <Link to="/login" onClick={this.toggle}><p>Login</p></Link>
              )}
            </div>
          )}

          <div className="search">
            <input type="search" placeholder="Search here..." />
          </div>

          <div className="icons">
            <img src="/images/wish-list.png" alt="WishList" />
            <img src="/images/basket.png" alt="Cart" />
            <div
  className="user-profile"
  style={{
    marginTop:25,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center"
  }}
>
  <Link to={isLoggedIn ? "/profile" : "/login"}>
    <img src="/images/user.png" alt="User" style={{ width: "30px", height: "30px" }} />
  </Link>

  <span
    style={{
      fontSize: "12px",
      color: "#333",
      maxWidth: "80px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      marginTop: "4px"
    }}
    title={isLoggedIn ? user.name || user.email : "Guest"}
  >
    {isLoggedIn ? user.name || user.email : "Guest"}
  </span>
</div>

          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
