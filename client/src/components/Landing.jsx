import React from "react";
import { Link } from "react-router-dom";
// import "../styles/Landing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

export default function Landing() {
    return (
      <div>
        <h1>BREEDEX, THE DOG WIKI</h1>
        <h2>Search and create your desired dog breeds!</h2>
        <div>
          <Link to="/home">
            <button><FontAwesomeIcon icon={faPaw}/></button>
          </Link>
        </div>
      </div>
    );
};