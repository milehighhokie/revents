import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDTz7PhEojER4iyERzBNm32nz0pwKM3qDA",
  authDomain: "revents-1077d.firebaseapp.com",
  databaseURL: "https://revents-1077d.firebaseio.com",
  projectId: "revents-1077d",
  storageBucket: "revents-1077d.appspot.com",
  messagingSenderId: "631636745857"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
}
firestore.settings(settings)
export default firebase;