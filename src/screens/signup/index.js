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
import {Calendar, DropDown, YouthIcon} from '../../assets/images/svgs';
import {useForm, Controller} from 'react-hook-form';
import {emailValidation} from '../../helper';
import AuthInput from '../../components/inputs/AuthInput';
import CountryPickerDropDown from '../../components/dropdowns/CountryPicker';
import {colors} from '../../utils/colors';
import DatePicker from '../../components/dropdowns/DatePicker';
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
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const handleDatePress = () => {
    setShowDate(!showDate);
  };
  const onSubmit = async data => {
    console.log('data');
    const obj = {
      firstName: 'Jamil',
      lastName: 'Ahmed',
      email: 'jamil451@youthapp.com',
      password: 'Abcd@123',
      confirmPassword: 'Abcd@123',
      country: 'Pakistan',
      gender: 'Male',
      phoneNo: '+92443323525317',
      DoB: '6/2/1994',
    };
    try {
      let result = await apiCall?.SignUp(obj);
      console.log('result', result);
    } catch (e) {
      console.log('anas');
      setShowError(true);
      setErrorMessage({title: 'Sign Up Error', message: e});
    } finally {
    }
  };
  const handleSignIn = () => {
    navigation?.navigate('Login');
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
            Create a New <YouthIcon width={width * 0.2} /> Account
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
                    placeholder={'Password'}
                    secureTextEntry
                    error={errors?.password}
                  />
                )}
                name="password"
              />
            </View>
            <View style={styles?.textView}>
              <Controller
                control={control}
                rules={{
                  required: 'confirm password is required',
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
                rules={{
                  required: 'Date of birth is required',
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <>
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
            onPress={handleSubmit(onSubmit)}
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
      </ScrollView>
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
