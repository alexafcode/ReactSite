const initialState = {
  cars: [],
  loading: true,
  error: false,
  errorMessage: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_AUTO_DB":
      return {
        ...state,
        cars: action.payload
      };
    case "CARS_IS_LOADING":
      return {
        ...state,
        loading: action.payload
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload
      };
    case "ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
