import React from 'react';
import { BackHandler, Platform } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
// import RNExitApp from 'react-native-exit-app';

import useGlobal from '../Store';
import { language } from '../Languages';
import LoginUserScreen from '../Screens/login.screen';

const LoginUser = () => {
  const [state, actions] = useGlobal();
  const { dialog } = state.content;
  const navigation = useNavigation();
  const { navigate } = navigation;
  const { button } = language;

  const login = (username, password) => actions.login(navigate, username, password);
  
  const handlers = { login };
  
  return <LoginUserScreen handlers={handlers} />;
};

LoginUser.navigationOptions = {
  header: null,
};

export default LoginUser;
