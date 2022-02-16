import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, cleanDetail } from "../actions";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import "../styles/Detail.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(cleanDetail());
    dispatch(getDetail(id));
  }, [dispatch, id,]);
  // console.log(detail);

  return (
    <div className="detail">
      {
        detail.length > 0 ?
          <div>
            <h1>{detail[0].name}</h1>
            <img className="imagen"src={detail[0].img ? detail[0].img : detail[0].image} alt="" />
                <h2>Height: {detail[0]?.height + ' cm'}</h2>
                <h2>Weight: {detail[0]?.weight + ' kg'}</h2>
                {detail[0].createdInDb ? (<h2>Life Span: {detail[0]?.lifeSpan + ' years'}</h2>) : <h2>Life Span: {detail[0]?.lifeSpan}</h2>}
              <h2 className="h3-2">
                {detail[0].createdInDb ? (
                  <h2>
                    Temperaments: {detail[0].Temperaments.map((d) => d.name).join(", ")}
                  </h2>
                ) : (
                  <h2>
                    Temperaments: {detail[0].temperament.split(', ').map(e => e).join(', ')}
                  </h2>)}
              </h2>
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