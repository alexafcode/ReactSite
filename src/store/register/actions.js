import firebaseConfig from "../../firebase-config";
import history from "../../../src/history";
export const SIGNIN = "SIGNIN";
export const USER = "USER";

export const signInAction = (email, password) => async dispatch => {
  await firebaseConfig
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
  dispatch({ type: SIGNIN, payload: false });
  dispatch({ type: USER, payload: null });
  history.push("/");
};
