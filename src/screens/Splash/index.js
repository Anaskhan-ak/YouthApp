import {View, Text, StatusBar, ImageBackground, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {images} from '../../assets/images';
import {apiCall} from '../../services/apiCall';
import DeviceInfo from 'react-native-device-info';
import {toast, hideToast} from '../../components/toast';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  const hasShownToast = useRef(false);
  const version = DeviceInfo.getVersion();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected && !hasShownToast.current) {
        toast('error', 'No Internet', 'Please check your network connection');
        hasShownToast.current = true;
      }
      if (state.isConnected) {
        hideToast();
        hasShownToast.current = false;
        getOnboardingContent();
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOnboardingContent = async () => {
     let rememberMe = await AsyncStorage.getItem('rememberMe');
    try {
      const response = await apiCall?.getOnboardingContent();
      setTimeout(() => {
        if(rememberMe){
        navigation?.navigate('Home');
        }else{
        navigation?.navigate('Onboarding', {details: response});
        }
      }, 2000);
    } catch (error) {
      toast('error', 'Something went wrong', error);
      console.error('Error fetching:', error);
    }
  };

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
          <Text allowFontScaling={false} style={styles?.heading}>
            VOL {version}
          </Text>
          <Text allowFontScaling={false} style={styles?.subHeading}>
            Copyrights {new Date()?.getFullYear()} © YouthApp.io
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Splash;
