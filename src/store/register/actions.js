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
      dispatch({ type: SIGNIN, payload: false });
      dispatch({ type: USER, payload: null });
      history.push("/");
    });
};

export const verifyAuth = () => async dispatch => {
  await firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch({ type: SIGNIN, payload: true });
      dispatch({ type: USER, payload: user });
    }
  });
};

// ToDo
export const createUserAction = (email, pw) => async dispatch => {
  await firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, pw)
    .then(user => console.log(user));
};

export const resetPasswordAction = email => async dispatch => {
  await firebaseApp.auth().sendPasswordResetEmail(email);
};
