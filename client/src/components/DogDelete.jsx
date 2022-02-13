import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/DogDelete.css";

export default function DogDelete(){
    const [id, setId] = useState(null)

    const handleChange = (e) => {
        setId(e.target.value)
    }

    const handleDogDelete = (e) => {
        e.preventDefault();
        if(!id) return
        axios.delete(`http://localhost:3001/dogs/delete/${id}`)
        .then((res) => {
            alert(res.data.name ? res.data.name : res.data)
        })
        .catch((e) => {
            alert("Couldn't delete dog!")
        })
    }

    return (
        <div className="delete">
            <Link to="/home">
        <button className="buttonToHome">Go Back</button>
      </Link>
    <form onSubmit={handleDogDelete}>
        <input type="text" value={id} onChange={handleChange} placeholder="Dog ID"></input>
        <input type="submit" value="Delete"></input>
    </form>
    </div>
    )
}