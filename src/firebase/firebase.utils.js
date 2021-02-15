import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Config detail from google 
const config = {
  apiKey: "AIzaSyBTFq8Ov2NBIrqEETA7xRafYjT9eUtMnVk",
  authDomain: "crwn-db-59167.firebaseapp.com",
  projectId: "crwn-db-59167",
  storageBucket: "crwn-db-59167.appspot.com",
  messagingSenderId: "1028538549789",
  appId: "1:1028538549789:web:89503c6c937c61470528f4",
  measurementId: "G-SBR9TR9375",
};

export const createUserProfileDocument = async (userAuth, additionalData) =>{
  if (!userAuth){
    return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{ 
      await userRef.set({  
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
       console.log('error creating user', error.message); 
    }
  }
  return userRef;

}



// from firebase documentation

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;



