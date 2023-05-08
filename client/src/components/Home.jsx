import React from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  return (
    <div className="homeContainer">
      <nav>
        <ul className="navItems">
          <li>Home</li>
          <li>Services</li>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
      </nav>
      <div className="home">
        <p>Hello {location.state.id}</p>
        <Link to="/">
          <button className="login">LogOut</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
