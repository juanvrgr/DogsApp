import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const GET_NAME_DOG = "GET_NAME_DOG";
export const POST_DOG = "POST_DOG";
export const GET_DETAIL = "GET_DETAIL";
export const FILTER_CREATED = "FILTER_CREATED";
export const CLEAN_DETAIL = "CLEAN_DETAIL";

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
};

export function getNameDog(name) {
    return async function (dispatch) {
      try {
        var json = await axios.get( // try CONST
          "http://localhost:3001/dogs?name=" + name
        );
        return dispatch({
          type: "GET_NAME_DOG",
          payload: json.data,
        });
    } catch (error) {
      alert("This breed doesn't exist!");
  }
};
};

export function getTemperaments() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/temperaments", {});
      return dispatch({
        type: "GET_TEMPERAMENT",
        payload: json.data,
      });
    } catch (error) {
      console.log(error); // INTENTAR QUITAR EN CASO DE ERROR
    }
  };
};

export function filterByTemperaments (payload) {
    return {
        type: "FILTER_BY_TEMPERAMENTS",
        payload
    };
};

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
};

export function orderByWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
};

export function getDetail(id) {
    return async function (dispatch) {
      try {
        var json = await axios.get("http://localhost:3001/dogs/" + id);
        return dispatch({
          type: "GET_DETAIL",
          payload: json.data,
        });
      } catch (error) {
        alert("The ID doesn't match with any breed");
      }
    };
};

export function postDog(payload) {
  return async function () {
    const json = await axios.post("http://localhost:3001/dog", payload); // try /dogs
    return {
      type: "POST_DOG",
      json,
    };
  };
};

export function filterCreated(payload){
   return{
       type: "FILTER_CREATED",
       payload
   }
};

export function cleanDetail(payload) {
  return {
    type: "CLEAN_DETAIL",
    payload,
  };
}