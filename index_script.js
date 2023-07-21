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
    <p>Press check to attend: <p> <button class="attendance-button" id="attendance-${eventName}"><i class="fas fa-thumbs-up"></i></button> 
  `;

  // Add event listener to the attendance button
  const attendanceButton = postElement.querySelector(
    `#attendance-${eventName}`
  );
  attendanceButton.addEventListener("click", () => handleAttendance(eventName));

  return postElement;
}

function handleSearch() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();
  const postsContainer = document.getElementById("postsContainer");
  let events = JSON.parse(localStorage.getItem("events")) || [];

  // Clear existing posts to avoid duplication
  postsContainer.innerHTML = "";

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm)
  );

  const postsPerRow = 3;
  let currentRow = document.createElement("div");
  currentRow.classList.add("row");

  // Loop through the filtered events and create post elements
  filteredEvents.forEach(function (event, index) {
    const postElement = createPostElement(
      event.name,
      event.description,
      event.location,
      event.time,
      event.volunteers || 0
    );

    // Add the post to the current row
    currentRow.appendChild(postElement);

    // Check if we need to start a new row
    if ((index + 1) % postsPerRow === 0) {
      postsContainer.appendChild(currentRow);
      currentRow = document.createElement("div");
      currentRow.classList.add("row");
    }
  });

  // Check if there are any remaining posts in the current row
  if (currentRow.childElementCount > 0) {
    postsContainer.appendChild(currentRow);
  }
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
