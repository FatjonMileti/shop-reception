import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging/sw'
import { firebaseConfig } from 'utils/firebase'

declare const self: ServiceWorkerGlobalScope

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

self.onnotificationclick = (event: any) => {
  console.log('On notification click: ', event.notification.tag)
  event.notification.close()

  event.waitUntil(
    self.clients.openWindow(event.fcmOptions.link) // Open the URL
  )
}
