import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import StackNavigator from './src/navigation/StackNavigator';
import {store} from './src/redux/store';
import 'react-native-url-polyfill/auto';
import {Linking} from 'react-native';
import {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {config} from './src/environment';
import Toast from 'react-native-toast-message';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const App = () => {
  const linking = {
    prefixes: ['https://youthapp.io'],
    config: {
      screens: {
        Login: 'SignUp', // matches path like /login
      },
    },
  };
  useEffect(() => {
    Linking.getInitialURL().then(url => {
      if (url) {
        console.log('Opened with URL:', url);
        // Optional: navigate using React Navigation
      }
    });

    const subscription = Linking.addEventListener('url', ({url}) => {
      console.log('Received deep link while app is running:', url);
      // Optional: navigate here too
    });

    return () => subscription.remove();
  }, []);
  GoogleSignin.configure({
    webClientId: config?.GOOGLE_SIGNIN_KEY,
    iosClientId: config?.iosClientId,
    offlineAccess: true,
  });
  useEffect(() => {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
  }, []);
  return (
    <NavigationContainer linking={linking}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <BottomSheetModalProvider>
            <StackNavigator />
            <Toast />
          </BottomSheetModalProvider>
        </Provider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default App;
