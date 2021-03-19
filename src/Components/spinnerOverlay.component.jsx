import React from 'react'
import { Dimensions, View, StyleSheet } from 'react-native'
import { Spinner } from '@ui-kitten/components'

import useGlobal from '../Store'

const SpinnerOverlay = () => {
  const [state] = useGlobal()
  return state.loading ? (
    <View style={styles.view}>
      <Spinner status="primary" size="large" />
    </View>
  ) : null
}

export const LocalSpinnerOverlay = () => {
  return( <View style={styles.view}>
      <Spinner status="primary" size="large" />
    </View> )
}

const styles = StyleSheet.create({
  view: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    opacity: 0.8,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 1000
  }
})

export default SpinnerOverlay
