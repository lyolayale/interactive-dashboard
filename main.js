// CLOCK
setInterval(function () {
  const time = new Date().toLocaleTimeString();
  document.getElementById("clock").textContent = time;
}, 1000);

// GREETING
function updateGreeting() {
  const hour = new Date().getHours();
  let message = "Hello";

  if (hour < 12) {
    message = "Good Morning!";
  } else if (hour < 18) {
    message = "Good Afternoon!";
  } else {
    message = "Good Evening!";
  }

  document.getElementById("greeting").textContent = message;
}

updateGreeting();

// SIDEBAR
const sideBar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menu-btn");
const closeSidebar = document.getElementById("close-sidebar");

menuBtn.addEventListener("click", () => {
  sideBar.classList.add("open");
});

closeSidebar.addEventListener("click", () => {
  sideBar.classList.remove("open");
});

// CLOSE SIDEBAR OUTSIDE
document.addEventListener("click", e => {
  if (
    sideBar.classList.contains("open") &&
    !sideBar.contains(e.target) &&
    e.target !== menuBtn
  ) {
    sideBar.classList.remove("open");
  }
});

// THEME
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark") ? "light" : "dark";

  applyTheme(newTheme);
});

// FOOTER
const year = document.getElementById("year");
const getYear = new Date().getFullYear();
year.textContent = getYear;
