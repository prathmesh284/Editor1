import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  setPersistence, 
  browserLocalPersistence, 
  onAuthStateChanged 
} from "firebase/auth";
import { getDatabase, ref, set, onValue, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCi0umXT0F0nqnVD3qlpLHLoN-GAJggmYs",
  authDomain: "editor1-3d3b8.firebaseapp.com",
  databaseURL: "https://editor1-3d3b8-default-rtdb.firebaseio.com",
  projectId: "editor1-3d3b8",
  storageBucket: "editor1-3d3b8.firebasestorage.app",
  messagingSenderId: "215001785905",
  appId: "1:215001785905:web:70684c8574c244943f9710",
  measurementId: "G-92QFNW3LTW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();

// Enable persistent login
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("Firebase persistence enabled"))
  .catch((error) => console.error("Persistence Error:", error));

// Function to sign in with Google (popup method to avoid redirect issues)
const signInUser = async () => {
  try {
    const authWindow = window.open("", "_blank", "noopener"); // Opens an empty window first
    const result = await signInWithPopup(auth, provider);
    authWindow.close(); // Closes the empty window after authentication
    console.log("Signed in as:", result.user.displayName);
  } catch (error) {
    console.error("Authentication Error:", error.message);
  }
};



// Get authenticated user (ensures user is logged in before returning)
const getCurrentUser = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user || null);
    });
  });
};

// Generate or join a room
const getRoomId = async (roomId = null) => {
  if (!roomId) {
    roomId = `room-${Math.random().toString(36).substring(2, 8)}`;
    await set(ref(db, `rooms/${roomId}/code`), "// Write JavaScript code here");
  }
  return roomId;
};

export { db, ref, set, onValue, get, signInUser, getRoomId, getCurrentUser };
