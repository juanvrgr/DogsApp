import React from "react";
import { Link } from "react-router-dom";
// import "../styles/Landing.css";

export default function Landing() {
    return (
      <div>
        <h1>BREEDEX</h1>
        <h2>Search and create your desired dog breeds!</h2>
        <div>
          <Link to="/home">
            <button>GUAU!</button>
          </Link>
        </div>
      </div>
    );
  };