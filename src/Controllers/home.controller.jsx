import React from 'react'
import { BackHandler } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import useGlobal from '../Store'
import { language } from '../Languages'
import HomeScreen from '../Screens/home.screen'
import * as Routes from '../Navigator/routes'

import * as Content from '../Constants/content.constant.js'

const Home = (route) => {
  const [state, actions] = useGlobal()
  const { dialog } = Content.contentState
  const { navigate } = useNavigation()
  const { button } = language

  const back = () => {
    navigate(Routes.Bloqueio)
  }

  const continueClick = async (dispatch, anestesiaDadosGerais, bloqueio, itemIndex) => {
    const [sucesso, retorno] = await actions.salvarBloqueio(anestesiaDadosGerais, bloqueio, itemIndex)
    if (sucesso) {
      // Salvar Dados Gerais.
      dispatch(actions.inserirDadosGeraisAnestesia({
        step8LocksStatus: 'Ok'
      }))

      navigate(Routes.Bloqueio)
    } else {
      actions.setDialog(
        { ...dialog.error.generic, labelCancel: null, labelConfirm: button.ok },
        null,
        () => {}
      )
      return true
    }
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

  const handlers = { back, continueClick, confirmExit }
  const itemIndex = route.navigation.getParam('itemIndex')

  return <HomeScreen handlers={handlers} itemIndex={itemIndex} />
}

Home.navigationOptions = {
  headerShown: false
}

export default Home
