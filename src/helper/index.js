import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { apiCall } from '../services/apiCall';

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
export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const usrInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(
      usrInfo?.data?.idToken || '',
    );
    const userCredential = await auth().signInWithCredential(googleCredential);

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

export const generateAudioWaveforms = async (audio) => {
    try {
      const formData = new FormData();
      formData.append('audio', audio);
      const audioMetaDataPayload = await apiCall?.generateWaveforms(formData);
      // console.log('audioMetaDataPayload', audioMetaDataPayload);
      return audioMetaDataPayload;
    } catch (error) {
      console.error('Error fetching audio metadata:', error);
    }
  };
