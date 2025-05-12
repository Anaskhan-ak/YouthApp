import {View, Text, StatusBar, ImageBackground, Image} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {images} from '../../assets/images';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation?.navigate('Onboarding');
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <ImageBackground style={styles.background} source={images.background}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={images.splashLogo}></Image>
        <View style={styles.contentView}>
          <Text allowFontScaling={false} style={styles?.heading}>VOL 1.0.0</Text>
          <Text allowFontScaling={false} style={styles?.subHeading}>Copyrights 2023 © YouthApp.io</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Splash;
