import { app, db, auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  ref,
  get,
  child
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");
const complaintTable = document.getElementById("complaintTable");

// 🟣 Login Button
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginError.textContent = "";
  } catch (err) {
    loginError.textContent = "❌ " + err.message;
  }
});

// 🟢 Auth State Listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginSection.style.display = "none";
    dashboardSection.style.display = "block";
    loadComplaints();
  } else {
    loginSection.style.display = "flex";
    dashboardSection.style.display = "none";
  }
});

// 🗂️ Fetch Complaints from Firebase
function loadComplaints() {
  const dbRef = ref(db, "complaints/");
  get(dbRef).then((snapshot) => {
    complaintTable.innerHTML = "";
    if (snapshot.exists()) {
      const data = snapshot.val();
      Object.keys(data).forEach((id) => {
        const c = data[id];
        complaintTable.innerHTML += `
          <tr>
            <td>${id}</td>
            <td>${c.category || "-"}</td>
            <td>${c.message || "-"}</td>
            <td>${c.status || "Pending"}</td>
          </tr>`;
      });
    } else {
      complaintTable.innerHTML = `<tr><td colspan="4">No complaints found</td></tr>`;
    }
  });
}
