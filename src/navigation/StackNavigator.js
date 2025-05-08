import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import EmailVerification from '../screens/emailVerification';
import FindFriends from '../screens/findFriends';
import forgetPassword from '../screens/forgetPassword';
import Interests from '../screens/interest';
import LandingWidget from '../screens/landingWidget';
import Login from '../screens/login';
import Onboarding from '../screens/onboarding';
import Otp from '../screens/otp';
import OtpVerification from '../screens/otpVerification';
import SignUp from '../screens/signup';
import Splash from '../screens/Splash';


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="LandingWidget">
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
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});