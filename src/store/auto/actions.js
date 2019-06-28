import { autoDb } from "../../firebase-config";

export const LOAD_AUTO_DB = "LOAD_AUTO_DB";
export const CARS_IS_LOADING = "CARS_IS_LOADING";

export const loadCars = () => async dispatch => {
  let tempDB = [];
  await autoDb.get().then(querySnapshot => {
    querySnapshot.forEach(s => {
      const data = s.data();
      let auto = {
        id: s.id,
        name: data.name,
        descriptions: data.descriptions,
        imageUrl: data.imageUrl,
        imageUrlPrev: data.imageUrlPrev,
        rating: data.rating,
        comment: data.comment,
        manufacturer: data.manufacturer
      };
      tempDB.push(auto);
    });
    dispatch({ type: LOAD_AUTO_DB, payload: tempDB })
    dispatch({ type: CARS_IS_LOADING, payload: false })
  });
};
