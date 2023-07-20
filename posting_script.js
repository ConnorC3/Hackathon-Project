// JavaScript code for posting_page.html

// Function to handle the event posting
function postEvent() {
  const eventName = document.getElementById("event-name").value;
  const eventDescription = document.getElementById("event-description").value;

  if (eventName && eventDescription) {
    const event = {
      name: eventName,
      description: eventDescription,
    };

    // Save the event to local storage
    saveEventToLocalStorage(event);

    // Clear the form fields
    document.getElementById("event-name").value = "";
    document.getElementById("event-description").value = "";

    alert("Event posted successfully!");

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
