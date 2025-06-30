import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from '../screens/Chat';
import ChatInbox from '../screens/ChatInbox';
import ConnectionListing from '../screens/connectionListing';
import CreateEvent from '../screens/createEvent';
import CreateMoment from '../screens/CreateMoment';
import CreatePost from '../screens/createPost';
import CreateRepost from '../screens/CreateRepost';
import CreateStory from '../screens/createStory';
import CreateWallet from '../screens/createWallet';
import CreateYudio from '../screens/createYudio';
import EmailVerification from '../screens/emailVerification';
import FindFriends from '../screens/findFriends';
import ForgetPassword from '../screens/forgetPassword';
import Home from '../screens/home';
import Interests from '../screens/interest';
import LandingWidget from '../screens/landingWidget';
import Login from '../screens/login';
import Moments from '../screens/Moments';
import NewChat from '../screens/newChat';
import NewChatGroup from '../screens/newChatGroup';
import Onboarding from '../screens/onboarding';
import Otp from '../screens/otp';
import OtpVerification from '../screens/otpVerification';
import PostDetails from '../screens/postDetails';
import Profile from '../screens/Profile';
import ProfileSettingsActivity from '../screens/profileSettings';
import SavedArchived from '../screens/savedArchived';
import SignUp from '../screens/signup';
import Splash from '../screens/splash';
import SuggestedContent from '../screens/suggestions';
import Wallet from '../screens/wallet';
import Yudios from '../screens/Yudios';
import BottomTabNavigator from './BottomTabNavigator';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Splash">
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
        name="ProfileSettingsActivity"
        component={ProfileSettingsActivity}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="CreateWallet"
        component={CreateWallet}
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
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="SuggestedContent"
        component={SuggestedContent}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="CreateMoment"
        component={CreateMoment}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="Moments"
        component={Moments}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="CreateRepost"
        component={CreateRepost}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
       <Stack.Screen
        name="ConnectionListing"
        component={ConnectionListing}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="SavedArchived"
        component={SavedArchived}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
