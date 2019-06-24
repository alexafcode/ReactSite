import firebaseConfig from "../../firebase-config";
const registerAction = (name, email, password) => async dispatch => {
  await firebaseConfig
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user);
      dispatch({ type: "signIn", payload: true });
    })
    .catch(error => console.error(error.message));
};
export default registerAction;

