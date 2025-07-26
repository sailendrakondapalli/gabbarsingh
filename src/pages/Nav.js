import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { isOpen } = this.state;

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
            </div>
          )}

          <div className="search">
            <input type="search" placeholder="Search here..." />
          </div>

          <div className="icons">
            <img src="/images/wish-list.png" alt="WishList" />
            <img src="/images/basket.png" alt="Cart" />
            
           <a href="/login"><img  src="/images/user.png" alt="User" /></a><p> ⬅️login</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
