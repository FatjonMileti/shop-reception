importScripts('static/firebase/firebase-app-compat.js')
importScripts('static/firebase/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: 'AIzaSyB5PBVo214x21PfiRFHd_YCR5wlfiSMMcc',
  authDomain: 'gcp-ro-online-dex-uat.firebaseapp.com',
  projectId: 'gcp-ro-online-dex-uat',
  storageBucket: 'gcp-ro-online-dex-uat.appspot.com',
  messagingSenderId: '100593929116',
  appId: '1:100593929116:web:e94423a28068178ea3d659'
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
