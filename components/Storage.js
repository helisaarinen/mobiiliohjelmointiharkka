//Siirrä tänne kaikki storageen liittyvä, importoi ref ja exportoi sisälmykset.
//https://firebase.google.com/docs/storage/web/download-files?hl=en&authuser=0
/*
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Create a reference to the file we want to download
//const storage = getStorage();
const starsRef = ref(storage, 'images/stars.jpg');


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO9fCYc1WRekqoFXCfThNXQUc4RGGyLdw",
  authDomain: "harkka-d0123.firebaseapp.com",
  databaseURL: "https://harkka-d0123-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "harkka-d0123",
  storageBucket: "harkka-d0123.appspot.com",
  messagingSenderId: "328663011614",
  appId: "1:328663011614:web:3069ba8fb3c4893c52390f",
  storageBucket:"https://console.firebase.google.com/project/harkka-d0123/storage/harkka-d0123.appspot.com/files"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app, "https://console.firebase.google.com/project/harkka-d0123/storage/harkka-d0123.appspot.com/files")

// Create a child reference
const imagesRef = ref(storage, 'logot');
// imagesRef now points to 'images'

// Child references can also take paths delimited by '/'

export const spaceRef = ref(storage, 'logot/IHK_logo_sininen.png');


// Get the download URL
getDownloadURL(starsRef)
  .then((url) => {
    // Insert url into an <img> tag to "download"
  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });*/