import { db, ref, push } from "./firebase-config.js";
import { showNotification } from "./script.js";

const form = document.getElementById("complaintForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = document.getElementById("complaintText").value;
  const category = document.getElementById("category").value;

  if (!text || !category) {
    showNotification("Please fill all fields", "#f44336");
    return;
  }

  const newComplaint = {
    text,
    category,
    status: "Pending",
    timestamp: new Date().toISOString(),
  };

  // ✅ Save to Firebase
  const newRef = await push(ref(db, "complaints/"), newComplaint);
  const complaintId = newRef.key;

  // ✅ Save ID for status page
  localStorage.setItem("complaintId", complaintId);

  // ✅ Form reset
  form.reset();

  // ✅ Redirect directly to success page
  window.location.href = "success.html";
});
