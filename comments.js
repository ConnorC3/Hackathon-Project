// Function to load and display comments for a specific event
function loadComments(eventName, commentList) {
  const comments =
    JSON.parse(localStorage.getItem(`comments-${eventName}`)) || [];

  // Clear existing comments
  commentList.innerHTML = "";

  comments.forEach(function (commentText) {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.textContent = commentText;
    commentList.appendChild(commentElement);
  });
}

// Function to post a comment for a specific event
function postComment(eventName) {
  eventName = eventName.replaceAll(" ", "_");
  const commentInput = document.getElementById(`commentInput-${eventName}`);
  const commentText = commentInput.value.trim();

  if (commentText !== "") {
    // Load existing comments
    const comments =
      JSON.parse(localStorage.getItem(`comments-${eventName}`)) || [];

    // Add the new comment
    comments.push(commentText);

    // Save the updated comments back to local storage
    localStorage.setItem(`comments-${eventName}`, JSON.stringify(comments));

    // Load and display comments
    const commentList = document.getElementById(`commentList-${eventName}`);
    loadComments(eventName, commentList);

    // Clear the comment input field
    commentInput.value = "";
  }
}
