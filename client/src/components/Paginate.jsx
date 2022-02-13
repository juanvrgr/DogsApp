import React from "react";
import "../styles/Paginate.css";

export default function Paginate({ dogsPerPage, dogs, paginate, value }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (dogs > 8) {
  } else if (dogs <= 8) {
    return <div></div>
  }

  return (
    //     <nav>
    //         {pageNumbers &&
    //         pageNumbers.map((number) => (
    //           <button key={number} onClick={() => paginate(number)}>
    //             {number}
    //           </button>
    //           ))}
    //     </nav>
    // )
    //         } else if (dogs <= 8){
    //           return <div></div>
    //         }

    // };
    <div>
      <div className="div-paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <div className="btn-pag" key={number.toString()} >
              <button className={number === value ? 'actual' : 'boton-paginado'} key={number} onClick={() => paginate(number)}>
                {number}
              </button>
            </div>
          ))}
      </div>
    </div>
  )
};
