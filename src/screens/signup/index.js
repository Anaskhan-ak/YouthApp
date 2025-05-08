import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {images} from '../../assets/images';
import {height, width} from '../../constant';
import {Calendar, DropDown, YouthIcon} from '../../assets/images/svgs';
import {useForm, Controller} from 'react-hook-form';
import {emailValidation} from '../../helper';
import AuthInput from '../../components/inputs/authInput';
import CountryPickerDropDown from '../../components/dropdowns/CountryPicker';
import DateMonthPicker from '../../components/dropdowns/DatePicker';
import moment from 'moment';
import {PrimaryButton} from '../../components/buttons/PrimaryButton';
import {SocialButton} from '../../components/buttons/SocialButton';
import GradientText from '../../components/text/GradientText';
import GenderModal from '../../components/modals/genderModal';
import AuthError from '../../components/authErrorPopup';
import {useNavigation} from '@react-navigation/native';
import {apiCall} from '../../services/apiCall';

const SignUp = () => {
  const [countryDetails, setCountryDetails] = useState(null);
  const [showCountry, setShowCountry] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [gender, setGender] = useState(null);
  const [selectedDate, setSelectedDate] = useState('DOB');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
  });
  const handleDatePress = () => {
    setShowDate(!showDate);
  };
  const onSubmit = async data => {
    setKeyboardVisible(false)
    const obj = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      country: countryDetails?.countryDetails?.en,
      gender: gender,
      phoneNo: countryDetails?.dial_code + data?.phone,
      DoB: selectedDate,
    };
    if (!gender) {
      setShowError(true);
      setErrorMessage({
        title: 'Sign Up Error',
        message: 'Please select gender',
      });
    } else if (selectedDate === 'DOB') {
      setShowError(true);
      setErrorMessage({
        title: 'Sign Up Error',
        message: 'Please select Date of Birth',
      });
    } else {
      try {
        let result = await apiCall?.SignUp(obj);
        navigation?.navigate('Otp', {
          countryDetails: countryDetails,
          phone: data?.phone,
        });
      } catch (e) {
        console.log('e', e);
        setShowError(true);
        setErrorMessage({
          title: 'Sign Up Error',
          message: Array.isArray(e) ? e[0]?.message : e,
        });
      } finally {
      }
    }
  };
  const handleSignIn = () => {
    navigation?.navigate('Login');
  };

  const onError = errors => {
    const keys = Object.keys(errors);
    if (keys.length > 0) {
      const firstKey = keys[0];
      const message = errors[firstKey]?.message || 'Validation error';
      setErrorMessage({
        title: 'Sign Up Error',
        message: message,
      });
      setShowError(true);
    } else {
      setShowError(false);
    }
    setKeyboardVisible(false)
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
          source={images?.signup}>
          {showError && (
            <AuthError
              title={errorMessage?.title}
              message={errorMessage?.message}
              setShowError={setShowError}
            />
          )}
        </ImageBackground>
      </View>
      <View style={styles?.contentView}>
        <Text style={styles?.heading}>
          Create a New <YouthIcon width={width * 0.18} /> Account
        </Text>
        <Text style={styles?.title}>It’s quick and easy.</Text>
        <View style={styles?.textContainer}>
          <View style={styles?.textView}>
            <Controller
              control={control}
              rules={{
                required: 'firstName is required',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <AuthInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder={'First Name'}
                  error={errors?.firstName}
                />
              )}
              name="firstName"
            />
          </View>
          <View style={styles?.textView}>
            <Controller
              control={control}
              rules={{
                required: 'last name is required',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <AuthInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder={'Last Name'}
                  error={errors?.lastName}
                />
              )}
              name="lastName"
            />
          </View>
        </View>
        <View style={{marginTop: 10}} />
        <Controller
          control={control}
          rules={{
            required: 'email is required',
            validate: emailValidation,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <AuthInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors?.email}
              placeholder={'Email'}
            />
          )}
          name="email"
        />
        <View style={styles?.textContainer}>
          <View style={[styles?.textView, {width: '28%'}]}>
            <TouchableOpacity
              onPress={() => {
                setShowCountry(!showCountry);
              }}
              style={styles?.phoneContainer}>
              <Text style={styles?.phoneText}>
                {countryDetails
                  ? `${countryDetails?.flag} ${countryDetails?.dial_code}`
                  : 'Country'}
              </Text>
              <View>
                <DropDown height={height * 0.02} width={width * 0.035} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles?.textView, {width: '70%'}]}>
            <Controller
              control={control}
              rules={{
                required: 'phone is required',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <AuthInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors?.phone}
                  placeholder={'Phone'}
                  type={'phoneNumber'}
                />
              )}
              name="phone"
            />
          </View>
        </View>
        <View style={styles?.textContainer}>
          <View style={styles?.textView}>
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
            {/* {errors?.password && (
              <Text style={styles?.error}>{errors?.password?.message}</Text>
            )} */}
          </View>
          <View style={styles?.textView}>
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
          </View>
        </View>
        <View style={styles?.textContainer}>
          <View style={[styles?.textView, {width: '28%'}]}>
            <TouchableOpacity
              onPress={() => {
                setShowGender(!showCountry);
              }}
              style={styles?.phoneContainer}>
              <Text style={styles?.phoneText}>
                {gender ? gender : 'Gender'}
              </Text>
              <View>
                <DropDown height={height * 0.02} width={width * 0.035} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles?.textView, {width: '70%'}]}>
            <Controller
              control={control}
              // rules={{
              //   required: 'Date of birth is required',
              // }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TouchableOpacity onPress={handleDatePress}>
                    <AuthInput
                      disable={true}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={
                        selectedDate !== 'DOB'
                          ? moment(selectedDate).format('DD-MM-YYYY')
                          : value
                      }
                      placeholder={'Date Of Birth'}
                      icon={'calendar'}
                      onPress={handleDatePress}
                    />
                  </TouchableOpacity>
                </>
              )}
              name="dateOfBirth"
            />
          </View>
        </View>
        <View style={[styles.bottomContentView, {marginTop: height * 0.01}]}>
          <Text style={styles?.content}>
            By clicking Sign Up, you agree to our
          </Text>
          <GradientText style={styles.gradientText}>
            {' '}
            Terms, Data Policy
          </GradientText>
          .
        </View>
        <View style={styles.bottomContentView}>
          <GradientText style={styles.gradientText}>
            and Cookies Policy.
          </GradientText>
          <Text style={styles?.content}>
            {' '}
            You may receive SMS Notifications
          </Text>
        </View>
        <Text style={styles?.content}>from us and can opt out any time.</Text>
        <PrimaryButton
          isLoading={loading}
          onPress={handleSubmit(onSubmit, onError)}
          title="Sign Up"
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
          <Text style={styles?.content}>Already have an account?</Text>
          <TouchableOpacity onPress={handleSignIn}>
            <GradientText style={styles.gradientText}> Sign In</GradientText>
          </TouchableOpacity>
        </View>
      </View>

      <CountryPickerDropDown
        showCountry={showCountry}
        setShowCountry={setShowCountry}
        setCountryDetails={setCountryDetails}
      />
      <DateMonthPicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        showDate={showDate}
        setShowDate={setShowDate}
      />
      <GenderModal
        modalVisible={showGender}
        setModalVisible={setShowGender}
        setGender={setGender}
        value={gender}
      />
    </SafeAreaView>
  );
};

export default SignUp;
