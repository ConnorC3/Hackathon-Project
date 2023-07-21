// JavaScript code for posting_page.html

// Function to handle the event posting
const user = JSON.parse(localStorage.getItem("user"));
function checkLoggedIn() {
  const user = JSON.parse(localStorage.getItem("user"));
  const loginLink = document.querySelector(".navbar-login.login-link");
}
function postEvent() {
  const eventName = document.getElementById("event-name").value;
  const eventDescription = document.getElementById("event-description").value;
  const eventLocation = document.getElementById("event-location").value;
  const eventTime = document.getElementById("event-time").value;
  function checkLoggedIn() {
    const user = JSON.parse(localStorage.getItem("user"));
    const loginLink = document.querySelector(".navbar-login.login-link");
  }
  if (user == undefined) {
    console.log(user);
  } else if (eventName && eventDescription && eventLocation) {
    const event = {
      name: eventName,
      description: eventDescription,
      location: eventLocation,
      time: eventTime,
    };

    // Save the event to local storage
    saveEventToLocalStorage(event);

    // Clear the form fields
    document.getElementById("event-name").value = "";
    document.getElementById("event-description").value = "";
    document.getElementById("event-location").value = "";
    document.getElementById("event-time").value = "";

    //alert("Event posted successfully!");

    // Reload the index.html page to update the posts
    window.location.href = "index.html";
  } else {
    alert("Please fill in all fields.");
  }
}

function saveEventToLocalStorage(event) {
  let events = JSON.parse(localStorage.getItem("events")) || [];
  events.push(event);
  localStorage.setItem("events", JSON.stringify(events));
}
