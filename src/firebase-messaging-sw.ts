import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging/sw'

declare const self: ServiceWorkerGlobalScope

console.log(process.env.FIREBASE_API_KEY)
const firebaseConfig = {
  // apiKey: "AIzaSyDK0c5EfHOLcO8Pmg6UGhrWfoE2a4tj7n4",
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'communicationgatewayapi.firebaseapp.com',
  projectId: 'communicationgatewayapi',
  storageBucket: 'communicationgatewayapi.appspot.com',
  messagingSenderId: '337960741708',
  appId: '1:337960741708:web:8318e4584800d55880fde9'
}

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
