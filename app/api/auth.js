import { AccessToken } from 'react-native-fbsdk'
import { firebaseAuth, facebookProvider } from '~/config/constants'

export function getAccessToken () {
  return AccessToken.getCurrentAccessToken()
}

export function authWithToken (accessToken) {
  return firebaseAuth
    .signInWithCredential(facebookProvider.credential(accessToken))
}