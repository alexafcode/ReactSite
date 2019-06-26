import { firebaseApp } from "../../firebase-config";
import history from "../../../src/history";
export const SIGNIN = "SIGNIN";
export const USER = "USER";

// firebaseApp.auth().onAuthStateChanged((user) => console.log("user", user))

export const signInAction = (email, password) => async dispatch => {
  await firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user);
      dispatch({ type: SIGNIN, payload: true });
      dispatch({ type: USER, payload: user.user });
      history.push("/");
    })
    .catch(error => console.error(error.message));
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
    console.log("user actions", user);
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
