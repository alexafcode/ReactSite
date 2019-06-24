import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyAJiJqj-00ZD8KVrmIa4x9BuguEKSG7oDY",
  authDomain: "routesite-vue.firebaseapp.com",
  databaseURL: "https://routesite-vue.firebaseio.com",
  projectId: "routesite-vue",
  storageBucket: "routesite-vue.appspot.com",
  messagingSenderId: "567281260307"
};
// export default config
const firebaseConfig = firebase.initializeApp(config);
export default firebaseConfig;
