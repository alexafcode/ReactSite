import { FETCH_DATA } from "./actions";

const defaultState = {
  city: [],
  loading: true,
  showSearchLoad: false,
  showSearchResult: false,
  searchCities: []
};

export default (state = defaultState, action) => {
  console.log("switch", action);
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        city: [action.payload, ...state.city]
        // city: state.city.push(action.payload)
        // city: [action.payload, ...state.city]
        // city: state.city.concat(action.payload)
      };
    case "CITY_IS_LOADING":
      return {
        ...state,
        loading: action.payload
      };
    case "SEARCH_CLICK":
      return {
        ...state,
        showSearchLoad: action.payload
      };
    case "SEARCH_CITY":
      return {
        ...state,
        searchCities: action.payload   //showSearchResult
      };
    case "SHOW_SEARCH_RESULT":
      return {
        ...state,
        showSearchResult: action.payload
      }
    default:
      return state;
  }
};
