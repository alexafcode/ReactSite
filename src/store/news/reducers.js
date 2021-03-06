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
        loading: false,
        news: [...action.payload],
        index: action.index
      };
    case "NEWS_LOADING":
      return {
        ...state,
        error: false,
        errorMessage: null,
        loading: true
      };
    case "ERROR_FETCH_DATA":
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
