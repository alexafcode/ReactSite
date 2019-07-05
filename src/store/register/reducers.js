// JSON.parse(window.localStorage.getItem('rr_user')) || {}
const initialState = {
  isAuthenticated: null,
  user: null,
  error: false,
  errorMessage: "",
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        isAuthenticated: action.payload
      };
    case "USER":
      return {
        ...state,
        user: action.payload
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
    case "LOADING":
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};
