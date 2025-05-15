import {View, Text, Platform} from 'react-native';
import React from 'react';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import HomeHeader from '../../components/headers/homeHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import SideBar from './components/sideBar';
import CategorySelector from './components/categorySelector/Index';
import {colors} from '../../utils/colors';
import {LinearGradient} from 'react-native-linear-gradient';
import {height} from '../../constant';

const Home = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors?.white}}>
      <LinearGradient
        colors={[colors?.RGB3, colors?.RGB4]}
        style={{marginTop: Platform?.OS === 'ios' && -height * 0.08}}>
        <HomeHeader />
        <CategorySelector />
      </LinearGradient>
      <SideBar />
      <BottomTabNavigator />
    </SafeAreaView>
  );
};

export default Home;
