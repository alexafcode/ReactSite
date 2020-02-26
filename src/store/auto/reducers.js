const initialState = {
  cars: [],
  loading: true,
  error: false,
  errorMessage: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LOAD_REQUEST":
      return {
        ...state,
        loading: true,
        error: false
      };
    case "FETCH_LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        cars: action.payload
      };
    case "FETCH_LOAD_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
