importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: 'AIzaSyDK0c5EfHOLcO8Pmg6UGhrWfoE2a4tj7n4',
  authDomain: 'communicationgatewayapi.firebaseapp.com',
  projectId: 'communicationgatewayapi',
  storageBucket: 'communicationgatewayapi.appspot.com',
  messagingSenderId: '337960741708',
  appId: '1:337960741708:web:8318e4584800d55880fde9'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
// 
// Initialize redirect URL when notification is pressed on BACKGROUND
self.addEventListener('notificationclick', event => {
  event.notification.close() // Close the notification
// 
  event.waitUntil(
    clients.openWindow(event.fcmOptions.link) // Open the URL
  )
})
