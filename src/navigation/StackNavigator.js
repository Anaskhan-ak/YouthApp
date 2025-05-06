import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import FindFriends from '../screens/findFriends';
import Interests from '../screens/interest';
import LandingWidget from '../screens/landingWidget';
import Login from '../screens/login';
import Onboarding from '../screens/onboarding';
import SignUp from '../screens/signup';
import Splash from '../screens/Splash';
import CreateYudio from '../screens/Yudio/createYudio';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="CreateYudio">
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
        name="Login"
        component={Login}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="FindFriends"
        component={FindFriends}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="Interests"
        component={Interests}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="CreateYudio"
        component={CreateYudio}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});