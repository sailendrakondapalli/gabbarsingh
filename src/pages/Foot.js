// src/components/Foot.js
import React, { Component } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

class Foot extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h2 className="footer-logo">TownyArsenal</h2>
            <p className="footer-tagline">Your one-stop shop for everything!</p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/category/fashion">Products</a></li>
              <li><a href="/help">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <p className="footer-contact"><FaPhone /> +91 8143724405</p>
            <p className="footer-contact"><FaEnvelope /> support@townyarsenal.com</p>
            <div className="footer-socials">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="https://www.instagram.com/townyarsenal?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="__blank"><FaInstagram /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TownyArsenal. All rights reserved.</p>
        </div>
      </footer>
    );
  }
}

export default Foot;
