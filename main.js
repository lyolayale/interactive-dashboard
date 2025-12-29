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

// THEM
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

// BUBBLE
const bubble = document.getElementById("bubble-container");
const header = document.querySelector("header");

themeToggle.addEventListener("mouseover", () => {
  bubble.style.display = "flex";

  clearInterval();
});

header.addEventListener("mouseleave", () => {
  bubble.style.display = "none";
});

// QUOTES
const quotes = [
  "Discipline beats motivation.",
  "Small steps create big results.",
  "The best time to start was yesterday.",
  "Focus is your superpower.",
  "You don’t need permission to build something great.",
  "Every expert was once a beginner.",
  "The more you build, the better you get.",
];

document.getElementById("quote-btn").addEventListener("click", () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote-text").textContent = randomQuote;
});

// FOOTER
const year = document.getElementById("year");
const getYear = new Date().getFullYear();
year.textContent = getYear;
