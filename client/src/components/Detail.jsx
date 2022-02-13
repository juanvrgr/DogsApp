import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, cleanDetail } from "../actions";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import "../styles/Detail.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const [change, setChange] = useState(false);
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(cleanDetail());
    dispatch(getDetail(id));
    // setChange(true);
  }, [dispatch, id,]);
  // console.log(detail);

  return (
    <div className="detail">
      {
        detail.length > 0 ?
          <div>
            <h1>{detail[0].name}</h1>
            <img className="imagen"src={detail[0].img ? detail[0].img : detail[0].image} />
            <ul>
              <li>
                <h4>Height: {detail[0]?.height + ' cm'}</h4>
              </li>
              <li>
                <h4>Weight: {detail[0]?.weight + ' kg'}</h4>
              </li>
              <li>
                {detail[0].createdInDb ? (<h4>Life Span: {detail[0]?.lifeSpan + ' years'}</h4>) : <h4>Life Span: {detail[0]?.lifeSpan}</h4>}
              </li>
              <li className="h3-2">
                {detail[0].createdInDb ? (
                  <h4>
                    Temperaments: {detail[0].Temperaments.map((d) => d.name).join(", ")}
                  </h4>
                ) : (
                  <h4>
                    Temperaments: {detail[0].temperament.split(', ').map(e => e).join(', ')}
                  </h4>)}
              </li>
            </ul>
            {detail[0].createdInDb ? <Link to="/delete">
          <button className="btnDelete">Delete breed</button>
        </Link> : null}
          </div>
          :
          <Loading />}
      <Link to='/home'>
        <button>Back Home</button>
      </Link>
    </div>
  )
};