import firebase from 'firebase'
require("firebase/firestore")


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyATN7KR8Z9TmKY7nnJhtQk69ypkIlYqDqg",
    authDomain: "booksanta-b0020.firebaseapp.com",
    databaseURL: "https://booksanta-b0020.firebaseio.com",
    projectId: "booksanta-b0020",
    storageBucket: "booksanta-b0020.appspot.com",
    messagingSenderId: "1006564749011",
    appId: "1:1006564749011:web:b5a7144c1f8cc7aebcee26"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()