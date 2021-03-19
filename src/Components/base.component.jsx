import React from 'react'
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Platform
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { constant, color } from '../Styles/common.style'

import Dialog from './dialog.component'
import SpinnerOverlay from './spinnerOverlay.component'

const { height, width } = Dimensions.get('window')

const Base = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        keyboardOpeningTime={0}
        extraHeight={Platform.select({ android: 0 })}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          {children}
        </View>
      </KeyboardAwareScrollView>
      {/* <Dialog />
      <SpinnerOverlay /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    // display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: color.PRIMARY,
    height,
    width,
    padding: 0,
    margin: 0
  },
  scrollView: {
    flexGrow: 1
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: constant.PADDING * 3,
    marginTop: constant.MARGIN * 2
  }
})

export default Base
