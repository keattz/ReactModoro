import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, fontSizes } from '~/styles'

SkipRest.propTypes = {
  onSkipRest: PropTypes.func.isRequired
}

export default function SkipRest (props) {
  return (
    <TouchableOpacity onPress={props.onSkipRest}>
      <Text style={styles.skipText}>
        {'SkipRest'}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  skipText: {
    color: colors.white,
    fontSize: fontSizes.primary,
    textAlign: 'center'
  }
})
