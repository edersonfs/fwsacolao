import { Dimensions, StyleSheet } from 'react-native'

const { height, width } = Dimensions.get('window')

import { color, constant } from './common.style'

const button = StyleSheet.create({
  base: {
    marginBottom: constant.MARGIN,
    borderRadius: 5,
    width: 318,
    height: 40,
    minHeight: 40,
    flexGrow: 0
  },
  baseIcon: {
    marginVertical: constant.MARGIN,
    paddingHorizontal: constant.MARGIN * 1.5,
    borderRadius: 50,
    width: 225,
    height: 42,
    minHeight: 42
  },
  outline: {
    backgroundColor: color.WHITE
  },
  ghostText: {
    textTransform: 'uppercase',
    textDecorationLine: 'underline'
  },
  iconRight: {
    flexDirection: 'row-reverse'
  },
  green: {
    // color: '#000',
    backgroundColor: color.DARKGREEN
  },
  red: {
    // color: '#FFF',
    backgroundColor: color.RED
  },
  pink: {
    // color: '#FFF',
    backgroundColor: color.PINK
  }, 
  white: {
    backgroundColor: color.WHITE
  },
  small: {
    width: 120
  },
  large: {
    width: 250
  },
  underline: {
    textDecorationLine: 'underline'
  },
  blackText: {
    color: color.BLACK
  }
})

export default button
