import firebase from 'firebase'

import auth from './auth'

const firebaseSetUp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      databaseURL: process.env.DATABASEURL,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.STORAGEBUCKET,
      messagingSenderId: process.env.MESSAGINGSENDERID,
      appId: process.env.APPID,
      measurementId: process.env.MEASUREMENTID,
    })
  }
}

export default function ({ app }) {
  firebaseSetUp()
  auth(app)
}
