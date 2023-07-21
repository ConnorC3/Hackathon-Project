// Function to check if the user is already logged in
function checkLoggedIn() {
  const user = JSON.parse(localStorage.getItem("user"));
  const greetingContainer = document.getElementById("greetingContainer");
  const logoutButton = document.getElementById("logout");
  const loginButton = document.getElementById("login");

  if (user) {
    // User is already logged in, show the greeting message
    const greetingMessage = document.createElement("h1");
    greetingMessage.textContent = `Hello, ${user.username}!`;
    greetingContainer.appendChild(greetingMessage);

    // Show logout link and hide login link
    logoutButton.style.display = "block";
    loginButton.style.display = "none";

    // Add event listener for logout button
    logoutButton.addEventListener("click", handleLogout);
  } else {
    // User is not logged in, show "Welcome, Visitor" in the header
    const welcomeMessage = document.createElement("h1");
    welcomeMessage.textContent = "Welcome, Visitor";
    greetingContainer.appendChild(welcomeMessage);

    // Show login link and hide logout link
    logoutButton.style.display = "none";
    loginButton.style.display = "block";
  }
}

// Function to handle user login
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Retrieve user object from localStorage based on the entered username
  const user = JSON.parse(localStorage.getItem(username));

  if (!user || user.password !== password) {
    alert("Invalid username or password. Please try again.");
    return;
  }

  // Store the logged-in user in localStorage (for session management)
  localStorage.setItem("user", JSON.stringify(user));

  // Redirect to index.html after successful login
  window.location.href = "index.html";
}

// Function to handle user signup
function handleSignUp(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Check if the user already exists in localStorage
  if (localStorage.getItem(username)) {
    alert("Username already exists. Please choose a different username.");
    return;
  }

  // Create user object and store it in localStorage
  const user = {
    username: username,
    email: email,
    password: password,
  };
  localStorage.setItem(username, JSON.stringify(user));

  // Redirect to login_page.html after successful signup
  window.location.href = "login_page.html";
}

// Function to handle user logout
function handleLogout(event) {
  event.preventDefault();

  // Remove the user data from localStorage
  localStorage.removeItem("user");

  // Redirect to index.html after successful logout
  window.location.href = "index.html";
}

// Add event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", checkLoggedIn);

// Add event listeners for signup form submission and login form submission
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

if (signupForm) {
  signupForm.addEventListener("submit", handleSignUp);
}

if (loginForm) {
  loginForm.addEventListener("submit", handleLogin);
}
