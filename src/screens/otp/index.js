import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../assets/images';
import {
  BackArrow,
  DropDown,
  WhiteLeftArrow,
  YouthIcon,
} from '../../assets/images/svgs';
import AuthError from '../../components/authErrorPopup';
import {PrimaryButton} from '../../components/buttons/PrimaryButton';
import AuthInput from '../../components/inputs/authInput';
import OtpInput from '../../components/inputs/otp';
import {height, width} from '../../constant';
import {apiCall} from '../../services/apiCall';
import {styles} from './styles';

const Otp = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const {countryDetails, phone} = route?.params || '';
  const navigation = useNavigation();

  const onSubmit = async () => {
    const obj = {
      phoneNo: countryDetails ? countryDetails?.dial_code + phone : phone,
      otp: otp,
    };
    console.log('obj', obj);
    try {
      setLoading(true);
      let result = await apiCall?.VerifyOtp(obj);
      navigation?.navigate('EmailVerification');
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
            <TouchableOpacity
              onPress={() => navigation?.goBack()}
              style={styles?.backBtn}>
              <WhiteLeftArrow />
            </TouchableOpacity>
            {showError && (
              <View style={styles?.authView}>
                <AuthError
                  title={errorMessage?.title}
                  message={errorMessage?.message}
                  setShowError={setShowError}
                />
              </View>
            )}
          </ImageBackground>
        </View>
        <View style={styles?.contentView}>
          <View style={styles?.titleContainer}>
            <View style={styles?.headingWithIconView}>
              <Text style={styles?.heading}>Allow </Text>
              <YouthIcon width={width * 0.2} />
              <Text style={styles?.heading}> to verify you!</Text>
            </View>
            <Text style={styles?.title}>
              We've sent a 6 digit code to your phone number. Please enter the
              verification code.
            </Text>
          </View>
          <View style={styles?.textContainer}>
            {
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
            }
            <View style={[styles?.textView, {width: '50%'}]}>
              <AuthInput
                inputStyle={{paddingVertical: height * 0.014}}
                value={phone}
                placeholder={'Phone'}
                disable
              />
            </View>
            <PrimaryButton
              width={'116%'}
              style={styles?.resendBtn}
              // isLoading={loading}
              onPress={onSubmit}
              title="Re-send"
              textStyle={styles?.btnText}
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
