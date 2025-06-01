import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from '../screens/Chat';
import ChatInbox from '../screens/ChatInbox';
import CreateEvent from '../screens/createEvent';
import CreatePost from '../screens/createPost';
import CreateStory from '../screens/createStory';
import CreateYudio from '../screens/createYudio';
import EmailVerification from '../screens/emailVerification';
import FindFriends from '../screens/findFriends';
import ForgetPassword from '../screens/forgetPassword';
import Home from '../screens/home';
import Interests from '../screens/interest';
import LandingWidget from '../screens/landingWidget';
import Login from '../screens/login';
import NewChat from '../screens/newChat';
import NewChatGroup from '../screens/newChatGroup';
import Onboarding from '../screens/onboarding';
import Otp from '../screens/otp';
import OtpVerification from '../screens/otpVerification';
import Profile from '../screens/Profile';
import SignUp from '../screens/signup';
import Splash from '../screens/Splash';
import Yudios from '../screens/Yudios';
import BottomTabNavigator from './BottomTabNavigator';

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
        component={LandingWidget}
      />
      <Stack.Screen
        name="OtpVerification"
        options={{headerShown: false, animation: 'slide_from_left'}}
        component={OtpVerification}
      />
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
        name="Profile"
        component={Profile}
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
        component={ForgetPassword}
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
      <Stack.Screen
        name="CreateYudio"
        component={CreateYudio}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="Yudios"
        component={Yudios}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="CreateStory"
        component={CreateStory}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="ChatInbox"
        component={ChatInbox}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="NewChat"
        component={NewChat}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="NewChatGroup"
        component={NewChatGroup}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
