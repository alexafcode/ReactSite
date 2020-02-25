// JSON.parse(window.localStorage.getItem('rr_user')) || {}
const initialState = {
  isAuthenticated: null,
  user: null,
  error: false,
  errorMessage: "",
  loading: false,
  favoriteCars: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        loading: true,
        error: false
      };
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false
      };
    case "SIGNIN_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload
      };
    case "SIGNOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case "LOAD_FAV_CARS":
      return {
        ...state,
        favoriteCars: action.payload
      };
    default:
      return state;
  }
};
