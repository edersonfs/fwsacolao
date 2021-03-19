import React, { useEffect, useState } from 'react'
import { TouchableWithoutFeedback, Dimensions, StyleSheet } from 'react-native'
import { Text, Icon, Input } from '@ui-kitten/components'
import Base from '../Components/base.component'
import ExternalCard from '../Components/externalCard.component'

import useGlobal from '../Store'
// import { useSelector, useDispatch } from 'react-redux'
import { language } from '../Languages'
import { color } from '../Styles/common.style'

import { validateMinLength } from '../Utils/validator.util'

import SacolaoIcon from '../Assets/Images/sacolao.svg'

import * as Content from '../Constants/content.constant.js'
// import * as Global from '../Constants/global.constant.js'

const { height, width } = Dimensions.get('window')

const LoginScreen = ({ handlers }) => {
  const [state] = useGlobal()
  // const { content } = state
  const { login } = Content.contentState
  const { button, label } = language
  const [username, setUsername] = useState('') //  teste TODO: tirar o valor fixo
  const [password, setPassword] = useState('') // sba90000 TODO: tirar o valor fixo
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [disabled, setDisabled] = useState(true)
  // const dispatch = useDispatch()

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry)
  }

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} fill={color.PRIMARY} />
    </TouchableWithoutFeedback>
  )

  useEffect(() => {
    const setLoginButtonDisable = !((username !== '' && username !== null) &&
                                   (password !== '' && password !== null))
    setDisabled(setLoginButtonDisable)
  }, [username, password])

  return (
    <Base>
      <SacolaoIcon height={150} width={150} style={{ marginBottom: 25 }} />
      <ExternalCard
        button={{
          type: 'filled',
          text: button.enter,
          disabled,
          onPress: () => handlers.login(username, password)
        }}>
        <Text style={styles.text}>{login.user}</Text>
        <Input autoCapitalize='none' placeholder={login.user} style={styles.text} value={username} onChangeText={setUsername} />
        <Text style={styles.text}>{login.password}</Text>
        <Input
          value={password}
          placeholder={login.password}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={setPassword}
          style={styles.text}
        />
      </ExternalCard>
    </Base>
  )
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 5,
    fontFamily: 'Palanquin'
  }
})

export default LoginScreen
