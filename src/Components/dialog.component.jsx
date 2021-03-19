import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import Dialog from 'react-native-dialog'
import useGlobal from '../Store'
import { color, constant } from '../Styles/common.style'
import textStyle from '../Styles/text.style'
import BaseButton from './baseButton.component'

const { height, width } = Dimensions.get('window')

const RNDialog = () => {
  const [state, actions] = useGlobal()
  const {
    icon,
    iconColor,
    title,
    message,
    labelCancel = '',
    labelConfirm,
    onClose = null,
    onConfirm = null,
    visible,
    countSync = '',
    countUnsync = ''
  } = state.dialog
  const { base: baseText, title: titleText } = textStyle

  return (
    <View>
      <Dialog.Container
        useNativeDriver={true}
        contentStyle={styles.dialog}
        headerStyle={styles.header}
        visible={visible}
        animationOut="slideOutDown"
      >
        {icon && icon != null && icon !== '' ? (<Icon name={icon} width={56} height={56} fill={iconColor} />) : (<></>)}
        {title && title != null && title !== '' ? (<Text category="h6" style={[titleText, styles.title]}>{title}</Text>) : (<></>)}
        <View style={styles.lineBottomView}>
          <Text style={[baseText, styles.text]}>{message}</Text>
          {countSync && countSync !== '' && countSync > 0
            ? (
            <Text style={[baseText, styles.textGray]}>Anestesias sincronizadas: {countSync}</Text>
              )
            : (<></>)}
          {countUnsync && countUnsync !== '' && countUnsync > 0
            ? (
            <View style={{ marginTop: -18 }}>
              <Text style={[baseText, styles.textGray]}>Não sincronizadas: {countUnsync}</Text>
            </View>
              )
            : (<></>)}
        </View>
        {labelCancel && labelCancel != null && labelCancel !== ''
          ? (
          <BaseButton
            dialog
            buttonTop={{
              text: labelConfirm,
              onPress: () => {
                onConfirm && onConfirm()
                actions.clearDialog()
              }
            }}
            buttonDown={{
              text: labelCancel,
              onPress: () => {
                onClose && onClose()
                actions.clearDialog()
              }
            }}
          />
            )
          : (
          <BaseButton
            dialog
            buttonCenter={{
              text: labelConfirm,
              onPress: () => {
                onConfirm && onConfirm()
                actions.clearDialog()
              }
            }}
          />
            )}
      </Dialog.Container>
    </View>
  )
}

const styles = StyleSheet.create({
  dialog: {
    width: width - constant.PADDING * 5,
    paddingTop: constant.PADDING,
    paddingRight: constant.PADDING,
    paddingBottom: 0,
    paddingLeft: constant.PADDING,
    backgroundColor: color.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  header: {
    margin: 5
  },
  title: {
    marginVertical: constant.MARGIN
  },
  lineBottomView: {
    display: 'flex',
    alignSelf: 'stretch',
    marginHorizontal: -15,
    paddingHorizontal: 15,
    paddingBottom: constant.MARGIN
  },
  text: {
    color: color.DARKBLUE,
    fontWeight: '600'
  },
  textGray: {
    color: color.GRAY,
    fontWeight: '600'
  },
  textBold: {
    color: color.GRAY_DARK,
    fontWeight: 'bold'
  }
})

export default RNDialog
