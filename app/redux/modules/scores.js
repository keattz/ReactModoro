import { ref } from '~/config/constants'
import { fetchScore, increaseScore, decreaseScore } from '~/api/scores'
import { fetchUser } from '~/api/users'
import { addMultipleUsers, addUser } from '~/redux/modules/users'

const FETCHING_SCORE = 'FETCHING_SCORE'
const FETCHING_SCORE_SUCCESS = 'FETCHING_SCORE_SUCCESS'
const FETCHING_SCORE_ERROR = 'FETCHING_SCORE_ERROR'
const UPDATE_LEADERBOARD = 'UPDATE_LEADERBOARD'
const ADD_LISTENER = 'ADD_LISTENER'
const ADD_SCORES = 'ADD_SCORES'
const INCREMENT_SCORE = 'INCREMENT_SCORE'
const DECREMENT_SCORE = 'DECREMENT_SCORE'

function incrementScore (uid, amount) {
  return {
    type: INCREMENT_SCORE,
    uid,
    amount
  }
}

function decrementScore (uid, amount) {
  return {
    type: DECREMENT_SCORE,
    uid,
    amount

  }
}

function updateLeaderboard (uids) {
  return {
    type: UPDATE_LEADERBOARD,
    uids
  }
}

function addScores (scores) {
  return {
    type: ADD_SCORES,
    scores
  }
}

function addListener () {
  return {
    type: ADD_LISTENER
  }
}

function fetchingScore () {
    return {
      type: FETCHING_SCORE
    }
}

function fetchingScoreSuccess (uid, score) {
  return {
    type: FETCHING_SCORE_SUCCESS,
    uid,
    score
  }
}

export function fetchAndSetScoresListener () {
  return function (dispatch) {
    let listenerSet = false
    ref.child('scores')
      .orderByChild('score')
      .limitToLast(15)
      .on('value', (snapshot) => {
        const scores = snapshot.val() || {}

        console.log('scores:', scores)

        const leaderboardUids = Object.keys(scores)
          .sort((a, b) => scores[b].score - scores[a].score)
          .filter((uid) => !!scores[uid].score || scores[uid].score > 0)

        console.log(leaderboardUids)

        const { justScores, users } = leaderboardUids.reduce((prev, uid) => {
          console.log('prev:', prev)
          prev.justScores[uid] = scores[uid].score
          prev.users[uid] = {
            displayName: scores[uid].displayName,
            photoURL: scores[uid].photoURL,
            uid: scores[uid].uid,
          }
          return prev
        }, {justScores: {}, users: {}})

        console.log(justScores)
        console.log(users)

        console.log(leaderboardUids)
        dispatch(updateLeaderboard(leaderboardUids))
        dispatch(addScores(justScores))
        dispatch(addMultipleUsers(users))

        if (listenerSet === false) {
          dispatch(addListener())
          listenerSet = true
        }
      })
  }
}

export function incrementAndHandleScore (amount) {
  return function (dispatch, getState) {
    const { authedId } = getState().authentication
    dispatch(incrementScore(authedId, amount))
    increaseScore(authedId, amount)
      .catch(() => {
        dispatch(decrementScore(authedId, amount))
        dispatch(showFlashNotification({text: 'Error updating your state'}))
      })
  }
}

export function decrementAndHandleScore (amount) {
  return function (dispatch, getState) {
    const { authedId } = getState().authentication
    dispatch(decrementScore(authedId, amount))
    decreaseScore(authedId, amount)
      .catch(() => {
        dispatch(incrementScore(authedId, amount))
        dispatch(showFlashNotification({text: 'Error updating your state'}))
      })
  }
}

function userScores (state = {}, action) {
  switch (action.type) {
    case FETCHING_SCORE_SUCCESS:
      return {
        ...state,
        [action.uid]: action.score
      }
    case ADD_SCORES:
      return {
        ...state,
        ...action.scores
      }
    case INCREMENT_SCORE:
      return {
        ...state,
        [action.uid]: state[action.uid] + action.amount
      }
    case DECREMENT_SCORE:
      return {
        ...state,
        [action.uid]: state[action.uid] - action.amount
      }
    default:
      return state
  }
}

export function fetchAndHandleScore (uid) {
  return function (dispatch, getState) {
    dispatch(fetchingScore())
    return fetchScore(uid)
      .then((scoreInfo) => {
        dispatch(fetchingScoreSuccess(
          uid,
          !scoreInfo || !scoreInfo.score ? 0 : scoreInfo.score))
      })

      if (scoreInfo) {
        return dispatch(addUser(uid, {
          uid,
          displayName: socreInfo.displayName,
          photoURL: scoreInfo.photoURL
        }))
      } else {
        return fetchUser(uid).then((user) => dispatch(addUser(uid, user)))
      }
  }
}

const initialState = {
  isFetching: false,
  listenerSet: false,
  leaderboardUids: [],
  userScores: {}
}

export default function scores (state = initialState, action) {
  switch (action.type) {
    case FETCHING_SCORE:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_SCORE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userScores: userScores(state.userScores, action)
      }
    case UPDATE_LEADERBOARD:
      return {
        ...state,
        leaderboardUids: action.uids
      }
    case ADD_SCORES:
    case INCREMENT_SCORE:
    case DECREMENT_SCORE:
      return {
        ...state,
        userScores: userScores(state.userScores, action)
      }
    case ADD_LISTENER:
      return {
        ...state,
        listenerSet: true
      }
    default:
      return state
  }
}