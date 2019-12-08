import Rebase from 're-base'; //used to mirror state to firebase
import firebase from 'firebase'; //used to mirror state to firebase
import private from './private'; //used to mirror state to firebase

const firebaseApp = firebase.initializeApp({

    apiKey: private.apiKey,
    authDomain: "learn-react-mez.firebaseapp.com",
    databaseURL: "https://learn-react-mez.firebaseio.com",


});

const base = Rebase.createClass(firebaseApp.database());

//named export
export { firebaseApp };

//default export
export default base;