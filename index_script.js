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
    <p>
      Press check to attend:
      <button class="attendance-button" id="attendance-${eventName.replace(
        /\s/g,
        "_"
      )}">
        <i class="fas fa-check"></i>
      </button>
      <button class="cancel-button" id="cancel-${eventName.replace(
        /\s/g,
        "_"
      )}">
        <i class="fas fa-times"></i>
      </button>
    </p>
    
    <!-- Comment section for this event -->
    <div class="comments-section">
      <h4>Comments:</h4>
      <input
        type="text"
        placeholder="Add a comment..."
        id="commentInput-${eventName.replace(/\s/g, "_")}"
      />
      <button
        class="comment-button"
        onclick="postComment('${eventName}')"
      >
        Post
      </button>
      <div id="commentList-${eventName.replace(
        /\s/g,
        "_"
      )}" class="comment-list"></div>
    </div>
  `;

  // Check if the attendance button exists before adding an event listener
  const attendanceButton = postElement.querySelector(
    `#attendance-${eventName.replace(/\s/g, "_")}`
  );
  if (attendanceButton) {
    attendanceButton.addEventListener("click", () =>
      handleAttendance(eventName)
    );
  }

  // Check if the cancel button exists before adding an event listener
  const cancelButton = postElement.querySelector(
    `#cancel-${eventName.replace(/\s/g, "_")}`
  );
  if (cancelButton) {
    cancelButton.addEventListener("click", () =>
      handleCancelRegistration(eventName)
    );
  }

  // Load and display comments for this event
  const commentList = postElement.querySelector(
    `#commentList-${eventName.replace(/\s/g, "_")}`
  );
  loadComments(eventName, commentList);

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

function postComment(eventName) {
  const commentInput = document.getElementById(
    `commentInput-${eventName.replace(/\s/g, "_")}`
  );
  const commentText = commentInput.value.trim();

  if (commentText !== "") {
    // Create a new comment element
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.textContent = commentText;

    // Get the comment list for this event
    const commentList = document.getElementById(
      `commentList-${eventName.replace(/\s/g, "_")}`
    );

    // Append the new comment to the comment list
    commentList.appendChild(commentElement);

    // Clear the comment input
    commentInput.value = "";
  }
}

function loadComments(eventName, commentList) {
  // You can load comments for this event from your backend or local storage
  // For this example, we'll add some dummy comments
  const dummyComments = [
    "Great event! Looking forward to attending.",
    "I'll be there for sure!",
  ];

  // Create comment elements and add them to the comment list
  dummyComments.forEach((commentText) => {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.textContent = commentText;
    commentList.appendChild(commentElement);
  });
}

function handleCancelRegistration(eventName) {
  // Retrieve the current events from local storage
  let events = JSON.parse(localStorage.getItem("events")) || [];

  // Find the event with the matching name
  const eventToUpdate = events.find((event) => event.name === eventName);

  if (eventToUpdate) {
    // Check if the user is logged in before allowing cancellation
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in to cancel your attendance.");
      return;
    }

    // Check if the user has attended this event
    const attendedEvents = user.attendedEvents || [];
    const eventIndex = attendedEvents.indexOf(eventName);
    if (eventIndex === -1) {
      alert("You have not attended this event.");
      return;
    }

    // Reduce the number of volunteers and remove the event from the user's attended events list
    eventToUpdate.volunteers = Math.max((eventToUpdate.volunteers || 0) - 1, 0);
    attendedEvents.splice(eventIndex, 1);
    user.attendedEvents = attendedEvents;
    localStorage.setItem("user", JSON.stringify(user));

    // Save the updated events back to local storage
    localStorage.setItem("events", JSON.stringify(events));

    // Refresh the posts to update the displayed number of volunteers
    loadPostsFromLocalStorage();
  }
}
