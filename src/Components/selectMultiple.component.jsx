import React from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { Text } from '@ui-kitten/components'
import { Dimensions, View, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import * as Routes from '../Navigator/routes'
import { color } from '../Styles/common.style'
import textStyle from '../Styles/text.style'

const { width, height } = Dimensions.get('window')

const SelectMultiple = ({
  screenNameToComeBackTo,
  actionTypeStep = '',
  title,
  screenTitle,
  buttonText,
  noItemSelectedText,
  arrayIdPropertyName = '',
  arrayDescriptionPropertyName = '',
  selectedIds,
  selectedDescriptions,
  selectedImgs,
  dataFunction,
  blankOptionId = 0,
  disabled = false,
  setSelectedIdsFunc,
  setSelectedDescriptions,
  setSelectedImgs,
  extraLarge = false
}) => {
  const { base } = textStyle
  const { navigate } = useNavigation()

  const goToSelectMultipleScreen = () => {
    navigate(Routes.SelectMultipleOptions, {
      screenNameToComeBackTo: screenNameToComeBackTo,
      actionTypeStep: actionTypeStep,
      screenTitle: screenTitle,
      arrayIdPropertyName: arrayIdPropertyName,
      arrayDescriptionPropertyName: arrayDescriptionPropertyName,
      selectedIds: selectedIds,
      selectedDescriptions: selectedDescriptions,
      selectedImgs: selectedImgs,
      dataFunction: dataFunction,
      blankOptionId: blankOptionId,
      setSelectedIdsFunc: setSelectedIdsFunc,
      setSelectedDescriptions: setSelectedDescriptions,
      setSelectedImgs: setSelectedImgs,
    })
  }

  return (
    <View>
      <View style={styles.questionContainer}>
        <Text style={styles.textQuestion}>{title}</Text>
      </View>
      <View style={[styles.questionContainer, { flexDirection: 'column' }]}>
        {selectedDescriptions && selectedDescriptions.length > 0
          ? (selectedDescriptions.map((x, index) => (
            <View style={{ display: 'flex', flexDirection:'row' }}>
                <Image source={selectedImgs[index]} style={{ height: 32, width: 32, marginRight: 10 }} />
                <Text key={selectedIds[index] !== undefined ? selectedIds[index].toString() : ''} style={[styles.textBlue, { marginTop: 0 }]}>- { x }</Text>
            </View>
            )))
          : (
                <Text style={[styles.textOrange, { marginTop: 0 }]}>{noItemSelectedText}</Text>
            )
        }
      </View>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          appearance="filled"
          disabled={disabled}
          style={[base, disabled ? styles.containerButtonLargeDisabled : styles.containerButtonLarge, extraLarge === true ? { width: 300 } : null]}
          onPress={() => { goToSelectMultipleScreen() }}
        >
          <Text style={[disabled ? styles.textButtonDisabled : styles.textButtonEnabled]}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  textButtonDisabled: {
    color: color.LIGHTGRAY,
    textTransform: 'uppercase'
  },
  textButtonEnabled: {
    color: color.PRIMARY,
    textTransform: 'uppercase'
  },
  containerButtonLargeDisabled: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: color.LIGHTGRAY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 25,
    width: 250,
    height: 34
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
  textBlue: {
    color: color.BLUE
  },
  textOrange: {
    color: color.ORANGE
  }
})

export default SelectMultiple
