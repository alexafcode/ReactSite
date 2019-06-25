const initialState = {
  cars: []
}
export default (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_AUTO_DB":
      return {
        ...state,
        cars: action.payload
      };
    default:
      return state;
  }
};
