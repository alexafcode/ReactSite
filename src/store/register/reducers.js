const initialState = JSON.parse(window.localStorage.getItem('rr_user')) || {}
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
        }
    default:
      return state;
  }
};
