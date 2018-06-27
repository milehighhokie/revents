import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig ={
    apiKey: "AIzaSyAXOQ29WnxmUXsddE-8Ax2AOWYOYJpYcWI",
    authDomain: "revents-207802.firebaseapp.com",
    databaseURL: "https://revents-207802.firebaseio.com",
    projectId: "revents-207802",
    storageBucket: "",
    messagingSenderId: "647910020761"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
}
firestore.settings(settings);

export default firebase;