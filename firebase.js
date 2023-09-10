import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyByo0QBC3Ww4aVpY79knXuJMnOk9G6ZmVg",
//     authDomain: "livechat-ns.firebaseapp.com",
//     projectId: "livechat-ns",
//     storageBucket: "livechat-ns.appspot.com",
//     messagingSenderId: "329882727757",
//     appId: "1:329882727757:web:29f7946b58aabfde7c7304"
//   };

// const firebaseConfig = {
//   apiKey: "AIzaSyCngZLpRlqwB4SYwtVYsOLyHveg8ZyM678",
//   authDomain: "nchat-by-naim.firebaseapp.com",
//   projectId: "nchat-by-naim",
//   storageBucket: "nchat-by-naim.appspot.com",
//   messagingSenderId: "569056254757",
//   appId: "1:569056254757:web:39ce20b73744d61e1518cc"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCHskL2HjJi1S7_f_jjrkh6R4difr9mjgQ",
  authDomain: "nchat-private.firebaseapp.com",
  projectId: "nchat-private",
  storageBucket: "nchat-private.appspot.com",
  messagingSenderId: "898369717180",
  appId: "1:898369717180:web:b30c971b6faa6d4bd961b9"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider};