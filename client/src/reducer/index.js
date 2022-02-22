import {
  GET_DOGS,
  FILTER_BY_TEMPERAMENTS,
  GET_TEMPERAMENT,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  GET_NAME_DOG,
  POST_DOG,
  GET_DETAIL,
  FILTER_CREATED,
  CLEAN_DETAIL,
  LOADING
} from "../actions";

const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  detail: [],
  loading: false
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
        loading: false
      };

    case GET_TEMPERAMENT:
      return {
        ...state,
        temperaments: action.payload,
        loading: false
      };

    case FILTER_BY_TEMPERAMENTS:
      let dogs = state.allDogs;
      const temperamentFilter =
        action.payload === "all" ? dogs :
          dogs.filter((e) => e.temperament?.includes(action.payload))
      const dbFilter =
        dogs.filter(e => {
          if (e.createdInDb === true) {
            return e.Temperaments.map(e => e.name).includes(action.payload)
          }
        })
      const totalFilter = dbFilter.concat(temperamentFilter)
      return {
        ...state,
        dogs: totalFilter,
      };

    case ORDER_BY_NAME:
      let doges = [...state.dogs]
      let sortedDogs =
        action.payload === "A-Z"
          ? doges.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
            return 0;
          })
          : doges.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return -1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return 1;
            }
            return 0;
          });
      return {
        ...state,
        dogs: action.payload === "default" ? state.allDogs : sortedDogs
        //sortedDogs
      };

    case FILTER_CREATED:
      const createdFilter = action.payload === "created" ?
        state.allDogs.filter(el => el.createdInDb) :
        state.allDogs
      return {
        ...state,
        dogs: action.payload === "api" ? state.allDogs.filter(el => !el.createdInDb) : createdFilter
      };

    case ORDER_BY_WEIGHT:
      let auxDogs = [...state.dogs]
      if (action.payload === "desc") {
        auxDogs.sort((a, b) => {
          return parseInt(a.weight) - parseInt(b.weight);
        });
      }
      if (action.payload === "asc") {
        auxDogs.sort((a, b) => {
          return parseInt(b.weight) - parseInt(a.weight);
        });
      }
      return {
        ...state,
        dogs: action.payload === "all" ? state.allDogs : auxDogs
      }

    case GET_NAME_DOG:
      return {
        ...state,
        dogs: action.payload,
        loading: false
      };

    case POST_DOG:
      return {
        ...state,
        loading: false
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
        loading: false
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        detail: [],
        loading: false
      }

    case LOADING:
      return {
        ...state,
        loading: true
      }

    default:
      return state;
  }
};

export default rootReducer;