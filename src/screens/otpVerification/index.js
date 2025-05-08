import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {images} from '../../assets/images';
import {colors} from '../../utils/colors';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import GradientText from '../../components/text/GradientText';
import {YouthIcon} from '../../assets/images/svgs';
import {width} from '../../constant';

const OtpVerification = ({navigation}) => {
  const handleLogin = () => {
    navigation?.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <View style={styles?.topView}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={images.otpVerification}
        />
        <Text style={styles?.heading}>
          Your new <YouthIcon width={width * 0.18} /> Password{'\n'}is
          successfully created!
        </Text>
        <Text style={styles?.subHeading}>
          Login now and enjoy like never before!
        </Text>
      </View>
      <View style={styles.contentView}>
        <PrimaryButton
          onPress={handleLogin}
          title="Continue"
          style={{bottom: 15}}
        />
      </View>
    </SafeAreaView>
  );
};

export default OtpVerification;
