import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { removeFirebaseToken, setFirebaseToken } from './authService'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'communicationgatewayapi.firebaseapp.com',
  projectId: 'communicationgatewayapi',
  storageBucket: 'communicationgatewayapi.appspot.com',
  messagingSenderId: '337960741708',
  appId: '1:337960741708:web:8318e4584800d55880fde9'
}

const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

export const getFBToken = async (setToken) => {
  return getToken(messaging, {
    vapidKey:
      'BH25kT8DTRXxDviLr1RQ0RRvDzUCf-P1EteteGf0a9ryxfy_144JqLEIBPS13rPqGJo4z7NtjGzaZXqIr1hRojE'
  })
    .then(currentToken => {
      if (currentToken) {
        console.log('current token for client: ', currentToken)
        setFirebaseToken(currentToken)
        setToken(currentToken)
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.')
        removeFirebaseToken()
        setToken(null)
        // shows on the UI that permission is required
      }
    })
    .catch(err => {
      console.log('An error occurred while retrieving token. ', err)
      removeFirebaseToken()
      setToken(null)
      // catch error while creating client token
    })
}

export const onMessageListener = () =>
  new Promise(resolve => {
    onMessage(messaging, payload => {
      console.log('payload', payload)
      resolve(payload)
    })
  })
