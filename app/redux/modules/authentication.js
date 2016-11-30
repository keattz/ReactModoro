const AUTH_USER = 'AUTH_USER'

const initialState = {
  isAuthed: false,
  isAuthenticating: false,
  authedId: ''
}

export default function authentication (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        authedId: action.user_id
      }
      default:
        return state
  }
}