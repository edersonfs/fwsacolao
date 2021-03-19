import { StyleSheet } from 'react-native'

import { color } from './common.style'

const mixins = StyleSheet.create({
  SHADOW: {
    shadowColor: color.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
})

export default mixins
