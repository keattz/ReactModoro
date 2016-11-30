import React, { PropTypes } from 'react'
import { Platform } from 'react-native'
import NavigationBar from 'react-native-navbar'
import { colors } from '~/styles'

ReactModoroNavbar.propTypes = {
  leftButton: PropTypes.element,
  rightButton: PropTypes.element,
  title: PropTypes.string.isRequired
}

export default function ReactModoroNavbar (props) {
  let optionalAttrs = {}
  props.leftButton && (optionalAttrs.leftButton = React.cloneElement(props.leftButton, {
    style: {marginLeft: 10, justifyContent: 'center'}
  }))
  props.rightButton && (optionalAttrs.rightButton = React.cloneElement(props.rightButton, {
    style: {marginRight: 10, justifyContent: 'center'}
  }))
  return (
    <NavigationBar
      {...optionalAttrs}
      stle={Platform.OS === 'android' ? {marginTop: 8, marginBottom: 8} : null}
      tintColor={colors.tabPrimary}
      title={{title: props.title}} />
  )
}
