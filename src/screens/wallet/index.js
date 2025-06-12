import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {StatusBar} from 'react-native';
import {ImageBackground} from 'react-native';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../utils/colors';
import {images} from '../../assets/images';
import {
  BackArrow,
  WhiteLeftArrow,
  YouthIcon,
  YouthIconWhite,
} from '../../assets/images/svgs';
import {height, width} from '../../constant';
import {fonts} from '../../utils/fonts';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {GradientBorderButton} from '../../components/buttons/GradientBorderButton';
import SocialButton from '../../components/buttons/SocialButton';
import GradientText from '../../components/text/GradientText';
import ProfileHeader from '../../components/headers/profileHeader';

const Wallet = () => {
  return (
    <View style={styles?.container}>
      <LinearGradient
        style={styles?.header}
        colors={[colors?.RGB1, colors?.RGB2]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <StatusBar
          translucent
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
        />
   <ProfileHeader/>
      </LinearGradient>
      <View style={styles?.contentContainer}>
        <Image source={images?.wallet} style={styles?.image} />
        <View style={styles?.headingWithIconView}>
          <Text style={styles?.heading}>Welcome to </Text>
          <YouthIcon width={width * 0.2} />
          <Text style={styles?.heading}> Wallet</Text>
        </View>
        <Text style={styles?.title}>
          Here you can create a new wallet or import An existing wallet, so you
          can
        </Text>
        <Text style={[styles?.title, {fontFamily: fonts?.montserratBold}]}>
          earn and transact
        </Text>
        <View style={styles?.bottomContainer}>
          <PrimaryButton title={'Create a new Wallet'} />
          <GradientBorderButton
            width={width * 0.69}
            title={'I already have a Wallet'}
          />
          <SocialButton
            style={{marginTop: 0}}
            title={'I’ll create my wallet later'}></SocialButton>
          <Text style={[styles?.title, {marginTop: 20}]}>
            By continuing, you accept Youth Wallet’s
          </Text>

          <View style={[styles.bottomContentView]}>
            <GradientText style={styles.gradientText}>Term of Use</GradientText>
            <Text style={styles?.content}> and </Text>
            <TouchableOpacity
            //    onPress={handleWebpage}
            >
              <GradientText style={styles.gradientText}>
                Privacy Policy
              </GradientText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Wallet;
