import React, { useState, Fragment } from 'react'
import {
  Dimensions,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon, Text } from '@ui-kitten/components'
import useGlobal from '../Store'
import { language } from '../Languages'
import { color, constant } from '../Styles/common.style'
import textStyle from '../Styles/text.style'
import Dialog from './dialog.component'
import SpinnerOverlay from './spinnerOverlay.component'
import * as Routes from '../Navigator/routes'

const { width, height } = Dimensions.get('window')

const BaseLogged = ({
  title, children, iconMenu = false, iconBack = false, iconBackAction, iconSave = false, iconSaveAction,
  iconClose = false, iconCloseAction, button,
  step = false, stepNumber, titleStep, status, stepAction
}) => {
  const [state, actions] = useGlobal()
  const { navigate } = useNavigation()
  const { sideMenu } = state
  const { label } = language
  const { base, baseWhite, baseWhiteFirstName, bold } = textStyle

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: color.PRIMARY }} />
      <SafeAreaView style={Platform.OS === 'ios' ? styles.safeAreaViewIOS : styles.safeAreaView}>
        <View style={styles.header}>
          <View style={styles.headerWrapperTop}>              
            <View style={styles.headerWrapper}>
              <Text style={styles.headerText}>{title}</Text>
            </View>            
          </View>
        </View>
        <KeyboardAwareScrollView style={styles.scrollViewContainer}>
          <View style={Platform.OS === 'ios' ? styles.contenWrapperIOS : styles.contenWrapper}>
            <View style={styles.content}>
              <View style={styles.children}>{children}</View>
            </View>
            {button
              ? (
              <>
                <View style={styles.viewUnderline} />
                <View style={{ justifyContent: 'flex-end', backgroundColor: color.WHITE, alignSelf: 'center', marginBottom: 0 }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    appearance="filled"
                    disabled={button.disabled}
                    style={[base, button.disabled ? styles.containerButtonContinueDisabled : styles.containerButtonContinue]}
                    onPress={button.onPress}
                  >
                    <Text style={[styles.textButtonContinueEnabled]}>
                      {button.text}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
                )
              : (
              <></>
                )
            }
          </View>
        </KeyboardAwareScrollView>
        {/* <SideMenu /> */}
        {/* <Dialog /> */}
        <SpinnerOverlay />
      </SafeAreaView>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: color.WHITE
  },
  safeAreaViewIOS: {
    flex: 1,
    backgroundColor: color.WHITE,
    minHeight: height
  },
  header: {
    // position: 'absolute',
    // flex: 1,
    width,
    height: 56,
    backgroundColor: color.PRIMARY
  },
  headerWrapperTop: {
    // flex: 1,
    // height: 56,
    width,
    flexDirection: 'row'
  },
  iconLeftWrapperMenu: {
    // flex: 1,
    left: 10,
    top: constant.PADDING * 1.2,
    marginRight: constant.MARGIN,
    alignContent: 'flex-start',
    width: 36
  },
  iconLeftWrapper: {
    // flex: 1,
    left: 10,
    top: constant.PADDING * 1.3,
    alignSelf: 'flex-start',
    width: 36
  },
  headerWrapper: {
    // flex: 1,
    alignSelf: 'flex-start',
    top: constant.PADDING * 1.3,
    marginLeft: constant.MARGIN,
    flexGrow: 1
  },
  headerText: {
    color: color.WHITE,
    fontWeight: 'bold',
    paddingTop: 3,
    fontFamily: 'Palanquin'
  },
  scrollViewContainer: {
    // flex: 1
    // minHeight: height - 86
    // marginTop: 56
  },
  contenWrapper: {
    // display: 'flex',
    // flex: 1,
    flexDirection: 'column',
    backgroundColor: color.WHITE,
    minHeight: height - 56 // 86 // 56,
    // display: 'flex'
  },
  contenWrapperIOS: {
    flexDirection: 'column',
    backgroundColor: color.WHITE,
    minHeight: height - 106 // 86 // 56
  },
  children: {
    // flex: 1,
    // justifyContent: 'flex-start',
    // minHeight: height - 76 // 86 // 56,
  },
  content: {
    padding: constant.PADDING,
    // flex: 1,
    alignContent: 'flex-start',
    // flexGrow: 1
  },
  containerButtonContinue: {
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: color.PRIMARY,
    borderColor: color.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 30,
    width: width - 24,
    height: 40
  },
  containerButtonContinueDisabled: {
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: color.LIGHTGRAY,
    borderColor: color.LIGHTGRAY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 30,
    width: width - 24,
    height: 40
  },
  textButtonContinueEnabled: {
    color: color.WHITE,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'Palanquin'
  },
  viewUnderline: {
    flex: 1,
    borderBottomColor: color.LIGHTGREEN,
    borderBottomWidth: 1,
    marginTop: 0,
    width: width,
    alignSelf: 'center'
  }
})

export default BaseLogged
