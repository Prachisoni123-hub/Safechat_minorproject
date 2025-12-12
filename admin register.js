import { app, db, auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  ref,
  set
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

document.getElementById("registerBtn").addEventListener("click", () => {
  const name = regName.value;
  const email = regEmail.value;
  const password = regPassword.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      set(ref(db, "admins/" + cred.user.uid), {
        name: name,
        email: email
      });

      alert("Admin Registered Successfully ✅");
      window.location.href = "admin.html";
    })
    .catch((err) => {
      registerError.innerText = err.message;
    });
});
