import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import "../styles/Landing.css";


export default function Landing() {
  return (
    <div className="landing">
      <h1>BREEDEX, THE DOG WIKI</h1>
      <h2>Search and create your desired dog breeds!</h2>
      <div>
        <Link to="/home" className="btnLan">
          <button><FontAwesomeIcon icon={faPaw} /></button>
        </Link>
      </div>
    </div>
  );
};