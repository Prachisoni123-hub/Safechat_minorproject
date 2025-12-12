// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onValue, update } 
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDivwLQtVqzCSFZ05a0ubSzqc6FBPjUdJ4",
  authDomain: "safechat-minorproject.firebaseapp.com",
  databaseURL: "https://safechat-minorproject-default-rtdb.firebaseio.com",
  projectId: "safechat-minorproject",
  storageBucket: "safechat-minorproject.firebasestorage.app",
  messagingSenderId: "508166536694",
  appId: "1:508166536694:web:3bec2a85c564df66089bd7"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ✅ Export update to use in Admin Dashboard
export { db, ref, push, onValue, update };
