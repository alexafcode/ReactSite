const defaultState = {
  news: [],
  loading: true,
  error: false,
  errorMessage: null,
  index: 0
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case "FETCH_DATA_NEWS":
      return {
        ...state,
        news: [...action.payload]
      };
    case "NEWS_LOADING":
      return {
        ...state,
        loading: action.payload
      };
      case "SET_INDEX":
      return {
        ...state,
        index: action.payload
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
