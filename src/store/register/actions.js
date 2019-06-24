import firebaseConfig from "../../firebase-config";
import history from "../../../src/history"
export const SIGNIN = "SIGNIN";

const registerAction = (email, password) => async dispatch => {
  await firebaseConfig
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user);
      dispatch({ type: SIGNIN, payload: true });
      history.push('/')
    })
    .catch(error => console.error(error.message));
};
export default registerAction;

