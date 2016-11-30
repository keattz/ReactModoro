import firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyBNTWnwWzdzQicnrLZXMAkhkr7nlxZZ83M",
  authDomain: "reactmodoro-47289.firebaseapp.com",
  databaseURL: "https://reactmodoro-47289.firebaseio.com",
  storageBucket: "reactmodoro-47289.appspot.com",
  messagingSenderId: "438579366145"
})

const ref = firebase.database().ref()
const firebaseAuth = firebase.auth()
const facebookProvider = firebase.auth.FacebookAuthProvider

export {
  ref,
  firebaseAuth,
  facebookProvider
}