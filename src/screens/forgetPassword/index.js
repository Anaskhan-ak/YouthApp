import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ImageBackground,
  Keyboard,
  Platform,
  StatusBar,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { YouthIcon } from '../../assets/images/svgs';
import AuthError from '../../components/authErrorPopup';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { SocialButton } from '../../components/buttons/SocialButton';
import AuthInput from '../../components/inputs/AuthInput';
import OtpInput from '../../components/inputs/otp';
import { height, width } from '../../constant';
import { styles } from './styles';

const forgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async data => {
    if(step==0){
    setStep(1)
    }else if(step==1){
      setStep(2)
    }else{
      navigation?.navigate('OtpVerification')
    }
    // const fb_token = await getFirebaseToken();
    // const obj = {
    //   login_user: data?.email,
    //   password: data?.password,
    //   fcm_token: fb_token,
    // };
    // try {
    //   setLoading(true);
    //   let result = await apiCall?.Login(obj);
    //   navigation?.navigate('LandingWidget');
    // } catch (e) {
    //   console.log('e', e);
    //   setShowError(true);
    //   setErrorMessage({
    //     title: 'Sign Up Error',
    //     message: Array.isArray(e) ? e[0]?.message : e,
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };
  const handleLogin = () => {
    navigation?.navigate('Login');
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
        <Text style={styles?.heading}>
          With <YouthIcon width={width * 0.18} /> You got covered!
        </Text>
        <Text style={styles?.title}>
          Give us your account email or Phone number!
        </Text>
        <View style={{marginTop: 10}} />
        {step == 0 || step == 1 ? (
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
                disable={step === 1 ? false : true}
                placeholder={'Email or Phone number'}
              />
            )}
            name="email"
          />
        ) : (
          <>
            <Controller
              control={control}
              rules={{
                required: 'Password is required',
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                  message:
                    'Password must be at least 8 characters long, include one uppercase letter, and one special character',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <AuthInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder={'Password'}
                  secureTextEntry
                  error={errors?.password?.message}
                />
              )}
              name="password"
            />
            <View style={{marginTop: 10}} />
            <Controller
              control={control}
              rules={{
                required: 'confirm password is required',
                validate: value =>
                  value === watch('password') || 'Passwords do not match',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <AuthInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder={'Confirm Password'}
                  secureTextEntry
                  error={errors?.confirmPassword}
                />
              )}
              name="confirmPassword"
            />
          </>
        )}
        {step === 1 && <OtpInput setOtp={setOtp} />}
        <View style={styles?.bottomContentView}>
          <PrimaryButton
            isLoading={loading}
            onPress={handleSubmit(onSubmit)}
            title="Send a one time code"
          />
          {step == 0 && <SocialButton onPress={handleLogin} title="Sign In" />}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default forgetPassword;
