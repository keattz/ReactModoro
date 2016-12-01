import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Leaderboard } from '~/components'
import { fetchAndSetScoresListener } from '~/redux/modules/scores'

class LeaderboardContainer extends Component {
  static propTypes = {
    listenerSet: PropTypes.bool.isRequired,
    leaders: PropTypes.array.isRequired,
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired
  }
  componentDidMount () {
    if (this.props.listenerSet === false) {
      this.props.dispatch(fetchAndSetScoresListener())
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.leaders !== this.props.leaders) {
      console.log('New leaders', nextProps.leaders)
    }
  }
  render () {
    return (
      <Leaderboard openDrawer={this.props.openDrawer} />
    )
  }
}

function mapStateToProps ({scores, users}) {
  return {
    listenerSet: scores.listenerSet,
    leaders: scores.leaderboardUids.map((uid) => {
      return {
        ...users[uid],
        score: scores.userScores[uid]
      }
    })
  }
}

export default connect(
  mapStateToProps
)(LeaderboardContainer)