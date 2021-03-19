import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Button, Icon, Text } from '@ui-kitten/components'

import { language } from '../Languages'

import { color, constant, font } from '../Styles/common.style'
import mixins from '../Styles/mixins.style'

import textStyle from '../Styles/text.style'
import buttonStyle from '../Styles/button.style'

const ExternalCard = ({ children, button }) => {
  const { base, ghost, ghostText, underline, large } = buttonStyle
  const handleButton = () => {
    return button.type === 'ghost'
      ? (
      <TouchableOpacity
        activeOpacity={0.7}
        appearance="ghost"
        style={[
          base,
          ghost,
          styles.containerButton,
          button.disabled ? styles.disabled : styles.enabled
        ]}
        textStyle={ghostText}
        disabled={button.disabled}
        onPress={button.onPress()}
      >
        <Text style={[button.disabled ? styles.textButtonDisabled : styles.textButtonEnabled]}>
          {button.text}
        </Text>
      </TouchableOpacity>
        )
      : (
      <TouchableOpacity
        activeOpacity={0.7}
        appearance="filled"
        style={[base, styles.containerButton, button.disabled ? styles.disabled : styles.enabled]}
        disabled={button.disabled}
        onPress={button.onPress}
      >
        <Text style={[button.disabled ? styles.textButtonDisabled : styles.textButtonEnabled]}>
          {button.text}
        </Text>
      </TouchableOpacity>
        )
  }

  return (
    <View style={styles.card}>
      <View style={styles.content}>{children}</View>
      {button && handleButton()}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignSelf: 'center',
    flexGrow: 0,
    padding: constant.PADDING * 1.5,
    paddingTop: constant.PADDING * 2.5,
    marginVertical: 0,
    marginBottom: 15,
    marginHorizontal: -6, // verificar no ios
    borderRadius: 10,
    backgroundColor: color.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    ...mixins.SHADOW
  },
  containerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    alignSelf: 'stretch'
  },
  disabled: {
    backgroundColor: color.LIGHTGRAY,
    borderColor: color.LIGHTGRAY
  },
  enabled: {
    backgroundColor: color.PRIMARY
  },
  textButtonEnabled: {
    color: color.WHITE,
    textTransform: 'uppercase',
    fontFamily: 'Palanquin'
  },
  textButtonDisabled: {
    color: color.GRAY,
    textTransform: 'uppercase',
    fontFamily: 'Palanquin'
  }
})

export default ExternalCard
