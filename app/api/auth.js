import { AccessToken } from 'react-native-fbsdk'
import { facebookProvider, firebaseAuth, ref } from '~/config/constants'

export function getAccessToken () {
  return AccessToken.getCurrentAccessToken()
}

export function authWithToken (accessToken) {
  return firebaseAuth
    .signInWithCredential(facebookProvider.credential(accessToken))
}

export function updateUser (user) {
  return ref.child(`users/${user.uid}`).set(user)
}
