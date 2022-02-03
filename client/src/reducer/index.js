import {
    GET_DOGS,
    FILTER_BY_TEMPERAMENTS,
    GET_TEMPERAMENT,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    GET_NAME_DOG,
    POST_DOG,
    GET_DETAIL,
    FILTER_CREATED
  } from "../actions";

  const initialState = {
      dogs: [],
      allDogs: [],
      temperaments: [],
      detail: [],
  };
  
  function rootReducer(state = initialState, action){
      switch (action.type) {
        case GET_DOGS:
          return {
          ...state,
          dogs: action.payload,
          allDogs: action.payload,
        };

        case GET_TEMPERAMENT:
        return {
          ...state,
          temperaments: action.payload,
        };

        case FILTER_BY_TEMPERAMENTS:
        let dogs = state.allDogs;
        const temperamentFilter =
            action.payload === 'All' ? dogs :
            dogs.filter((e)=> e.temperament?.includes(action.payload)) // ojo con el ?
            return {
                ...state,
                dogs: temperamentFilter,
        };
  
        case ORDER_BY_NAME:
        let sortedDogs =
          action.payload === "A-Z"
            ? state.dogs.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return 1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                  return -1;
                }
                return 0;
              })
            : state.dogs.sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                  return 1;
                }
                if (b.name.toLowerCase() < a.name.toLowerCase()) {
                  return -1;
                }
                return 0;
              });
        return {
          ...state,
          dogs: action.payload === "default" ? state.dogs : sortedDogs,
        };
  
        case FILTER_CREATED:
              const AllDogs = state.allDogs
              const createdFilter = action.payload === 'created' ? 
              AllDogs.filter(el => el.createdInDb === true) :
              AllDogs.filter(el => !el.createdInDb)
              return{
                  ...state,
                  dogs:  action.payload === 'All' ? AllDogs : createdFilter
              }
        
        case ORDER_BY_WEIGHT:
                let dogui = state.allDogs
                let sortedArray = action.payload === 'desc' ?
                    dogui.sort(function(a, b) {
                    if(Number(b.weight.split("-")[0]) > Number(a.weight.split("-")[0])) {
                        return -1;
                    }
                    if(Number(b.weight.split("-")[0]) > Number(a.weight.split("-")[0])){
                        return 1
                    }
                    return 0
                }) :
                    dogui.sort(function(a, b) {
                    if( Number(a.weight.split("-")[0]) > Number(b.weight.split("-")[0])) {
                        return -1
                    }
                    if(Number(a.weight.split("-")[0]) > Number(b.weight.split("-")[0])){
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                dogs: sortedArray
            }
  
        case GET_NAME_DOG:
            return{
                ...state,
                dogs: action.payload
        };
  
        case POST_DOG:
            return {
            ...state,
        };
        
        case GET_DETAIL:
            return {
            ...state,
            detail: action.payload,
        };
        default:
          return state;
    }
  };
  
  export default rootReducer;