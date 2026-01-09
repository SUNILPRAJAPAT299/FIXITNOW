document.addEventListener("DOMContentLoaded", function () {

  /* ===== AUTH CHECK ===== */
  const user = localStorage.getItem("loggedInUser");
  const isProtected = document.body.getAttribute("data-protected");

  if (isProtected === "true" && !user) {
    window.location.href = "login.html";
    return;
  }

  /* ===== HEADER USER INFO ===== */
  const userArea = document.getElementById("userArea");
  const loginLink = document.getElementById("loginLink");

  if (user && userArea) {
    if (loginLink) loginLink.style.display = "none";

    userArea.innerHTML = `
      <span>Hi, ${user.split("@")[0]}</span>
      <a href="dashboard.html">Dashboard</a>
      <a href="#" id="logoutBtn">Logout</a>
    `;

    document.getElementById("logoutBtn").onclick = function () {
      localStorage.clear();
      window.location.href = "index.html";
    };
  }

  /* ===== LOGIN ===== */
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const error = document.getElementById("error");

      if (email === "admin@gmail.com" && password === "12345") {
        localStorage.setItem("loggedInUser", email);
        window.location.href = "index.html";
      } else {
        error.innerText = "Invalid email or password";
      }
    });
  }

  /* ===== BOOKING ===== */
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const booking = {
        service: document.getElementById("service").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        address: document.getElementById("address").value
      };

      localStorage.setItem("bookingData", JSON.stringify(booking));
      alert("Booking Confirmed");
      window.location.href = "dashboard.html";
    });
  }

  /* ===== DASHBOARD DATA ===== */
  const bookingDetails = document.getElementById("bookingDetails");
  if (bookingDetails) {
    const booking = JSON.parse(localStorage.getItem("bookingData"));
    if (booking) {
      bookingDetails.innerHTML = `
        <h3>Your Booking</h3>
        <p>Service: ${booking.service}</p>
        <p>Date: ${booking.date}</p>
        <p>Time: ${booking.time}</p>
        <p>Address: ${booking.address}</p>
      `;
    } else {
      bookingDetails.innerHTML = "<p>No bookings yet</p>";
    }
  }

});
