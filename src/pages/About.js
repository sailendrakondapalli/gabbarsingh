import React from "react";

class About extends React.Component {
  render() {
    const styles = {
      container: {
        padding: "30px 20px",
        fontFamily: "Segoe UI, sans-serif",
        background: "linear-gradient(to right, #f8f9fa, #e3f2fd)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#333",
      },
      heading: {
        color: "#0d6efd",
        fontSize: "2.5rem",
        marginBottom: "20px",
        textAlign: "center",
      },
      paragraph: {
        maxWidth: "800px",
        fontSize: "1.1rem",
        marginBottom: "15px",
        textAlign: "center",
        lineHeight: "1.6",
      },
      list: {
        listStyleType: "square",
        paddingLeft: "20px",
        textAlign: "left",
        maxWidth: "600px",
        margin: "0 auto 20px",
        color: "#1d3557",
        fontSize: "1rem",
      },
      highlight: {
        fontWeight: "bold",
        color: "#e63946",
      },
     
    };

    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Welcome to TowneyArsenal</h1>
        <p style={styles.paragraph}>
          <span style={styles.highlight}>TowneyArsenal</span> is your local online marketplace
          where you can find everything — from <strong>fashion</strong>, <strong>groceries</strong>,
          and <strong>fresh food</strong> to <strong>mobiles</strong>, <strong>laptops</strong>, and
          much more!
        </p>
        <p style={styles.paragraph}>
          We partner only with local stores to deliver your orders faster and fresher while helping
          nearby businesses thrive.
        </p>
        <ul style={styles.list}>
          <li>⚡ Super-fast local delivery</li>
          <li>🛍️ Huge variety of products</li>
          <li>🏪 Directly from trusted local shops</li>
          <li>🌱 Support small businesses in your area</li>
        </ul>
        <p style={styles.paragraph}>
          <span style={styles.highlight}>Shop Local. Get it Fast. Only with TowneyArsenal.</span>
        </p>
        <hr ></hr>
        <p>Developed By Sailendra Kondapalli</p>
      </div>
    );
  }
}

export default About;
