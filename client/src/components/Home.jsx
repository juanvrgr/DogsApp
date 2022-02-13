import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  filterByTemperaments,
  orderByName,
  orderByWeight,
  filterCreated,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import "../styles/Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);

  //Paginate:
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage; // = 9
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 
  const currentDogs = dogs.slice( // Dividimos el array que contiene el state
    indexOfFirstDog,
    indexOfLastDog
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [orderName, setOrderName] = useState("");
  const [orderLike, setOrderLike] = useState("");

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  };

  function handleSelect(e) {
    e.preventDefault();
    dispatch(filterByTemperaments(e.target.value));
  };

  function handleSelectByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrderName("Order" + e.target.value);
  };

  function handleSelectByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrderLike("Order" + e.target.value);
  };

  function handleFilterCreated(e) {
    // e.preventDefault();
    dispatch(filterCreated(e.target.value))
  };


  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);


  return (
    <div className="home">
      <div>
        <Loading />
        <h1>Breedex</h1>
        <SearchBar setCurrentPage={(setCurrentPage)} />
        <Link to="/dog">
          <button className="buttonCreate">Create new breed</button>
        </Link>
        <div className="showAll">
          <button
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Reload breeds
          </button>
        </div>
        <div className="select">
          <span className="span">Order by Breed Name</span>
          <select onChange={(n) => handleSelectByName(n)} className="filter">
            <option value="default" className="filter">Default</option>
            <option value="A-Z" className="filter">A-Z</option>
            <option value="Z-A" className="filter">Z-A</option>
          </select>
          <span className="span">Order by Weight</span>
          <select onChange={(s) => handleSelectByWeight(s)} className="filter">
            <option value="all" className="filter">All</option>
            <option value="asc" className="filter">Highest Weight</option>
            <option value="desc" className="filter">Lowest Weight</option>
          </select>
          <span className="span">Filter by Temperaments</span>
          <select onChange={(e) => handleSelect(e)} className="filter">
            <option value="all" className="filter">All</option>
            {temperaments.map((d) => (
              <option value={d.name} key={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <select onChange={e => handleFilterCreated(e)} className="filter">
            <option value="all" className="filter">All</option>
            <option value="created" className="filter">Created</option>
            <option value="api" className="filter">API</option>
          </select>
        </div>
        <div className="paginate">
          <Paginate
            dogsPerPage={dogsPerPage}
            dogs={dogs.length}
            paginate={paginate}
          />
        </div>
        <div className="cards">
          {currentDogs?.map((e) => (
            <div key={e.id}>
              <Link to={"/home/" + e.id}>
                <Card
                  key={e.id}
                  name={e.name}
                  image={e.image}
                  weight={e.weight}
                  height={e.height}
                  temperaments={e.createdInDb
                    ? e.Temperaments.map((d) => (
                      <p key={d.name} className="dogsMap">
                        {d.name}
                      </p>
                    ))
                    : <p>{e.temperament}</p>}
                // lifeSpan={e.lifeSpan}
                />
              </Link>
            </div>
          ))}
        </div>
        <div className="paginate">
          <Paginate
            dogsPerPage={dogsPerPage}
            dogs={dogs.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};