const firebaseConfig = {
  apiKey: "AIzaSyAcGh8u0Z_daCQUpyDY283Xd_BCBOZa3Pc",
  authDomain: "quadfore-chat.firebaseapp.com",
  databaseURL: "https://quadfore-chat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quadfore-chat",
  storageBucket: "quadfore-chat.appspot.com",
  messagingSenderId: "1004093806600",
  appId: "1:1004093806600:web:e069957b115bb8fbdd99bd",
  measurementId: "G-M25SYWBQB2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  // Function to display messages
  function displayMessages() {
    var chatMessages = document.querySelector(".chat-messages");
    // Clear existing messages
    chatMessages.innerHTML = "";

    // Reference to the messages in the database
    var messagesRef = database.ref("messages");

    // Listen for new messages and update the UI
    messagesRef.on("child_added", function(snapshot) {
      var message = snapshot.val();
      var messageElement = document.createElement("div");
      messageElement.className = "message " + (message.sender === "You" ? "outgoing" : "incoming");
      messageElement.innerHTML = `<span class="user">${message.sender}:</span><p>${message.text}</p>`;
      chatMessages.appendChild(messageElement);
    });
  }

  // Initial call to display messages
  displayMessages();

  // Function to send a message
  function sendMessage() {
    var messageInput = document.querySelector("textarea");
    var messageText = messageInput.value.trim();

    if (messageText !== "") {
      // Reference to the messages in the database
      var messagesRef = database.ref("messages");

      // Push a new message to the database
      messagesRef.push({
        sender: "You", // Replace with the actual sender
        text: messageText
      });

      // Clear the input field
      messageInput.value = "";

      // Update the UI with the new message
      displayMessages();
    }
  }

  // Attach click event to the send button
  document.querySelector(".send-button").addEventListener("click", sendMessage);