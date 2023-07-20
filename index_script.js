document.addEventListener("DOMContentLoaded", function () {
  // Load the saved events from local storage and display them as posts
  loadPostsFromLocalStorage();
});

function loadPostsFromLocalStorage() {
  const allPostsContainer = document.getElementById("allPosts");

  let events = JSON.parse(localStorage.getItem("events")) || [];

  // Clear existing posts to avoid duplication
  allPostsContainer.innerHTML = "";

  // Loop through the saved events and create post elements
  events.forEach(function (event) {
    const postElement = createPostElement(
      event.name,
      event.description,
      event.location
    );
    allPostsContainer.appendChild(postElement);
  });
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
