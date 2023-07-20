// index_script.js

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

  const postsPerRow = 4;
  let currentRow = document.createElement("div");
  currentRow.classList.add("row");

  // Loop through the saved events and create post elements
  events.forEach(function (event, index) {
    const postElement = createPostElement(
      event.name,
      event.description,
      event.location
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

function createPostElement(eventName, eventDescription, eventLocation) {
  const postElement = document.createElement("div");
  postElement.classList.add("post");
  postElement.innerHTML = `
    <h3>Event Name: ${eventName}</h3>
    <p>Event Description: ${eventDescription}</p>
    <p>Event Location: ${eventLocation}</p>
  `;
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

  const postsPerRow = 4;
  let currentRow = document.createElement("div");
  currentRow.classList.add("row");

  // Loop through the filtered events and create post elements
  filteredEvents.forEach(function (event, index) {
    const postElement = createPostElement(
      event.name,
      event.description,
      event.location
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
