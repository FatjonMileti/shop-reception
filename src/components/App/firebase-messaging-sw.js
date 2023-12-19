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

if (messaging) {
  messaging.onBackgroundMessage(payload => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload)
    // Customize notification here
    const notificationTitle = payload.data.title
    const notificationOptions = {
      body: payload.data.body,
      data: {
        url: payload.data.route
      }
    }
    
    return self.registration.showNotification(notificationTitle, notificationOptions)
  })

  self.addEventListener('notificationclick', event => {
    event.notification.close()
    event.waitUntil(
      clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(function (clientList) {
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i]
          if (client.url === event.notification.data.url && 'focus' in client) {
            return client.focus()
          }
        }
        if (clients.openWindow) return clients.openWindow(event.notification.data.url || '/')
      })
    )
  })
}
