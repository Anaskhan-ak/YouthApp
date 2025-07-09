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
import {requestNotificationPermission} from './src/helper';
import {ZegoUIKitPrebuiltCallInvitationService} from 'zego-uikit-prebuilt-call-rn';
import {ZegoCallInvitationDialog} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import ZegoUIKitPrebuiltCallService from './node_modules/@zegocloud/zego-uikit-prebuilt-call-rn/lib/module/index';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
const App = () => {
  ZegoUIKitPrebuiltCallService.useSystemCallingUI([ZIM, ZPNs]);

  const onUserLogin = async (userID, userName, props) => {
    return ZegoUIKitPrebuiltCallService.init(
      1017984930, // You can get it from ZEGOCLOUD's console
      'd623688f27b5f06360f2c164c2898e950a7fd95c8a296dbac0bd89e1e2be81bc', // You can get it from ZEGOCLOUD's console
      'user_1', // Current user's unique ID
      'Anas', // User name
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.mp3',
          outgoingCallFileName: 'zego_outgoing.mp3',
        },
        androidNotificationConfig: {
          channelID: 'ZegoUIKit',
          channelName: 'ZegoUIKit',
        },
      },
    );
  };
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
    getNotificationPermission();
    onUserLogin();
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
  }, []);
  const getNotificationPermission = async () => {
    const getNotificationPermission = await requestNotificationPermission();
  };
  return (
    <NavigationContainer linking={linking}>
      <ZegoCallInvitationDialog />
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
