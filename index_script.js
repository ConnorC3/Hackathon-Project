// JavaScript code for index.html

document.addEventListener("DOMContentLoaded", function () {
  // Load the saved events from local storage and display them as posts
  loadPostsFromLocalStorage();
});

function loadPostsFromLocalStorage() {
  const section1Posts = document.getElementById("section1Posts");
  const section2Posts = document.getElementById("section2Posts");

  let events = JSON.parse(localStorage.getItem("events")) || [];

  // Clear existing posts to avoid duplication
  section1Posts.innerHTML = "";
  section2Posts.innerHTML = "";

  // Loop through the saved events and create post elements
  events.forEach(function (event, index) {
    const postElement = createPostElement(event.name, event.description);

    // Display posts in the corresponding sections based on the index
    if (index % 2 === 0) {
      section1Posts.appendChild(postElement);
    } else {
      section2Posts.appendChild(postElement);
    }
  });
}

function createPostElement(eventName, eventDescription) {
  const postElement = document.createElement("div");
  postElement.classList.add("post");
  postElement.innerHTML = `
    <h3>${eventName}</h3>
    <p>${eventDescription}</p>
  `;
  return postElement;
}

// JavaScript code for adding scroll buttons dynamically
function addScrollButtonsToSection(sectionElement) {
  // ... (Your existing code for scroll buttons)
}

// Add scroll buttons to each section
document.querySelectorAll(".section").forEach(function (section) {
  addScrollButtonsToSection(section);
});
