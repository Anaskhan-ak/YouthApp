import {View, Text, Platform, StatusBar} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import HomeHeader from '../../components/headers/homeHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import SideBar from './components/sideBar';
import CategorySelector from './components/categorySelector/Index';
import {colors} from '../../utils/colors';
import {LinearGradient} from 'react-native-linear-gradient';
import {height} from '../../constant';
import RNBottomSheet from '../../components/sheets/BottomSheet';
import {BlurView} from '@react-native-community/blur';

const Home = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const refRBSheet = useRef(null);
  useEffect(() => {
    console.log('refRBSheet', refRBSheet);
  }, [refRBSheet]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors?.white}}>
      <StatusBar translucent backgroundColor={'transparent'}></StatusBar>
      <LinearGradient
        colors={[colors?.RGB3, colors?.RGB4]}
        style={{marginTop: Platform?.OS === 'ios' && -height * 0.08}}>
        <HomeHeader />
        <CategorySelector />
      </LinearGradient>
     {isSheetOpen && (
        <BlurView
          style={{
            position: 'absolute',
            top: height * 0.11,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
      )}
      <SideBar refRBSheet={refRBSheet} />
      <RNBottomSheet setIsSheetOpen={setIsSheetOpen} sheetRef={refRBSheet} />
      <BottomTabNavigator />
    </SafeAreaView>
  );
};

export default Home;
