import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging'
import { removeFirebaseToken, setFirebaseToken } from './authService'

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROCESS_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIRE_BASE_APP_ID
}

const firebaseApp = initializeApp(firebaseConfig)
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported()
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp)
    }
    console.log('Firebase not supported this browser')
    return null
  } catch (err) {
    console.log(err)
    return null
  }
})

export const getFBToken = async setToken => {
  return getToken(await messaging(), {
    vapidKey: process.env.FIREBASE_VAPID_KEY
  })
    .then(currentToken => {
      if (currentToken) {
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

export const onMessageListener = async () => {
  try {
    const isSupportedBrowser = await isSupported()
    if (isSupportedBrowser) {
      return new Promise(async resolve => {
        onMessage(await messaging(), payload => {
          console.log('payload', payload)
          return resolve(payload)
        })
      })
    }
  } catch (error) {
    console.log('error', error)
  }
}
