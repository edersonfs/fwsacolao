import React from 'react'
import { BackHandler } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import useGlobal from '../Store'
import { language } from '../Languages'
import SelectMultipleOptionsScreen from '../Screens/selectMultipleOptions.screen'
import * as Routes from '../Navigator/routes'
// import * as ActionTypes from '../Actions/base/anestesia.actiontypes'
// import { createReduxAction } from '../Actions/base/util.action'
import * as Content from '../Constants/content.constant.js'

const SelectMultipleOptions = (route) => {
  const [ , actions] = useGlobal()
  const { dialog } = Content.contentState
  const { navigate } = useNavigation()
  const { button } = language

  const screenNameToComeBackTo = route.navigation.getParam('screenNameToComeBackTo')
  const arrayIdPropertyName = route.navigation.getParam('arrayIdPropertyName')
  const arrayDescriptionPropertyName = route.navigation.getParam('arrayDescriptionPropertyName')
  const actionTypeStep = route.navigation.getParam('actionTypeStep')
  const setSelectedIdsFunc = route.navigation.getParam('setSelectedIdsFunc')
  const setSelectedDescriptions = route.navigation.getParam('setSelectedDescriptions')
  const setSelectedImgs = route.navigation.getParam('setSelectedImgs')
  const selectedIds = route.navigation.getParam('selectedIds')
  const selectedDescriptions = route.navigation.getParam('selectedDescriptions')
  const selectedImgs = route.navigation.getParam('selectedImgs')

  const onClose = () => {
    navigate(screenNameToComeBackTo)
  }

  const okClick = async (dispatch, selected, nameSelected, imgSelected) => {   
    setSelectedIdsFunc(selected)
    setSelectedDescriptions(nameSelected)
    setSelectedImgs(imgSelected)
 
    navigate(screenNameToComeBackTo)
  }

  const confirmExit = () => {
    actions.setDialog(
      { ...dialog.home, labelCancel: button.cancel, labelConfirm: button.confirm },
      null,
      () => {
        BackHandler.exitApp()
      }
    )
    return true
  }

  const handlers = { onClose, okClick, confirmExit }

  return <SelectMultipleOptionsScreen handlers={handlers} route={route} />
}

SelectMultipleOptions.navigationOptions = {
  headerShown: false
}

export default SelectMultipleOptions
