import { autoDb, storage } from "../../firebase-config";
import history from "../../../src/history";

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
export const uploadAuto = state => async dispatch => {
  dispatch({ type: CARS_IS_LOADING, payload: true });
  dispatch({ type: ERROR, payload: false });
  let data = {
    id: state.modelValue.replace(/\s/g, ""),
    name: state.modelValue,
    descriptions: state.descValue,
    rating: state.ratingValue,
    manufacturer: state.manufacturerValue.trim(),
    imageUrl: "",
    imageUrlPrev: ""
  };
  const imageName = state.imageName;
  const imageNamePrev = "Prev" + state.imageName;
  const blobImage = state.blobImage;
  const blobImagePreview = state.blobImagePreview;
  const storageRef = storage.ref();
  const imagesRef = storageRef.child("AutoImage");
  let spaceRef = imagesRef.child(imageName);
  let spaceRefPrev = imagesRef.child(imageNamePrev);
  await spaceRef.put(blobImage).then(async () => {
    await spaceRef.getDownloadURL().then(async url => {
      data.imageUrl = url;
      await spaceRefPrev.put(blobImagePreview).then(async () => {
        await spaceRefPrev.getDownloadURL().then(async urlPrev => {
          data.imageUrlPrev = urlPrev;
          await autoDb
            .doc(data.id)
            .set(data)
            .then(() => {
              console.log("Document successfully written!");
              dispatch({ type: CARS_IS_LOADING, payload: false });
            })
            .catch(error => {
              console.error(error.message);
              dispatch({ type: CARS_IS_LOADING, payload: false });
              dispatch({ type: ERROR, payload: true });
              dispatch({ type: ERROR_MESSAGE, payload: error.message });
            });
        });
      });
    });
  });
  history.push("/auto");
  return "Success";
};
