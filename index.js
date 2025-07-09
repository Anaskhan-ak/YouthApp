/**
 * @format
 */

import {AppRegistry,Text,TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Disable font scaling globally
if (Text.defaultProps == null) Text.defaultProps = {};
if (TextInput.defaultProps == null) TextInput.defaultProps = {};

Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;
AppRegistry.registerComponent(appName, () => App);
