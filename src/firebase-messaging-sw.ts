import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging/sw'
import { firebaseConfig } from 'utils/firebase'

declare const self: ServiceWorkerGlobalScope

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

// self.onnotificationclick = (event: any) => {
//   console.log('On notification click: ', event.notification.tag)
//   event.notification.close()

//   event.waitUntil(
//     self.clients.openWindow(event.fcmOptions.link) // Open the URL
//   )
// }

self.onnotificationclick = event => {
  console.log('On notification click: ', event.notification.tag)
  event.notification.close()

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    self.clients
      .matchAll({
        type: 'window'
      })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) return client.focus()
        }
        if (self.clients.openWindow) return self.clients.openWindow('/')
      })
  )
}
