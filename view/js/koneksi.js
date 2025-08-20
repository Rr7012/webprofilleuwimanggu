// koneksi.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDkCWMaH4T2W7Ix2VaHPmA4eD7c88dvpXk",
  authDomain: "webprofilesdn.firebaseapp.com",
  databaseURL: "https://webprofilesdn-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "webprofilesdn",
  storageBucket: "webprofilesdn.appspot.com",
  messagingSenderId: "338937569949",
  appId: "1:338937569949:web:7c2f9fcfdbd97784bbaa74",
  measurementId: "G-PX6RRFQQGL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
