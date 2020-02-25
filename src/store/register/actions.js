import { firebaseApp } from "../../firebase-config";
import history from "../../../src/history";

const SIGNIN = "SIGNIN";
const LOAD_FAV_CARS = "LOAD_FAV_CARS";
const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
const SIGNIN_ERROR = "SIGNIN_ERROR";
const SIGNOUT = "SIGNOUT";

export const signInAction = (email, password) => async dispatch => {
  dispatch({ type: SIGNIN, payload: true });
  await firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      dispatch({ type: SIGNIN_SUCCESS, payload: user });
      try {
        localStorage.setItem("authUser", JSON.stringify(user));
      } catch (e) {
        console.error(e);
      }
      history.push("/");
    })
    .catch(({ message }) => {
      dispatch({ type: SIGNIN_ERROR, payload: message });
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
      dispatch({ type: SIGNOUT });
    });
};

export const verifyAuth = () => async dispatch => {
  if (localStorage.getItem("authUser") != null) {
    const user = JSON.parse(localStorage.getItem("authUser"));
    dispatch({ type: SIGNIN_SUCCESS, payload: user });
  } else {
    await firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch({ type: SIGNIN_SUCCESS, payload: user });
      }
    });
  }
};

export const createUserAction = (email, pw) => async dispatch => {
  dispatch({ type: SIGNIN, payload: true });
  await firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, pw)
    .then(({ user }) => {
      try {
        localStorage.setItem("authUser", JSON.stringify(user));
      } catch (e) {
        console.error(e);
      }
      dispatch({ type: SIGNIN_SUCCESS, payload: user });
      history.push("/");
    })
    .catch(({ message }) => {
      dispatch({ type: SIGNIN_ERROR, payload: message });
    });
};

export const updateUserProfile = (
  email,
  displayName,
  blobImage,
  changePhoto
) => async dispatch => {
  dispatch({ type: SIGNIN, payload: true });
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
      history.push("/");
      await firebaseApp.auth().onAuthStateChanged(user => {
        if (user) {
          try {
            localStorage.setItem("authUser", JSON.stringify(user));
          } catch (e) {
            console.error(e);
          }
          dispatch({ type: SIGNIN_SUCCESS, payload: user });
        }
      });
    })
    .catch(error => console.error(error.message));
};

export const loadFavCars = email => async dispatch => {
  await firebaseApp
    .firestore()
    .collection("userData")
    .doc(email)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.exists) {
        const result = querySnapshot.data();
        dispatch({ type: LOAD_FAV_CARS, payload: result.auto });
      }
    });
};

// ToDo
export const resetPasswordAction = email => async dispatch => {
  await firebaseApp.auth().sendPasswordResetEmail(email);
};
