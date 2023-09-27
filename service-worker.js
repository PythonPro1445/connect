self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    // Add logic to open the chat window or relevant page when a notification is clicked.
    // For example, you can use the clients.openWindow() method.
  });
  
  self.addEventListener('push', function (event) {
    const options = {
      body: event.data.text(),
      icon: 'icon.png', // Replace with your notification icon URL
    };
  
    event.waitUntil(
      self.registration.showNotification('New Message', options)
    );
  });
  