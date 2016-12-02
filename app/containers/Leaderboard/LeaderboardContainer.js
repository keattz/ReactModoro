import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { ListView } from 'react-native'
import { Leaderboard } from '~/components'
import { fetchAndSetScoresListener } from '~/redux/modules/scores'
import Leader from './Leader'

class LeaderboardContainer extends Component {
  static propTypes = {
    listenerSet: PropTypes.bool.isRequired,
    leaders: PropTypes.array.isRequired,
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired
  }
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.leaders)
    }
  }
  componentDidMount () {
    if (this.props.listenerSet === false) {
      this.props.dispatch(fetchAndSetScoresListener())
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.leaders !== this.props.leaders) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.leaders)
      })
    }
  }
  renderRow = ({displayName, photoURL, score}) =>
    <Leader
      name={displayName}
      avatar={photoURL}
      score={score} />
  render () {
    return (
      <Leaderboard
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        listenerSet={this.props.listenerSet}
        openDrawer={this.props.openDrawer} />
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