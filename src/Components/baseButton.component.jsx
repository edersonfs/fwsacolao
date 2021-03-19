import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Button } from '@ui-kitten/components'

// import { readDir } from 'react-native-fs'
import { color, constant } from '../Styles/common.style'
import buttonStyle from '../Styles/button.style'

const BaseButton = ({ buttonTop, buttonDown, buttonCenter, dialog, noBorderLeft }) => {
  const { base, green, pink, small } = buttonStyle

  return buttonTop && buttonDown
    ? (
    <View style={[styles.buttonsWrapper, dialog && styles.dialog]}>
      <Button
        id={buttonTop.id}
        appearance="outline"
        status="danger"
        style={[base, pink, small, Platform.OS === 'ios' ? styles.buttonTopIOS : styles.buttonTop]}
        onPress={buttonTop.onPress}
      >
        {buttonTop.text}
      </Button>
      <Button
        id={buttonDown.id}
        status="success"
        style={[base, green, small, Platform.OS === 'ios' ? styles.buttonDownIOS : styles.buttonDown]}
        onPress={buttonDown.onPress}
      >
        {buttonDown.text}
      </Button>
    </View>
      )
    : (
    <View style={[styles.buttonWrapper, dialog && styles.dialog]}>
      <Button
        id={buttonCenter.id}
        status="success"
        style={[base, green, small, Platform.OS === 'ios' ? styles.buttonDownIOS : styles.buttonDown]}
        onPress={buttonCenter.onPress}
      >
        {buttonCenter.text}
      </Button>
    </View>
      )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    margin: constant.MARGIN * 2
  },
  buttonsWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: constant.MARGIN_VERTICAL * 2
  },
  dialog: {
    margin: 0,
    marginVertical: 0,
    color: color.BLACK
  },
  buttonTop: {
    width: 296
  },
  buttonTopIOS: {
    paddingTop: 5,
    width: 296
  },
  buttonDown: {
    width: 296
  },
  buttonDownIOS: {
    paddingTop: 5,
    width: 296
  },
})

export default BaseButton
