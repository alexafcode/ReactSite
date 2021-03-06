const defaultState = {
  city: [],
  loading: true,
  showSearchLoad: false,
  showSearchResult: false,
  searchCities: [],
  showForecast: false,
  forecastWeather: [],
  error: false,
  errorMessage: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        // city: [action.payload, ...state.city]
        city: [...state.city, action.payload],
        loading: false
      };
    case "CITY_IS_LOADING":
      return {
        ...state,
        loading: action.payload
      };
    case "ERROR_FETCH_DATA":
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case "ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.payload
      };
    case "SEARCH_CLICK":
      return {
        ...state,
        showSearchLoad: action.payload
      };
    case "FETCH_SEARCH_CITY":
      return {
        ...state,
        showSearchLoad: true
      };
    case "FETCH_SEARCH_CITY_SUCCESS":
      return {
        ...state,
        showSearchLoad: false,
        searchCities: action.payload,
        showSearchResult: true
      };
    case "SEARCH_CITY":
      return {
        ...state,
        searchCities: action.payload
      };
    case "SHOW_SEARCH_RESULT":
      return {
        ...state,
        showSearchResult: action.payload
      };
    case "FORECAST_WEATHER":
      return {
        ...state,
        forecastWeather: [...action.payload, ...state.forecastWeather]
      };
    default:
      return state;
  }
};
