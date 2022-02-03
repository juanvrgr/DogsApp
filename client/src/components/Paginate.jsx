import React from "react";

export default function Paginate({ dogsPerPage, dogs, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(dogs / dogsPerPage); i++) {
        pageNumbers.push(i);
      }

      if(dogs > 9){
return (
    <nav>
        {pageNumbers &&
        pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
          ))}
    </nav>
)
        } else if (dogs <= 9){
          return <div></div>
        }
};