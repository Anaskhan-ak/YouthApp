import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ImageBackground,
  Keyboard,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../assets/images';
import {YouthIcon} from '../../assets/images/svgs';
import AuthError from '../../components/authErrorPopup';
import {PrimaryButton} from '../../components/buttons/PrimaryButton';
import {SocialButton} from '../../components/buttons/SocialButton';
import AuthInput from '../../components/inputs/authInput';
import GradientText from '../../components/text/GradientText';
import {height, width} from '../../constant';
import {getFirebaseToken, googleSignIn} from '../../helper';
import {GreenCheckMark} from '../../assets/images/svgs';
import {apiCall} from '../../services/apiCall';
import {colors} from '../../utils/colors';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLogin] = useState(false);
  const [showError, setShowError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async data => {
    const fb_token = await getFirebaseToken();
    const obj = {
      login_user: data?.email,
      password: data?.password,
      fcm_token: fb_token,
    };
    try {
      setLoading(true);
      let result = await apiCall?.Login(obj);
      await AsyncStorage.setItem('token', result?.access_token);
      if (rememberMe) {
        await AsyncStorage.setItem('rememberMe', "rememberMe");
      }

      const jsonValue = JSON.stringify(result?.data);
      await AsyncStorage.setItem('UserLocalData', jsonValue);
      navigation?.navigate('LandingWidget');
    } catch (e) {
      console.log('e', e);
      setShowError(true);
      setErrorMessage({
        title: 'Sign Up Error',
        message: Array.isArray(e) ? e[0]?.message : e,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const handleSignUp = () => {
    navigation?.navigate('SignUp');
  };
  const googleLogin = async () => {
    try {
      const googleAuthToken = await googleSignIn();
      const obj = {
        firebaseToken: googleAuthToken,
      };
      setGoogleLogin(true);
      let result = await apiCall?.SignUpWithGoogle(obj);
      navigation?.navigate('LandingWidget');
    } catch (e) {
      console.log('e', e);
      setShowError(true);
      setErrorMessage({
        title: 'Sign Up Error',
        message: Array.isArray(e) ? e[0]?.message : e,
      });
    } finally {
      setGoogleLogin(false);
    }
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage has been cleared!');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};
useEffect(()=>{
clearAsyncStorage()
},[])
  return (
    <SafeAreaView style={styles?.container}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <View style={[styles?.imageView, {flex: !isKeyboardVisible ? 1.2 : 0.3}]}>
        <ImageBackground
          borderBottomLeftRadius={width * 0.1}
          borderBottomRightRadius={width * 0.1}
          style={styles.image}
          source={images?.login}>
          {showError && (
            <View style={styles?.authView}>
              <AuthError
                title={errorMessage?.title}
                message={errorMessage?.message}
                setShowError={setShowError}
                style={{
                  marginTop:
                    Platform?.OS === 'ios' ? height * 0.38 : height * 0.32,
                }}
              />
            </View>
          )}
        </ImageBackground>
      </View>
      <View style={styles?.contentView}>
        <View style={styles?.headingWithIconView}>
          <Text style={styles?.heading}>Login to your </Text>
          <YouthIcon width={width * 0.2} />
          <Text style={styles?.heading}> Account</Text>
        </View>
        <Text style={styles?.title}>Be Connected to the world now!</Text>
        <View style={{marginTop: 10}} />
        <Controller
          control={control}
          rules={{
            required: 'email is required',
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <AuthInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors?.email}
              placeholder={'Email or Phone number'}
            />
          )}
          name="email"
        />
        <View style={{marginTop: 10}} />
        <Controller
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
            pattern: {
              value: /^(?=.*[A-Z])/,
              message: 'Password must contain at least one uppercase letter',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <AuthInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors?.password}
              placeholder={'password'}
              secureTextEntry
            />
          )}
          name="password"
        />

        <View style={styles.bottomContentView}>
          <TouchableOpacity
            onPress={handleRememberMe}
            style={styles?.rememberMeContainer}>
            {/* <LinearGradient
              style={styles?.rememberMe}
              colors={[colors?.RGB1, colors?.RGB2]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}> */}
            {/* {!rememberMe && (
                // <View style={styles?.checkRememberMe} />
                <GreenCheckMark />
              )} */}
            {rememberMe ? (
              <GreenCheckMark width={18} height={18} />
            ) : (
              <View style={styles?.unSelect} />
            )}
            {/* </LinearGradient> */}
            <Text style={[styles?.content, {left: 4}]}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation?.navigate('ForgetPassword')}>
            <GradientText style={styles.gradientText}>
              {' '}
              Forget your account details?
            </GradientText>
          </TouchableOpacity>
        </View>

        <PrimaryButton
          isLoading={loading}
          onPress={handleSubmit(onSubmit)}
          title="Sign In"
        />
        <SocialButton
          isLoading={googleLoading}
          onPress={googleLogin}
          type={'google'}
          title="Continue with Google"
        />
        {Platform?.OS === 'ios' && (
          <SocialButton type={'apple'} title="Continue with Apple" />
        )}
        <View
          style={[
            styles.bottomContentView,
            {marginTop: height * 0.01, alignSelf: 'center'},
          ]}>
          <Text style={styles?.content}>Don’t have an account?</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <GradientText style={styles.gradientText}> Sign Up</GradientText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
