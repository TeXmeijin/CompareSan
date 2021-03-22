import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import { Context } from '@nuxt/types/app'

export default function (app: Context) {
  const store = app.store
  if (process.browser) {
    const setUser = (user: firebase.User | null) => {
      if (!user) {
        store.commit('auth/setUser', null)
        return false
      }

      store.commit('auth/setUser', user.providerData[0])
      store.commit('auth/setUid', user.uid)
      return true
    }
    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        const user = result.user
        setUser(user)
        if (user !== null) {
          firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .set({
              name: user.providerData[0]!.displayName,
              created_at: Date.now(),
            })
        }
      })
    firebase.auth().onAuthStateChanged(setUser)
  }
}
