import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postDog, getTemperaments } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "../styles/DogCreate.css";

function validate(input) {
  let errors = { hasErrors: false };
  let arr = [];

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
  } else if (input.weight) {
    arr = input.weight.split(" ")
    if (arr.length !== 3 || arr[1] !== '-') {
      errors.weight = 'Enter min and max weight in this format " - "'
      errors.hasErrors = true;
    } else if (Number(arr[0]) > Number(arr[2])) {
      errors.weight = "Invalid weight format"
      errors.hasErrors = true;
    }
    else if (!/^[0-9\-/ ]+$/.test(input.weight)) { //&& /^[\s/) ]*$/.test(input.name)){
      errors.weight = "Weight can only contain numbers!";
      errors.hasErrors = true;
    }
  }

  if (!input.height) {
    errors.height = "Breed height required";
    errors.hasErrors = true;
  } else if (input.height) {
    arr = input.height.split(" ")
    if (arr.length !== 3 || arr[1] !== '-') {
      errors.height = 'Enter min and max height in this format " - "'
      errors.hasErrors = true;
    } else if (Number(arr[0]) > Number(arr[2])) {
      errors.height = "Invalid height format"
      errors.hasErrors = true;
    } else if (!/^[0-9\-/ ]+$/.test(input.height)) {
      errors.height = "Height can only contain numbers!";
      errors.hasErrors = true;
    }
  }

  if (!input.lifeSpan) {
    errors.lifeSpan = "Breed life span required";
    errors.hasErrors = true;
  } else if (input.lifeSpan) {
    arr = input.lifeSpan.split(" ")
    if (arr.length !== 3 || arr[1] !== '-') {
      errors.lifeSpan = 'Enter min and max age in this format " - "'
      errors.hasErrors = true;
    } else if (Number(arr[0]) > Number(arr[2])) {
      errors.lifeSpan = "Invalid life span format"
      errors.hasErrors = true;
    } else if (!/^[0-9\-/ ]+$/.test(input.lifeSpan)) {
      errors.lifeSpan = "Life span can only contain numbers!";
      errors.hasErrors = true;
    }
  }

  if (input.temperaments.length === 0) {
    errors.temperaments = "Choose at least one temperament";
    errors.hasErrors = true;
  }

  if (!input.image.includes("https://") && !input.image.includes("http://")) {
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
      setInput((input) => ({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      }));
      setErrors(
        validate({
          ...input,
          temperaments: [...input.temperaments, e.target.value]
        })
      );
  };

  function handleSubmit(e) {
    if (errors.hasErrors === false) {
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
      alert("Please complete all the fields with no errors!");
    }
  };

  function handleDelete(e, d) {
    e.preventDefault();
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== d),
    });
    setErrors(
      validate({
        ...input,
        temperaments: input.temperaments.filter((temp) => temp !== d),
      })
    );
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
              placeholder="Min - Max"
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
          {errors.hasErrors === false || (input.name && input.weight && input.height && input.lifeSpan && input.image && input.temperaments.length > 0) ? <button disabled={false} type="submit" className="btnCreate">
            Create Breed
          </button> : <button disabled={true} type="submit" className="btnCreate">
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