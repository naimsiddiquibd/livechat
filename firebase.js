import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyByo0QBC3Ww4aVpY79knXuJMnOk9G6ZmVg",
    authDomain: "livechat-ns.firebaseapp.com",
    projectId: "livechat-ns",
    storageBucket: "livechat-ns.appspot.com",
    messagingSenderId: "329882727757",
    appId: "1:329882727757:web:29f7946b58aabfde7c7304"
  };

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider};