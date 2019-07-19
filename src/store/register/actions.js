import { firebaseApp } from "../../firebase-config";
import history from "../../../src/history";
export const SIGNIN = "SIGNIN";
export const USER = "USER";
export const ERROR = "ERROR";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const LOADING = "LOADING";

export const signInAction = (email, password) => async dispatch => {
  dispatch({ type: ERROR, payload: false });
  dispatch({ type: LOADING, payload: true });
  await firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch({ type: SIGNIN, payload: true });
      dispatch({ type: USER, payload: user.user });
      dispatch({ type: LOADING, payload: false });
      try {
        localStorage.setItem("authUser", JSON.stringify(user.user));
      } catch (e) {
        console.error(e);
      }
      history.push("/");
    })
    .catch(error => {
      dispatch({ type: ERROR, payload: true });
      dispatch({ type: ERROR_MESSAGE, payload: error.message });
      dispatch({ type: LOADING, payload: false });
    });
};

export const singOutAction = () => async dispatch => {
  await firebaseApp
    .auth()
    .signOut()
    .then(() => {
      history.push("/");
      if (localStorage.getItem("authUser") != null) {
        localStorage.removeItem("authUser");
      }
      dispatch({ type: SIGNIN, payload: false });
      dispatch({ type: USER, payload: null });
    });
};

export const verifyAuth = () => async dispatch => {
  if (localStorage.getItem("authUser") != null) {
    const user = JSON.parse(localStorage.getItem("authUser"));
    dispatch({ type: SIGNIN, payload: true });
    dispatch({ type: USER, payload: user });
  } else {
    await firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch({ type: SIGNIN, payload: true });
        dispatch({ type: USER, payload: user });
      }
    });
  }
};

export const createUserAction = (email, pw) => async dispatch => {
  dispatch({ type: LOADING, payload: true });
  await firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, pw)
    .then(user => {
      try {
        localStorage.setItem("authUser", JSON.stringify(user.user));
      } catch (e) {
        console.error(e);
      }
      dispatch({ type: SIGNIN, payload: true });
      dispatch({ type: USER, payload: user.user });
      dispatch({ type: LOADING, payload: false });
      history.push("/");
    })
    .catch(error => {
      dispatch({ type: ERROR, payload: true });
      dispatch({ type: ERROR_MESSAGE, payload: error.message });
      dispatch({ type: LOADING, payload: false });
    });
};

export const updateUserProfile = (
  email,
  displayName,
  blobImage,
  changePhoto
) => async dispatch => {
  dispatch({ type: LOADING, payload: true });
  if (localStorage.getItem("authUser") != null) {
    localStorage.removeItem("authUser");
  }
  const user = firebaseApp.auth().currentUser;
  let urlPath = null;
  if (changePhoto) {
    const storage = firebaseApp.storage();
    const storageRef = storage.ref();
    const imagesRef = storageRef.child("UserImage");
    const spaceRef = imagesRef.child(email);
    await spaceRef.put(blobImage).then(async function() {
      await spaceRef.getDownloadURL().then(url => {
        urlPath = url;
      });
    });
  }
  user.sendEmailVerification();
  user
    .updateProfile({
      email,
      displayName,
      photoURL: urlPath ? urlPath : user.photoURL
    })
    .then(async () => {
      console.log("Update successful");
      history.push("/");
      await firebaseApp.auth().onAuthStateChanged(user => {
        if (user) {
          try {
            localStorage.setItem("authUser", JSON.stringify(user));
          } catch (e) {
            console.error(e);
          }
          dispatch({ type: SIGNIN, payload: true });
          dispatch({ type: USER, payload: user });
        }
      });
      dispatch({ type: LOADING, payload: false });
    })
    .catch(error => console.error(error.message));
};

// ToDo
export const resetPasswordAction = email => async dispatch => {
  await firebaseApp.auth().sendPasswordResetEmail(email);
};
