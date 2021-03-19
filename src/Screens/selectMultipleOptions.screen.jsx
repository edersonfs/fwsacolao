import React, { useState, useEffect, Fragment } from 'react'
import { BackHandler, Dimensions, FlatList, StyleSheet, TouchableOpacity, View, TouchableWithoutFeedback, SafeAreaView, Platform, Image } from 'react-native'
import filter from 'lodash.filter'
import { Icon, Text, Input, CheckBox, Button } from '@ui-kitten/components'
import { useSelector, useDispatch } from 'react-redux'
import useGlobal from '../Store'

import { language } from '../Languages'
import { color, constant, font } from '../Styles/common.style'
import textStyle from '../Styles/text.style'

const { height, width } = Dimensions.get('window')

const SelectMultipleOptionsScreen = ({ handlers, route }) => {
  const [state] = useGlobal()

  const dispatch = useDispatch()
  const { button, label } = language
  const { base, titleBlack } = textStyle

  const dataFunction = route.navigation.getParam('dataFunction')
  const API_ENDPOINT = dataFunction()
  const iconCloseAction = () => { handlers.onClose() }
  const iconSaveAction = () => { handlers.okClick(dispatch, selected, nameSelected, imgSelected) }
  const screenTitle = route.navigation.getParam('screenTitle')

  const opcaoNenhumaId = route.navigation.getParam('blankOptionId')

  const cloneArray = (arrayToBeCloned) => {
    return Array.isArray(arrayToBeCloned)
      ? arrayToBeCloned.map(c => c)
      : []
  }
  // flatlist
  const [data, setData] = useState([])
  const [selected, setSelected] = useState(cloneArray(route.navigation.getParam('selectedIds')))
  const [nameSelected, setNameSelected] = useState(cloneArray(route.navigation.getParam('selectedDescriptions')))
  const [imgSelected, setImgSelected] = useState(cloneArray(route.navigation.getParam('selectedImgs')))
  const [query, setQuery] = useState('')
  const [fullData, setFullData] = useState([])
  let imagem = ''

  const renderIcon = (props) => (
    <Icon {...props} name='search-outline'/>
  )

  useEffect(() => {
    setData(normalizarListaItens(API_ENDPOINT, selected))
    setFullData(API_ENDPOINT)
  }, [])

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.headerWrapperTop}>
            <View style={styles.headerWrapper}>
              <Text style={styles.headerText}>{screenTitle}</Text>
            </View>
            <View style={{ alignContent: 'flex-end', marginTop: 20, marginRight: 10 }}>
              <TouchableWithoutFeedback onPress={iconSaveAction}>
                <Icon name="save-outline" width={24} height={24} fill={color.WHITE} />
              </TouchableWithoutFeedback>
            </View>
            <View style={{ alignContent: 'flex-end', marginTop: 20, marginRight: 10 }}>
              <TouchableWithoutFeedback onPress={iconCloseAction}>
                <Icon name="close-outline" width={24} height={24} fill={color.WHITE} />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 90,
            backgroundColor: color.WHITE,
            padding: 10,
            margin: 0
          }}
        >
          <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Procurar</Text>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            // value={query}
            onChangeText={queryText => handleSearch(queryText)}
            placeholder=""
            style={{ backgroundColor: color.WHITE }}
            accessoryRight={renderIcon}
          />
        </View>
      </View>
    )
  }

  const handleSearch = async (text) => {
    const formattedQuery = text.toLowerCase()
    const filteredData = filter(fullData, user => {
      return contains(user, formattedQuery)
    })
    setData(normalizarListaItens(filteredData, selected))
    setQuery(text)
  }

  /// Método exemplo para gestão de estado do item selecionado
  const normalizarListaItens = (datalist, item) => {
    if (item.checked) {
      const index = selected.findIndex(h => {
        return h === item.id
      })
      selected.splice(index, 1)
      const indexName = nameSelected.findIndex(h => {
        return h === item.descricao
      })
      nameSelected.splice(indexName, 1)
      const indexImg = imgSelected.findIndex(h => {
        return h === item.img
      })
      imgSelected.splice(indexImg, 1)
    } else {
      if (item.id !== undefined && item.descricao !== undefined) {
        if (opcaoNenhumaId === item.id) {
          selected.splice(0, selected.length)
          nameSelected.splice(0, nameSelected.length)
          imgSelected.splice(0, imgSelected.length)
        } else {
          const opcaoNenhumaIndex = selected.findIndex(h => h === opcaoNenhumaId)
          if (opcaoNenhumaIndex > -1) {
            selected.splice(opcaoNenhumaIndex, 1)
            nameSelected.splice(opcaoNenhumaIndex, 1)
            imgSelected.splice(opcaoNenhumaIndex, 1)
          }
        }
        selected.push(item.id)
        nameSelected.push(item.descricao)
        imgSelected.push(item.img)
      }
    }

    setSelected(selected)
    setNameSelected(nameSelected)
    setImgSelected(imgSelected)

    const newData = datalist.map(d => {
      if (selected.filter((x) => { return x === d.id }).length === 1) {
        return { ...d, checked: true }
      }
      return { ...d, checked: false }
    })
    return newData
  }

  const contains = ({ descricao }, query) => {
    if (descricao.toLocaleLowerCase().includes(query)) {
      return true
    }
    return false
  }

  useEffect(() => {
    const backAction = () => {
      handlers.confirmExit()
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPressHome', backAction)
    return () => backHandler.remove()
  }, [])

  const renderFooter = () => {
    return (
      <View style={{ margin: 10, minHeight: 60 }}>
        <Button
          style={Platform.OS === 'ios' ? styles.confirmButtonIOS : styles.confirmButton}
          onPress={iconSaveAction}>
          {button.add}
        </Button>
      </View>
    )
  }

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: color.PRIMARY }} />
      <SafeAreaView style={styles.safeAreaView}>
        <View style={{ flex: 1, backgroundColor: color.WHITE }}>
          {renderHeader()}
          <FlatList
            removeClippedSubviews={false}
            // ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            data={data}
            extraData={true}
            keyExtractor={(item) => item.id !== undefined ? item.id.toString() : ''}
            style={{ }}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => { setData(normalizarListaItens(data, item)) }}>
                <View style={!item.checked ? styles.listItem : styles.listItemChecked}>
                  <CheckBox onChange={() => { setData(normalizarListaItens(data, item)) }} checked={item.checked} status='success'></CheckBox>
                  <View style={styles.metaInfo}>
                    {/* {var imagem = item.img)} */}
                    <Image source={item.img} style={{ height: 32, width: 32 }} />
                    <Text key={index !== undefined ? index.toString() : ''} style={styles.textFlatList}>{`${item.descricao}`}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: color.WHITE,
    minHeight: height
  },
  container: {
    flex: 1
  },
  listItem: {
    paddingVertical: 15,
    height: 64,
    backgroundColor: color.WHITE,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: color.LIGHTGREEN,
    paddingLeft: 10
  },
  listItemChecked: {
    paddingVertical: 15,
    height: 64,
    backgroundColor: '#EDF1F7',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: color.LIGHTGREEN,
    paddingLeft: 10
  },
  metaInfo: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10
  },
  textFlatList: {
    marginLeft: constant.MARGIN
  },
  content: {
    padding: constant.PADDING,
    flex: 1,
    alignContent: 'flex-start',
    flexGrow: 1
  },
  header: {
    width,
    height: 56,
    backgroundColor: color.PRIMARY
  },
  headerText: {
    color: color.WHITE,
    fontWeight: 'bold',
    paddingTop: 3,
    fontFamily: 'Palanquin'
  },
  headerWrapper: {
    flex: 1,
    alignSelf: 'flex-start',
    top: constant.PADDING * 1.3,
    marginLeft: constant.MARGIN,
    flexGrow: 1
  },
  headerWrapperTop: {
    width,
    flexDirection: 'row'
  },
  iconLeftWrapper: {
    left: 10,
    top: constant.PADDING * 1.3,
    alignSelf: 'flex-start',
    width: 36
  },
  iconLeftWrapperMenu: {
    left: 10,
    top: constant.PADDING * 1.2,
    marginRight: constant.MARGIN,
    alignSelf: 'flex-start',
    width: 36
  },
  scrollViewContainer: {
    marginTop: 56
  },
  containerButtonContinue: {
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: color.PRIMARY,
    borderColor: color.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
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
  },
  confirmButton: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: color.PRIMARY,
    borderColor: color.PRIMARY,
    paddingHorizontal: 10,
    width: width - 24,
    height: 40
  },
  confirmButtonIOS: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: color.PRIMARY,
    borderColor: color.PRIMARY,
    paddingHorizontal: 10,
    width: width - 24,
    height: 40,
    paddingTop: 5
  }
})

export default SelectMultipleOptionsScreen
