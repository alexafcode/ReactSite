export default (state = {}, action) => {
  switch (action.type) {
    case "signIn":
      return {
        ...state,
        isAuthenticated: action.payload
      };
    default:
      return state;
  }
};
