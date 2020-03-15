import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = db.doc(`users/${user.uid}`);
  const userDocument = await userRef.get();

  if (!userDocument.exists) {
    const {email} = user;

    try {
      await userRef.set({
        email,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating document", error);
    }
  }

  return getUserDocument(user.uid)
}

const getUserDocument = async uid  => {
  if (!uid) return null;

  try {
    const userDocument = await db.doc(`users/${uid}`).get();
    return {
      uid, 
      ...userDocument.data()
    };
  } catch (error) {
    console.log("Error getting data", error);
  }
}