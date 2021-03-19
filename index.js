import * as React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';

const Main = () => <App />;

AppRegistry.registerComponent(appName, () => Main);
