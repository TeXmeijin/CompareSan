import firebase from 'firebase'
import 'firebase/auth'
import { ActionTree, MutationTree } from 'vuex'

interface RootState {}

interface AuthState {
  user: firebase.UserInfo | null
  uid: string | null
}

export const name = 'auth'

export const state = (): AuthState => ({
  user: null,
  uid: null,
})

export const mutations: MutationTree<AuthState> = {
  setUser: (state: AuthState, user) => {
    state.user = user
  },
  setUid: (state: AuthState, uid: string) => {
    state.uid = uid
  },
}

export const actions: ActionTree<AuthState, RootState> = {
  login: () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  },
  logout: async ({ commit }) => {
    await firebase.auth().signOut()

    commit('setUid', null)
    commit('setUser', null)
  },
}
