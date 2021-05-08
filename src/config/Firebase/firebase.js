import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';

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
export const storage = firebase.storage();

export const createUserDocument = async (user, additionalData) => {
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
      throw new Error(`Error creating document, ${error}`)
    }
  }

  return getUserDocument(user.uid)
}

export const getUserDocument = async uid  => {
  if (!uid) return null;

  try {
    const userDocument = await db.doc(`users/${uid}`).get();

    return {
      uid, 
      ...userDocument.data()
    };
  } catch (error) {
    throw new Error(`Error getting document, ${error}`)
  }
}

export const createScanResult = async payload => {
  if (!payload) return;

  const scanResultRef = db.doc(`scan-results/${payload.scanId}`);
  const scanResult = await scanResultRef.get();

  if (!scanResult.exists) {
    try {
      await scanResultRef.set(payload);
    } catch (error) {
      throw new Error(`Error creating document, ${error}`)
    }
  } else {
    throw new Error(`Document with same ref exists`)
  }
}

export const updateScanResult = async (payload) => {
  if (!payload) return;

  const scanResultRef = db.doc(`scan-results/${payload.scanId}`);
  const scanResult = await scanResultRef.get();

  if (scanResult.exists) {
    try {
      await scanResultRef.update(payload);
    } catch (error) {
      throw new Error(`Error updating document, ${error}`)
    }
  } else {
    throw new Error(`ScanId not found`)
  }
}

export const getAllScanResults = async userId => {
  
  let scannedResults = []
  try {
    await db.collection("scan-results").where("userId", "==", userId)
      .orderBy('scanStartTime', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            scannedResults.push(doc.data())
          });
      });
    
    return scannedResults;
  } catch (error) {
    throw new Error(`Error getting document, ${error}`)
  }
}

export const getScanResult = async scanId => {
  if (!scanId) return null;

  try {
    const scanResult = await db.doc(`scan-results/${scanId}`).get();

    return {
      scanId, 
      ...scanResult.data()
    };
  } catch (error) {
    throw new Error(`Error getting document, ${error}`)
  }
}

export const createSubmittedFile = async payload => {
  if (!payload) return;

  const submittedFileRef = db.doc(`submitted-files/${payload.scanId}`);

  const studentPreviousSubmission = await db
      .collection("submitted-files")
      .where('matricNo', "==", payload.matricNo)
      .where("courseCode", "==", payload.courseCode)
      .get();

  if (!studentPreviousSubmission.empty) {
    throw new Error("You can only submit once!")
  }

  try {
    await submittedFileRef.set(payload);
  } catch (error) {
    throw new Error(`Error creating document, ${error}`)
  }
}

export const updateSubmittedFile = async (payload) => {
  if (!payload) return;

  const submittedFileRef = db.doc(`submitted-files/${payload.scanId}`);
  const submittedFile = await submittedFileRef.get();

  if (submittedFile.exists) {
    try {
      await submittedFileRef.update(payload);
    } catch (error) {
      throw new Error(`Error updating document, ${error}`)
    }
  } else {
    throw new Error(`File with ScanId not found`)
  }
}

export const getAllSubmittedFiles = async (filter, value) => {
  let submittedFiles = []

  try {
    await db.collection("submitted-files").where(filter, "==", value)
      .orderBy('timeSubmitted', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          submittedFiles.push(doc.data())
          });
      });
    
    return submittedFiles;
  } catch (error) {
    throw new Error(`Error creating document, ${error}`)
  }
}

export const loadUserFile = async file => {
  if (!file) return false;

  const storageRef = storage.ref();
  const fileRef = storageRef.child(`temps/${file.name}`);
  try {
    await fileRef.put(file);
    const downloadUrl = await fileRef.getDownloadURL();
    return downloadUrl;

  } catch (error) {
    throw new Error(`Error happened with, ${error}`)
  }
}

export const unloadUserFile = async filePath => {
  if (!filePath) return false;

  const fileRef = storage.refFromURL(filePath);
  try {
    await fileRef.delete();
    return true;
  } catch (error) {
    throw new Error(`Error happened with, ${error}`)
  }
}