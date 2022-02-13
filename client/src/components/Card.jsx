import React from "react";
import "../styles/Card.css";

export default function Card({ name, image, temperaments, weight }) {
  return (
    <div className="cardComp">
      <h3>{name}</h3>
      <img
        src={image}
        alt={""}
        width="150px"
        height="150px"
      />
      <h5 className="temperament">Temperaments:</h5>
      <h5 className="dogs">
        {temperaments}
      </h5>
      <h5>Weight:</h5>
      <h5 className="weight">
        {weight} kg
      </h5>
    </div>
  );
}