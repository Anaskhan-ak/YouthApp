import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../screens/onboarding';
import Splash from '../screens/Splash';
import SignUp from '../screens/signup';
import LandingWidget from '../screens/landingWidget'

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="SignUp">
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
      {/* <Stack.Screen
        name="LandingWidget"
        component={LandingWidget}
        options={{headerShown: false, animation: 'slide_from_left'}}
      /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});