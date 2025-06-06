import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {images} from '../../assets/images';
import {height, width} from '../../constant';
import {YouthIcon} from '../../assets/images/svgs';
import {useForm, Controller} from 'react-hook-form';
import {emailValidation} from '../../helper';
import AuthInput from '../../components/inputs/authInput';
import {colors} from '../../utils/colors';
import {PrimaryButton} from '../../components/buttons/PrimaryButton';
import {SocialButton} from '../../components/buttons/SocialButton';
import GradientText from '../../components/text/GradientText';
import AuthError from '../../components/authErrorPopup';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { apiCall } from '../../services/apiCall';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation()
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
    console.log(data);
    const obj = {
      login_user: data?.email,
      password: data?.password,
      fcm_token:'test'
    }
    try {
      let result = await apiCall?.Login(obj);
      console.log('result', result);
    } catch (e) {
      console.log('e', e);
      setShowError(true);
      setErrorMessage({
        title: 'Sign Up Error',
        message: Array.isArray(e) ? e[0]?.message : e,
      });
    } finally {
    }
  };
  const handleRememberMe = () => {setRememberMe(!rememberMe)};
  const handleSignUp = () => {
    navigation?.navigate("SignUp")
  };
  return (
    <SafeAreaView style={styles?.container}>
      <ScrollView
        style={{marginTop: -height * 0.07}}
        contentContainerStyle={styles?.scrollViewContainer}>
        <StatusBar
          translucent
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
        />
        <View style={styles?.imageView}>
          <ImageBackground
            borderBottomLeftRadius={width * 0.1}
            borderBottomRightRadius={width * 0.1}
            style={styles.image}
            source={images?.login}>
            {showError && 
            <View style={styles?.authView}>
            <AuthError    
            title={errorMessage?.title}
            message={errorMessage?.message}
            setShowError={setShowError} />
            </View>
            }
          </ImageBackground>
        </View>
        <View style={styles?.contentView}>
          <Text style={styles?.heading}>
            Login to your <YouthIcon width={width * 0.2} /> Account
          </Text>
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
                message:
                  'Password must contain at least one uppercase letter',
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
              <LinearGradient
                style={styles?.rememberMe}
                colors={[colors?.RGB1, colors?.RGB2]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                {rememberMe && <View style={styles?.checkRememberMe} />}
              </LinearGradient>
              <Text style={[styles?.content, {left: 4}]}>Remember me</Text>
            </TouchableOpacity>
            <GradientText style={styles.gradientText}>
              {' '}
              Forget your account details?
            </GradientText>
          </View>

          <PrimaryButton
            isLoading={loading}
            onPress={handleSubmit(onSubmit)}
            title="Sign In"
          />
          <SocialButton type={'google'} title="Continue with Google" />
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
            <GradientText style={styles.gradientText}>{' '}Sign Up</GradientText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
