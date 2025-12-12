// Toggle Dark/Light Mode
const themeBtn = document.createElement("button");
themeBtn.innerText = "🌓 Mode";
themeBtn.classList.add("theme-btn");
document.body.appendChild(themeBtn);

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// Notification Bar
export function showNotification(msg, color = "#4caf50") {
  const note = document.createElement("div");
  note.className = "notification-bar";
  note.style.background = color;
  note.textContent = msg;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 3000);
}
