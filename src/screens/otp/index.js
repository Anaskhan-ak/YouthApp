import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {images} from '../../assets/images';
import {height, width} from '../../constant';
import {DropDown, YouthIcon} from '../../assets/images/svgs';
import {PrimaryButton} from '../../components/buttons/PrimaryButton';
import AuthError from '../../components/authErrorPopup';
import {useNavigation} from '@react-navigation/native';
import {apiCall} from '../../services/apiCall';
import OtpInput from '../../components/inputs/otp';
import AuthInput from '../../components/inputs/authInput';

const Otp = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const {countryDetails, phone} = route?.params || '';
  const navigation = useNavigation();

  const onSubmit = async () => {
    const obj = {
      phoneNo: countryDetails?.dial_code + phone,
      otp: otp,
    };
    try {
      setLoading(true)
      let result = await apiCall?.VerifyOtp(obj);
      navigation?.navigate("EmailVerification")
    } catch (e) {
      setShowError(true);
      setErrorMessage({
        title: 'Sign Up Error',
        message: Array.isArray(e) ? e[0]?.message : e,
      });
    } finally {
      setLoading(false)
    }
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
            source={images?.otp}>
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
          <View style={styles?.titleContainer}>
            <Text style={styles?.heading}>
              Allow <YouthIcon width={width * 0.2} /> to verify you!
            </Text>
            <Text style={styles?.title}>
              We've sent a 4 digit code to your phone number. Please enter the
              verification code.
            </Text>
          </View>
          <View style={styles?.textContainer}>
            <View style={[styles?.textView, {width: '28%'}]}>
              <TouchableOpacity disabled style={styles?.phoneContainer}>
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
            <View style={[styles?.textView, {width: '50%'}]}>
              <AuthInput value={phone} placeholder={'Phone'} disable />
            </View>
            <PrimaryButton
              width={'116%'}
              style={styles?.resendBtn}
              // isLoading={loading}
              // onPress={handleSubmit(onSubmit)}
              title="Re-send"
            />
          </View>
          <OtpInput setOtp={setOtp} />

          <PrimaryButton
            isLoading={loading}
            onPress={onSubmit}
            title="Continue"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Otp;
