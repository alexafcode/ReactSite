const initialState = {
  cars: [],
  loading: true
}
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
    default:
      return state;
  }
};
