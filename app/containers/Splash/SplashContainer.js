import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Splash } from '~/components'
import { handleAuthWithFirebase } from '~/redux/modules/authentication'

class SplashContainer extends Component {
  handleLoginFinished = (error, result) => {
    if (error) {
      console.warn('Error in handleLoginFinished:', error)
    } else if (result.isCancelled === true) {
      console.log('Auth cancelled')
    } else {
      this.props.dispatch(handleAuthWithFirebase())
    }
  }
  render () {
    return (
      <Splash onLoginFinished={this.handleLoginFinished} />
    )
  }
}

export default connect()(SplashContainer)