import React, { useState, useEffect, useRef } from 'react'
import { BackHandler, Dimensions, FlatList, StyleSheet, TouchableOpacity, View, PermissionsAndroid } from 'react-native'
import { Icon, Text, Layout, Select, SelectItem, Radio, RadioGroup, Input } from '@ui-kitten/components'
import BaseLogged from '../Components/baseLogged.component'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import { useSelector, useDispatch } from 'react-redux';

import useGlobal from '../Store'

import { language } from '../Languages'
import { color, constant, font } from '../Styles/common.style'
import textStyle from '../Styles/text.style'

import * as Content from '../Constants/content.constant.js'
import * as Global from '../Constants/global.constant.js'
import SelectMultiple from '../Components/selectMultiple.component'
import * as Routes from '../Navigator/routes'
import * as ActionTypes from '../Actions/base/sacolao.actiontypes'

const { height, width } = Dimensions.get('window')

const HomeScreen = ({ handlers, itemIndex }) => {
  const { home } = Content.contentState
  const { listaDeFrutas,  } = Global.globalState
  const { button, label } = language
  const { base, titleBlack } = textStyle

  const [disabledButtonAdd, setDisabledButtonAdd] = useState(false)
  const [filePath, setFilePath] = useState('');

  const dispatch = useDispatch()
  const fruta = useSelector(state => state.fruta)
  // // // TODO: REMOVE LINE BELOW
  // const bloqueio = fruta

  const [codFruta, setCodFruta] = useState(fruta.codFruta)
  const [nomFruta, setNomFruta] = useState(fruta.nomFruta)
  const [imgFruta, setImgFruta] = useState(fruta.imgFruta)

  const opcaoNenhumaId = listaDeFrutas[0].id

  const [disabledButtonChooseTechniques, setDisabledButtonChooseTechniques] = useState(true)

  useEffect(() => {
    if (codFruta.length > 0) {
      setDisabledButtonAdd(false)
    } else {
      setDisabledButtonAdd(true)
    }
  }, [codFruta])

  useEffect(() => {
    const backAction = () => {
      handlers.confirmExit()
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPressHome', backAction)
    return () => backHandler.remove()
  }, [])

  const retornaListaDeFrutas = () => {
    return listaDeFrutas
  }

  const printPDF = async () => {
    let a = '<h1>Você escolheu as seguintes frutas:</h1>';

    for (let index = 0; index < imgFruta.length; index++) {
      a += '<h1>' + nomFruta[index]  + '</h1>'      
    }
    
    const results = await RNHTMLtoPDF.convert({
      // html: '<h1>Custom converted PDF Document</h1>',
      html: a,
      fileName: 'test',
      base64: true,
    })
 
    await RNPrint.print({ filePath: results.filePath })
  }

  return (
    <BaseLogged title={home.title}
      iconBack={false} iconBackAction={handlers.back}
      button={{
        text: button.checkout,
        disabled: disabledButtonAdd,
        onPress: printPDF
      }}>
      <View style={styles.container} id="divToPrint">
        <View>
          <SelectMultiple
            screenNameToComeBackTo={Routes.Home}
            title={home.listOfFruits}
            screenTitle={home.listOfFruits}
            buttonText={button.chooseFruits}
            noItemSelectedText={home.noFruitSelected}
            selectedIds={codFruta}
            setSelectedIdsFunc={setCodFruta}
            selectedDescriptions={nomFruta}
            setSelectedDescriptions={setNomFruta}
            selectedImgs={imgFruta}
            setSelectedImgs={setImgFruta}
            dataFunction={retornaListaDeFrutas}
            disabled={false}
            extraLarge={true}
            blankOptionId={opcaoNenhumaId}>
          </SelectMultiple>
          {/* <Text>{imgFruta.length}</Text> */}
        </View>
        <View style={styles.viewUnderline} />
      </View> 
    </BaseLogged>
  )
}

const styles = StyleSheet.create({
  titleSyncText: {
    color: color.ORANGE
  },
  containerDropDown: {
    marginBottom: 15
  },
  textButtonContinueEnabled: {
    color: color.WHITE,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  containerButtonContinue: {
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: color.PRIMARY,
    borderColor: color.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: constant.PADDING_HORIZONTAL / 2,
    width: width - 24,
    height: 40
  },
  container: {
    flex: 1
  },
  listItem: {
    marginTop: constant.MARGIN_VERTICAL,
    paddingVertical: constant.PADDING_HORIZONTAL,
    paddingHorizontal: constant.PADDING_HORIZONTAL,
    backgroundColor: color.WHITE,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: color.LIGHTGREEN
  },
  metaInfo: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10
  },
  textFlatList: {
    marginLeft: constant.MARGIN
  },
  questionContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10
  },
  textQuestion: {
    alignSelf: 'flex-start',
    color: color.PRIMARY,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
    fontFamily: 'Palanquin'
  },
  viewUnderline: {
    flex: 1,
    borderBottomColor: color.LIGHTGREEN,
    borderBottomWidth: 1,
    marginTop: 0,
    width: width,
    alignSelf: 'center'
  },
  textButtonEnabled: {
    color: color.PRIMARY,
    textTransform: 'uppercase'
  },
  textButtonDisabled: {
    color: color.WHITE,
    textTransform: 'uppercase'
  },
  containerButtonLarge: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: color.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 25,
    width: 250,
    height: 34
  },
  containerButtonLargeDisabled: {
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: color.LIGHTGRAY,
    borderColor: color.LIGHTGRAY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 25,
    width: 250,
    height: 34
  },
  text: {
    marginTop: 10
  },
  textBlue: {
    color: color.BLUE
  },
  textOrange: {
    color: color.ORANGE
  }
})

export default HomeScreen
