const defaultState = {
  news: [],
  loading: true,
  error: false,
  errorMessage: null
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        news: [action.payload]
      };
    case "NEWS_LOADING":
      return {
        ...state,
        loading: action.payload
      };
    case "ERROR_FETCH_DATA":
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
