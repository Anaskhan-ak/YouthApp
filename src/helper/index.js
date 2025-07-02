import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import { apiCall } from "services/apiCall";
import RNFS from 'react-native-fs';

export const emailValidation = value => {
  const trimmedValue = value.trim();
  return (
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmedValue) ||
    'Invalid email address'
  );
};
export const getFirebaseToken = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    const token = await messaging().getToken();
    return token;
  };
  export const googleSignIn =async()=> {
     try {
         await GoogleSignin.hasPlayServices();
         const usrInfo = await GoogleSignin.signIn();
         const googleCredential = auth.GoogleAuthProvider.credential(
           usrInfo?.data?.idToken || '',
         );
         const userCredential = await auth().signInWithCredential(
           googleCredential,
         );
   
         return await userCredential.user.getIdToken();
       } catch (error) {
         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
           // user cancelled the login flow
         } else if (error.code === statusCodes.IN_PROGRESS) {
           // operation (e.g. sign in) is in progress already
         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
           // play services not available or outdated
         } else {
           // some other error happened
         }
       }
  };
  export const getDataLocally = async () => {
    try {
      const result = await AsyncStorage.getItem('UserLocalData');
      return result != null ? JSON.parse(result) : null;
    } catch (e) {
      // error reading value
    }
  };

  export const generateAudioWaveforms = async (audio) => {
  try {
    if (!audio || !audio.uri) {
      console.warn('Invalid audio passed to generateAudioWaveforms');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 50)); // prevent premature API call

    const formData = new FormData();
    formData.append('audio', audio);

    const audioMetaDataPayload = await apiCall?.generateWaveforms(formData);
    return audioMetaDataPayload;
  } catch (error) {
    console.error('Error fetching audio metadata:', error);
  }
};
export const getFileNameWithExtension = (uri, type) => {
  const extensionMap = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'video/mp4': 'mp4',
    'audio/wav': 'wav',
    'audio/mpeg': 'mp3',
    'application/pdf': 'pdf',
    // Add more types as needed
  };

  const ext = extensionMap[type] || '';
  const filename = uri?.split('/').pop()?.split('?')[0] || `file_${Date.now()}`;
  const hasExtension = /\.[^/.]+$/.test(filename);

  return hasExtension ? filename : `${filename}.${ext}`;
};
 export const getRealPathFromURI = async uri => {
    if (uri.startsWith('content://')) {
      try {
        if (Platform.OS === 'ios') {
          const realPath = await RNFS.copyAssetsFileIOS(
            uri,
            RNFS.CachesDirectoryPath,
            0,
            0,
          ); // Only for iOS
          return realPath;
        } else {
          return uri;
        }
      } catch (err) {
        console.error('Error resolving content URI:', err);
        return null;
      }
    }
    return uri; // Return the uri as-is for file URLs
};
export const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      // iOS permission request
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.warn('Notification permission not granted on iOS');
        return null;
      }
    }

    if (Platform.OS === 'android') {
      // Android 13+ needs runtime POST_NOTIFICATIONS permission
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('Notification permission not granted on Android');
        return null;
      }
    }
  }catch(e){

  }
}
