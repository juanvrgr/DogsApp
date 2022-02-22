import React from "react";
import "../styles/Paginate.css";

export default function Paginate({ dogsPerPage, dogs, paginate, value }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="div-paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <div className="btn-pag" key={number.toString()} >
              <button className={number === value ? "actual" : "btn-pag"} key={number} onClick={() => paginate(number)}>
                {number}
              </button>
            </div>
          ))}
      </div>
    </div>
  )
};
