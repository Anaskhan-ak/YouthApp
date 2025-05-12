import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../screens/onboarding';
import Splash from '../screens/splash';
import SignUp from '../screens/signup';
import Login from '../screens/login';
import Otp from '../screens/otp';
import EmailVerification from '../screens/emailVerification';
import FindFriends from '../screens/findFriends';
import Interests from '../screens/interest';
import LandingWidget from '../screens/landingWidget';
import forgetPassword from '../screens/forgetPassword';
import OtpVerification from '../screens/otpVerification';
import BottomTabNavigator from './BottomTabNavigator';
import Home from '../screens/home';


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
       <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
        <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="LandingWidget"
        options={{headerShown: false, animation: 'slide_from_left'}}
        component={LandingWidget}/>
        <Stack.Screen
        name="OtpVerification"
        options={{headerShown: false, animation: 'slide_from_left'}}
        component={OtpVerification}/>
       <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
       <Stack.Screen
        name="Otp"
        component={Otp}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
       <Stack.Screen
        name="EmailVerification"
        component={EmailVerification}
        options={{headerShown: false, animation: 'slide_from_left'}}
        />
      <Stack.Screen
        name="FindFriends"
        component={FindFriends}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
        <Stack.Screen
        name="ForgetPassword"
        component={forgetPassword}
        options={{headerShown: false, animation: 'slide_from_left'}}
        />
      <Stack.Screen
        name="Interests"
        component={Interests}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigator}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
       <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});