// submit.js
import { db, ref, push } from "./firebase-config.js";
import { showNotification } from "./script.js"; // optional - if you have this helper

const form = document.getElementById("complaintForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = document.getElementById("complaintText").value.trim();
  const category = document.getElementById("category").value;

  if (!text || !category) {
    // showNotification is optional — if you don't have it, replace with alert()
    if (typeof showNotification === "function") {
      showNotification("Please fill all fields", "#f44336");
    } else {
      alert("Please fill all fields");
    }
    return;
  }

  const newComplaint = {
    text,
    category,
    status: "Pending",
    timestamp: new Date().toISOString(),
  };

  try {
    // save to firebase
    const newRef = await push(ref(db, "complaints/"), newComplaint);
    const complaintId = newRef.key;

    // store id for status page if needed
    localStorage.setItem("complaintId", complaintId);

    // reset form
    form.reset();

    // redirect to success page
    window.location.href = "submitted.html";
  } catch (err) {
    console.error("Submit error:", err);
    if (typeof showNotification === "function") {
      showNotification("Submission failed. Try again.", "#f44336");
    } else {
      alert("Submission failed. Check console.");
    }
  }
});
