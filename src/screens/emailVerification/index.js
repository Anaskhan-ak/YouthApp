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

const EmailVerification = ({navigation}) => {
  const handleSignIn = () => {
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
          source={images.emailVerificationLogo}
        />
        <Text style={styles?.heading}>Check your email</Text>
        <Text style={styles?.subHeading}>
          Account Created Successfully. We've sent you an activation link.
        </Text>
        <Text style={[styles?.subHeading, {color: colors?.RGB2}]}>
          (also check the Spam folder)
        </Text>
      </View>
      <View style={styles.contentView}>
        <PrimaryButton
          // isLoading={loading}
          onPress={handleSignIn}
          title="Continue"
        />
        <View style={styles.bottomContentView}>
          <Text style={styles?.content}>Already activate your account?</Text>
          <TouchableOpacity onPress={handleSignIn}>
            <GradientText style={styles.gradientText}> Sign In</GradientText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailVerification;
