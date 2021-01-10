import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA4uw9YtQc9dtPvffh4YywcHof2tupOsWs",
  authDomain: "my-expenses-7ae81.firebaseapp.com",
  databaseURL: "https://my-expenses-7ae81.firebaseio.com",
  projectId: "my-expenses-7ae81",
  storageBucket: "my-expenses-7ae81.appspot.com",
  messagingSenderId: "410483492471",
  appId: "1:410483492471:web:6d31ab2cac3a2c61a2a872",
  measurementId: "G-ZEXEHTGNPS",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const dbRef = firebaseApp.firestore();
const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

dbRef.enablePersistence({ synchronizeTabs: true })
  .catch((err) => {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
    } else if (err.code === "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
    }
    console.log(err.code);
  });
// Subsequent queries will use persistence, if it was enabled successfully

const db = dbRef.collection('users');

function deleteRecord(id) {
  if(window.confirm("Confirm Delete", 'Are you sure you want to delete?'))
    db.doc(auth.currentUser.uid)
      .collection('expenses')
      .doc(id)
      .delete()
      .catch(error => console.error(error.message));
}

export { auth, deleteRecord };
export default db;
