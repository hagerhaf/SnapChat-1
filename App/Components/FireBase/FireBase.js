import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: 'AIzaSyA1ibIJsCQv8KBNMhg5D91PvuYI3QM5viU',
    authDomain: 'snapchat-da2b5.firebaseapp.com',
    databaseURL: 'https://snapchat-da2b5.firebaseio.com',
    storageBucket: 'snapchat-da2b5.appspot.com',
    messagingSenderId: '927676989151'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
var database = firebaseApp.database();

export default database

