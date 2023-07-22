document.addEventListener("DOMContentLoaded", function () {
  // Load the saved events from local storage and display them as posts
  loadPostsFromLocalStorage();

  // Add event listener to the search form
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    handleSearch();
  });
});

function loadPostsFromLocalStorage() {
  const postsContainer = document.getElementById("postsContainer");
  let events = JSON.parse(localStorage.getItem("events")) || [];

  // Clear existing posts to avoid duplication
  postsContainer.innerHTML = "";

  const postsPerColumn = 3;
  let currentColumn;
  let postCount = 0;

  // Loop through the saved events and create post elements
  events.forEach(function (event) {
    const postElement = createPostElement(
      event.name,
      event.description,
      event.location,
      event.time,
      event.volunteers || 0 // Pass the number of volunteers to the createPostElement function
    );

    // Create a new column container if needed
    if (postCount % postsPerColumn === 0) {
      currentColumn = document.createElement("div");
      currentColumn.classList.add("column");
      postsContainer.appendChild(currentColumn);
    }

    // Add the post to the current column
    currentColumn.appendChild(postElement);
    postCount++;
  });
}

function createPostElement(
  eventName,
  eventDescription,
  eventLocation,
  eventTime,
  volunteers
) {
  const postElement = document.createElement("div");
  postElement.classList.add("post");
  postElement.innerHTML = `
    <h3>Event Name: ${eventName}</h3>
    <p>Event Description: ${eventDescription}</p>
    <p>Event Location: ${eventLocation}</p>
    <p>Event Time: ${eventTime}</p>
    <p>Number of volunteers: ${volunteers}</p>
    <p>Press check to attend: <button class="attendance-button" id="attendance-${eventName}"><i class="fas fa-check"></i></button>
    <button class="cancel-button" id="cancel-${eventName}"><i class="fas fa-times"></i></button></p> 
  `;

  // Check if the attendance button exists before adding event listener
  const attendanceButton = postElement.querySelector(
    `#attendance-${eventName}`
  );
  if (attendanceButton) {
    attendanceButton.addEventListener("click", () =>
      handleAttendance(eventName)
    );
  }

  // Check if the cancel button exists before adding event listener
  const cancelButton = postElement.querySelector(`#cancel-${eventName}`);
  if (cancelButton) {
    cancelButton.addEventListener("click", () =>
      handleCancelRegistration(eventName)
    );
  }

  return postElement;
}

function handleAttendance(eventName) {
  // Retrieve the current events from local storage
  let events = JSON.parse(localStorage.getItem("events")) || [];

  // Find the event with the matching name
  const eventToUpdate = events.find((event) => event.name === eventName);

  if (eventToUpdate) {
    // Check if the user is logged in before allowing attendance
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in to confirm attendance.");
      return;
    }

    // Check if the user has already attended this event
    const attendedEvents = user.attendedEvents || [];
    if (attendedEvents.includes(eventName)) {
      alert("You have already confirmed attendance for this event.");
      return;
    }

    // Update the number of volunteers
    eventToUpdate.volunteers = (eventToUpdate.volunteers || 0) + 1;

    // Add the event to the user's attended events list
    attendedEvents.push(eventName);
    user.attendedEvents = attendedEvents;
    localStorage.setItem("user", JSON.stringify(user));

    // Save the updated events back to local storage
    localStorage.setItem("events", JSON.stringify(events));

    // Refresh the posts to update the displayed number of volunteers
    loadPostsFromLocalStorage();
  }
}

// Function to handle search
function handleSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchQuery = searchInput.value.trim().toLowerCase();
  const postsContainer = document.getElementById("postsContainer");
  const posts = postsContainer.getElementsByClassName("post");

  // Loop through all posts and hide/show them based on the search query
  for (const post of posts) {
    const eventName = post.querySelector("h3").textContent.toLowerCase();
    const eventDescription = post
      .querySelector("p:nth-of-type(1)")
      .textContent.toLowerCase();
    const eventLocation = post
      .querySelector("p:nth-of-type(2)")
      .textContent.toLowerCase();

    // Check if the search query matches any part of the event details
    if (
      eventName.includes(searchQuery) ||
      eventDescription.includes(searchQuery) ||
      eventLocation.includes(searchQuery)
    ) {
      post.style.display = "block"; // Show the post if it matches the search query
    } else {
      post.style.display = "none"; // Hide the post if it doesn't match the search query
    }
  }
}
