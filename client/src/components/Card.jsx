import React from "react";
// import "../styles/Card.css";

export default function Card({ name, image, temperaments, weight }) {
  return (
    <div>
      <h3>{name}</h3>
      <img
        src={image}
        alt="Img recipe not found"
        width="150px"
        height="150px"
      />
      <h5>Temperaments:</h5>
      <h5>
        {temperaments}
      </h5>
      <h5>Weight:</h5>
      <h5>
        {weight}kg
      </h5>
    </div>
  );
}