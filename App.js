import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import StackNavigator from './src/navigation/StackNavigator';
import { store } from './src/redux/store';
import 'react-native-url-polyfill/auto';
import { Linking } from 'react-native';
import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { config } from './src/environment';


const App = () => {
  const linking = {
    prefixes: ['https://youthapp.io'],
    config: {
      screens: {
        Login: 'login', // matches path like /login
      },
    },
  };
useEffect(() => {
  Linking.getInitialURL().then((url) => {
    if (url) {
      console.log('Opened with URL:', url);
      // Optional: navigate using React Navigation
    }
  });

  const subscription = Linking.addEventListener('url', ({ url }) => {
    console.log('Received deep link while app is running:', url);
    // Optional: navigate here too
  });

  return () => subscription.remove();
}, []);
GoogleSignin.configure({
  webClientId: config?.GOOGLE_SIGNIN_KEY, 
  iosClientId:config?.iosClientId,
  offlineAccess: true,
});
  return (
    <NavigationContainer linking={linking}>
      <Provider store={store}>
      <StackNavigator />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
