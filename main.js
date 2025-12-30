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
const cards = document.querySelectorAll(".card");

function applyTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
  if (newTheme === "light") {
    header.style.backgroundColor = "#4a90e2";
  } else {
    header.style.backgroundColor = "rgba(18, 18, 100, 0.8)";
  }

  applyTheme(newTheme);
});

cards.forEach(card => {
  if (document.body.classList.contains("light")) {
    card.style.boxShadow = "5px 5px 10px rgba(0, 0, 0, 0.5)";
  } else {
    card.style.boxShadow = "5px 5px 10px rgba(226, 226, 226, 0.5)";
  }
});

// BUBBLE
const bubble = document.getElementById("bubble-container");
const header = document.querySelector("header");

const bubbleMediaQuery = window.matchMedia("(min-width: 600px)");

bubbleMediaQuery.addEventListener("change", e => {
  if (e.matches) {
    themeToggle.addEventListener("mouseover", () => {
      bubble.style.display = "none";
      clearInterval();
    });
  } else {
    themeToggle.addEventListener("mouseover", () => {
      bubble.style.display = "flex";
    });

    header.addEventListener("mouseleave", () => {
      bubble.style.display = "none";
    });
  }
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
