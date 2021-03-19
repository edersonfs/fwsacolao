import { StyleSheet } from 'react-native'

import { color, constant, font } from './common.style'

const text = StyleSheet.create({
  base: {
    marginVertical: constant.MARGIN_VERTICAL,
    fontFamily: font.REGULAR,
    textAlign: 'center',
    fontSize: font.MEDIUM
  },
  // baseWhiteFirstName: {
  //   color: color.WHITE,
  //   marginVertical: constant.MARGIN_VERTICAL,
  //   fontFamily: font.REGULAR,
  //   textAlign: 'center',
  //   fontSize: font.LARGE
  // },
  // baseWhite: {
  //   color: color.WHITE,
  //   marginVertical: constant.MARGIN_VERTICAL,
  //   fontFamily: font.REGULAR,
  //   textAlign: 'center',
  //   fontSize: font.MEDIUM
  // },
  // bold: {
  //   fontFamily: font.BOLD
  // },
  // title: {
  //   color: color.PRIMARY,
  //   fontFamily: font.BOLD
  // },
  // titleGray: {
  //   color: color.GRAY_DARK,
  //   fontFamily: font.BOLD
  // },
  // titleWhite: {
  //   color: color.WHITE,
  //   fontFamily: font.BOLD,
  //   marginVertical: constant.MARGIN_VERTICAL * 3,
  //   textAlign: 'center'
  // },
  titleBlack: {
    fontFamily: font.BOLD
  },
  // uppercase: {
  //   textTransform: 'uppercase'
  // }
})

export default text
