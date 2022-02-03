import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDog } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
// import "../styles/SearchBar.css";

export default function SearchBar({setCurrentPage}) {
const dispatch = useDispatch();
const [name, setName] = useState("");

function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
};

// function handleSubmit(e) {
//     e.preventDefault();
//     dispatch(getNameRecipe(name));
//     setName("");
// };

function handleKeyPress (e) {
    if(e.key === "Enter"){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(getNameDog(name));
        setName("");
    }
};

const handleClearInput = (e) => {
    e.preventDefault();
    setName("");
  };

  
return (
    <div>
        <input
        type="text"
        value={name}
        placeholder="Search breed..."
        onChange={(e) => handleInputChange(e)}
        onKeyPress={handleKeyPress}
        />
        {name.length === 0 ? (<button><FontAwesomeIcon icon={faSearch}/>
        </button>) : (<button type="button" onClick={(e) => handleClearInput(e)}>
            <FontAwesomeIcon icon={faTimes}/>
        </button>)}
    </div>
)
};