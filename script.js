/* ===== AUTH GUARD ===== */
document.addEventListener("DOMContentLoaded", () => {
  const protectedPage = document.body.dataset.protected;
  const user = localStorage.getItem("loggedInUser");

  if (protectedPage === "true" && !user) {
    window.location.href = "login.html";
  }

  // Header user display
  const userArea = document.getElementById("userArea");
  const loginLink = document.getElementById("loginLink");

  if (user && userArea) {
    if (loginLink) loginLink.style.display = "none";
    userArea.innerHTML = `
      Hi, ${user.split("@")[0]}
      <a href="dashboard.html">Dashboard</a>
      <a href="#" id="logoutBtn">Logout</a>
    `;

    document.getElementById("logoutBtn").onclick = () => {
      localStorage.clear();
      window.location.href = "index.html";
    };
  }
});

/* ===== LOGIN ===== */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    if (email === "admin@gmail.com" && password === "12345") {
      localStorage.setItem("loggedInUser", email);
      window.location.href = "index.html"; // MAIN PAGE
    } else {
      error.innerText = "Invalid login credentials";
    }
  });
}

/* ===== BOOKING ===== */
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", e => {
    e.preventDefault();

    const booking = {
      service: service.value,
      date: date.value,
      time: time.value,
      address: address.value
    };

    localStorage.setItem("bookingData", JSON.stringify(booking));
    alert("Booking Confirmed!");
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
      <p><b>Service:</b> ${booking.service}</p>
      <p><b>Date:</b> ${booking.date}</p>
      <p><b>Time:</b> ${booking.time}</p>
      <p><b>Address:</b> ${booking.address}</p>
    `;
  } else {
    bookingDetails.innerHTML = "<p>No bookings yet.</p>";
  }
}
