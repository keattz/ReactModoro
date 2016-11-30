import { authWithToken, getAccessToken, updateUser } from '~/api/auth'

const AUTHENTICATING = 'AUTHENTICATING'
const NOT_AUTHED = 'NOT_AUTHED'
const IS_AUTHED = 'IS_AUTHED'

function authenticating () {
  return {
    type: AUTHENTICATING
  }
}

function notAuthed () {
  return {
    type: NOT_AUTHED
  }
}

function isAuthed (uid) {
  return {
    type: IS_AUTHED,
    uid
  }
}

export function handleAuthWithFirebase () {
  return function (dispatch) {
    dispatch(authenticating())
    return getAccessToken()
      .then(({ accessToken }) => authWithToken(accessToken))
      .catch((error) => console.warn('Error in handleAuthWithFirebase:', error))
  }
}

export function onAuthChange (user) {
  return function (dispatch) {
    if (!user) {
      dispatch(notAuthed())
    } else {
      const { displayName, photoURL, uid } = user
      console.log(user)
      updateUser({
        uid,
        photoURL,
        displayName
      }).then(() => dispatch(isAuthed(uid))
      )
    }
  }
}

const initialState = {
  isAuthenticating: true,
  isAuthed: false,
  authedId: ''
}

export default function authentication (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: true
      }
    case NOT_AUTHED:
      return {
        ...state,
        isAuthenticating: false,
        isAuthed: false,
        authedId: ''
      }
    case IS_AUTHED:
      return {
        ...state,
        isAuthenticating: false,
        isAuthed: true,
        authedId: action.uid
      }
      default:
        return state
  }
}