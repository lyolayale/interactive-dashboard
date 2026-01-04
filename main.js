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

// CARD SCROLL ANIMATION
const animateCards = document.querySelectorAll(".scroll-animate");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const index = [...animateCards].indexOf(entry.target);
      // Adds increment delay per card index
      entry.target.style.setProperty("--delay", `${index * 0.1}s`);

      if (entry.isIntersecting) {
        // Adds the reveal class
        entry.target.classList.add("show");
      } else {
        // Removes reveal class
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.5 }
);

animateCards.forEach(card => {
  observer.observe(card);
});

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

/* -------------------------------
   EDGE SWIPE TO OPEN SIDEBAR
----------------------------------*/
let touchStartX = 0;
let touchCurrentX = 0;
let isEdgeSwipe = false;

// DETECT TOUCH START
document.addEventListener("touchstart", e => {
  touchStartX = e.touches[0].clientX;

  // Only allows swipe if touch starts from the left 0-30px
  if (touchStartX < 30 && !sideBar.classList.contains("open")) {
    isEdgeSwipe = true;
  } else {
    isEdgeSwipe = false;
  }
  // console.log(isEdgeSwipe);
});

// DETECT TOUCH MOVE (USER DRAG FINGER)
document.addEventListener("touchmove", e => {
  if (!isEdgeSwipe) return;

  touchCurrentX = e.touches[0].clientX;

  const swipeDistance = touchCurrentX - touchStartX;

  // If user swipes right more than 40px -> open sidebar
  if (swipeDistance > 40) {
    sideBar.classList.add("open");
    isEdgeSwipe = false;
  }
});

// SWIPE LEFT TO CLOSE SIDEBAR
let sidebarTouchStartX = 0;

sideBar.addEventListener("touchstart", e => {
  sidebarTouchStartX = e.touches[0].clientX;
});

sideBar.addEventListener("touchmove", e => {
  const difference = e.touches[0].clientX - sidebarTouchStartX;

  // If sliding finger left more than 40px -> close sidebar
  if (difference < -40) {
    sideBar.classList.remove("open");
  }
});

/*---------------
  WEATHER WIDGET
----------------*/
const weatherStatus = document.querySelector(".weather-status");
const weatherInfo = document.querySelector(".weather-info");
const weatherLocation = document.querySelector(".weather-location");
const weatherTemp = document.querySelector(".weather-temp");
const weatherDesc = document.querySelector(".weather-desc");
const weatherExtra = document.querySelector(".weather-extra");
const weatherInput = document.getElementById("weather");
const weatherBtn = document.querySelector(".weather-btn");

// Default city
const DEFAULT_CITY = "Atlanta";

// Fetch weather from wttr.in (no API key needed!)
async function fetchWeather(city) {
  try {
    // if (weatherInput.value !== "") {
    //   city = weatherInput.value;
    // } else {
    //   city = DEFAULT_CITY;
    // }

    city = weatherInput.value || DEFAULT_CITY;

    const res = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await res.json();

    const current = data.current_condition[0];

    weatherLocation.textContent = city;
    weatherTemp.textContent = `${current.temp_F}°F`;
    weatherDesc.textContent = current.weatherDesc[0].value;
    weatherExtra.textContent = `Feels like: ${current.FeelsLikeF}°F`;

    weatherStatus.style.display = "none";
    weatherInfo.classList.remove("hidden");
  } catch (err) {
    weatherStatus.textContent = "Unable to load weather.";
  }
}

weatherBtn.addEventListener("click", () => {
  fetchWeather();

  setTimeout(() => {
    weatherInput.value = "";
  }, 500);
});

// Try geolocation first
function loadWeather() {
  if (!navigator.geolocation) {
    fetchWeather(DEFAULT_CITY);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude;
      const long = pos.coords.longitude;

      fetchWeather(`${lat},${long}`);
    },
    () => {
      // If permission denied
      fetchWeather(DEFAULT_CITY);
    }
  );
}

loadWeather();
/*--------------------------
  BOTTOM NAV TAB SWITCHING
----------------------------*/
const tabButtons = document.querySelectorAll(".tab-btn");
const tabScreens = document.querySelectorAll(".tab-screen");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active from all
    tabButtons.forEach(b => b.classList.remove("active"));

    // Highlight the click tab button
    btn.classList.add("active");

    // Get the tab name(home, dashboard, tasks, profile)
    const tab = btn.dataset.tab;

    console.log(`Switched to tab: ${tab}`);

    // Later: show/hide content based on tab

    // Hide all screens
    tabScreens.forEach(screen => screen.classList.remove("active-screen"));

    // Show selected screen
    const targetScreen = document.getElementById(tab);
    targetScreen.classList.add("active-screen");

    // Footer placement
    const footer = document.querySelector("footer");
    if (tab !== "home") {
      footer.style.position = "fixed";
      footer.style.bottom = 0;
    } else {
      footer.style.position = "static";
    }
  });
});
