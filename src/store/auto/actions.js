import { autoDb } from "../../firebase-config";

export const LOAD_AUTO_DB = "LOAD_AUTO_DB";
export const CARS_IS_LOADING = "CARS_IS_LOADING";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const ERROR = "ERROR";
// export const ADD_COMMENT = "ADD_COMMENT";

export const loadCars = () => async dispatch => {
  let tempDB = [];
  await autoDb
    .get()
    .then(querySnapshot => {
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
      dispatch({ type: ERROR, payload: false });
      dispatch({ type: LOAD_AUTO_DB, payload: tempDB });
      dispatch({ type: CARS_IS_LOADING, payload: false });
    })
    .catch(error => {
      console.error(error.message);
      dispatch({ type: ERROR, payload: true });
      dispatch({ type: ERROR_MESSAGE, payload: error.message });
    });
};

export const addComment = (id, newComment) => async dispatch => {
  const change = await autoDb.doc(id);
  await change
    .update({
      comment: newComment
    })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch(error => {
      console.error("Error updating document: ", error.message);
    });
};
