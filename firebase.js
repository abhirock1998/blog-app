const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyDR_YbI5TbPKfEKJ-bxsSPu0fjGW8OcBno",
  authDomain: "blog-cd8ef.firebaseapp.com",
  projectId: "blog-cd8ef",
  storageBucket: "blog-cd8ef.appspot.com",
  messagingSenderId: "767184662080",
  appId: "1:767184662080:web:0aeccfd9871417a75439a5",
  measurementId: "G-P0SY2SHD6T",
};

const firebaseApp = firebase.default.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
exports.module = {
  auth: auth,
  database: db,
};
