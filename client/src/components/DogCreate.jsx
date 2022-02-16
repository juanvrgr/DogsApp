import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postDog, getTemperaments } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "../styles/DogCreate.css";

function validate(input) {
  let errors = { hasErrors: false };


  if (!input.name) {
    errors.name = "Breed name required";
    errors.hasErrors = true;
  } else if (!/^[a-zA-Z]+$/.test(input.name)) { //&& /^[\s/) ]*$/.test(input.name)){
    errors.name = "Breed name can only contain letters";
    errors.hasErrors = true;
  }

  if (!input.weight) {
    errors.weight = "Breed weight required";
    errors.hasErrors = true;
  } else if (!/^[0-9]*$/.test(input.weight) && /^[\-/) ]*$/.test(input.weight)) {
    errors.weight = "Weight must be a number";
    errors.hasErrors = true;
  } else if (/^[a-zA-Z!@#/\$%\^\&*\)\(+=.,_-\s]+$/g.test(input.weight)) {
    errors.weight = "Weight must be a number";
    errors.hasErrors = true;
  }

  if (!input.height) {
    errors.height = "Breed height required";
    errors.hasErrors = true;
  } else if (!/^[0-9]*$/.test(input.height) && /^[\-/) ]*$/.test(input.height)) {
    errors.height = "Height must be a number";
    errors.hasErrors = true;
  } else if (/^[a-zA-Z!@#/\$%\^\&*\)\(+=.,_-\s]+$/g.test(input.height)) {
    errors.height = "Weight must be a number";
    errors.hasErrors = true;
  }

  if (!input.lifeSpan) {
    errors.lifeSpan = "Breed life span required";
    errors.hasErrors = true;
  } else if (!/^[0-9]*$/.test(input.lifeSpan) && /^[\-/) ]*$/.test(input.lifeSpan)) {
    errors.lifeSpan = "Life span must be a number";
    errors.hasErrors = true;
  } else if (/^[a-zA-Z!@#/\$%\^\&*\)\(+=.,_-\s]+$/g.test(input.lifeSpan)) {
    errors.lifeSpan = "Life span must be a number";
    errors.hasErrors = true;
  }

  if (input.temperaments.length < 1) {
    errors.temperaments = "Choose at least one temperament";
    errors.hasErrors = true;
  }

  if (!input.image.includes("https://www") && !input.image.includes("http://www")) {
    errors.image = "This isn't a valid image address";
    errors.hasErrors = true;
  }

  return errors;
}


export default function DogCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    weight: "",
    height: "",
    lifeSpan: "",
    image: "",
    temperaments: [],
  });

  function handleChange(e) {
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function handleSelect(e) {
    if (input.temperaments.indexOf(e.target.value) === -1) { // FIXED
      setInput((input) => ({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      }));
      setErrors(
        validate({
          ...input,
          temperaments: [...input.temperaments, e.target.value],
        })
      );
    }
  };

  function handleSubmit(e) {
    if (input.name && input.weight && input.height && input.image && input.temperaments.length > 0) {
      e.preventDefault();
      dispatch(postDog(input));
      alert("Breed created successfully!");
      setInput({
        name: "",
        weight: "",
        height: "",
        lifeSpan: "",
        image: "",
        temperaments: [],
      });
      navigate("/home");
    } else {
      e.preventDefault();
      alert("You must complete every field to continue!");
    }
  };

  function handleDelete(e, d) {
    e.preventDefault();
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== d),
    });
  };

  return (
    <div className="create">
      <h1>Create your own dog breed!</h1>
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Breed Name</label>
            <input
              className="inputCreate"
              placeholder="Complete here..."
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <label>Weight:</label>
            <input
              className="inputCreate"
              placeholder="Min - Max"
              type="text"
              value={input.weight}
              name="weight"
              onChange={(e) => handleChange(e)}
            />
            {errors.weight && <p className="error">{errors.weight}</p>}
          </div>
          <div>
            <label>Height:</label>
            <input
              className="inputCreate"
              placeholder="Min - Max"
              type="text"
              value={input.height}
              name="height"
              onChange={(e) => handleChange(e)}
            />
            {errors.height && <p className="error">{errors.height}</p>}
          </div>
          <div>
            <label>Life Span:</label>
            <input
              className="inputCreate"
              placeholder="Complete here..."
              type="text"
              value={input.lifeSpan}
              name="lifeSpan"
              onChange={(e) => handleChange(e)}
            />
            {errors.lifeSpan && <p className="error">{errors.lifeSpan}</p>}
          </div>
          <div>
            <label>Image:</label>
            <input
              className="inputCreate"
              type="text"
              placeholder="https://..."
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
            {errors.image && <p className="error">{errors.image}</p>}
          </div>
          <div className="dogsCreate">
            <span >Temperaments:</span>
            <select onChange={(e) => handleSelect(e)}>
              {temperaments.map((d) => (
                <option value={d.name} key={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            {input.temperaments.map((d, i) => (
              <ul key={i}>
                <li>{d}</li>
                <button onClick={(e) => handleDelete(e, d)}>X</button>
              </ul>
            ))}
            {errors.temperaments && <p className="error">{errors.temperaments}</p>}
          </div>
          {errors.hasErrors === true || !input.name && !input.weight && !input.height && !input.image && input.temperaments.length < 1 ? <button disabled="true" type="submit" className="btnCreate">
            Create Breed
          </button> : <button type="submit" className="btnCreate">
            Create Breed
          </button>}
        </form>
        <Link to="/home">
          <button className="buttonToHome">Go Back</button>
        </Link>
      </div>
    </div>
  )
};