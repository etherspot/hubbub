import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIO8tiLGI6FUQVv7gjxN-es3BycId9_xg",
  authDomain: "handshake-c8ab8.firebaseapp.com",
  projectId: "handshake-c8ab8",
  storageBucket: "handshake-c8ab8.firebasestorage.app",
  messagingSenderId: "446867915085",
  appId: "1:446867915085:web:aebd99bef9551b7ccc7704",
  measurementId: "G-4ZXNK4W9E8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();
let isInitialised = false;
let idToken = null;

const initialiseFirebase = async () => {
  /**
   * Ensure we are signed in
   */
  if (!isInitialised) {
    console.log('Not authenticated anonymously, starting...')

    const creds = await signInAnonymously(auth)
      .catch((error) => {
        console.error('firebase error: ', error);
      });
    idToken = await creds.user.getIdToken();

    console.log('... anonymously signed in!', idToken);
    isInitialised = true;
  }

  return Promise.resolve();
}

export function useFirebase() {
    return {
        initialiseFirebase,
        app,
        isInitialised,
        db,
        analytics,
        auth
    };
}
