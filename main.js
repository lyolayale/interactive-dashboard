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
