// import firebase from 'firebase'
import firebase from 'firebase/app';
import '@firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyAJiJqj-00ZD8KVrmIa4x9BuguEKSG7oDY",
  authDomain: "routesite-vue.firebaseapp.com",
  databaseURL: "https://routesite-vue.firebaseio.com",
  projectId: "routesite-vue",
  storageBucket: "routesite-vue.appspot.com",
  messagingSenderId: "567281260307"
};

export const firebaseApp = firebase.initializeApp(config);
export const db = firebaseApp.firestore();
export const storage = firebase.storage()
export const autoDb = db.collection('autoDb')
