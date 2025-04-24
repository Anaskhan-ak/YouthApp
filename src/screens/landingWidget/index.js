import { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { BlackLike, BlackShare, DontShowLandingWidget } from '../../assets/images/svgs';
import { colors } from '../../utils/colors/index';
import { fonts } from '../../utils/fonts/index';
import LandingWidgetAudioPlayer from './components/AudioPlayer';
import Calendar from './components/Calender';
import AnalogWatch from './components/Clock';
import Notifications from './components/Notifications';
import { StackedNotifications } from './components/Swippable';
// import {useDispatch, useSelector} from 'react-redux';

const {height, width} = Dimensions.get('window');

const LandingWidget = ({navigation}) => {
  const [chatToggle, setChatToggle] = useState(true);
  const [educationToggle, setEducationToggle] = useState(true);
  const [walletToggle, setWalletToggle] = useState(true);
  const [socialToggle, setSocialToggle] = useState(true);

  const [chatVisible, setChatVisible] = useState(true);
  const [educationVisible, setEducationVisible] = useState(true);
  const [walletVisible, setWalletVisible] = useState(true);
  const [socialVisible, setSocialVisible] = useState(true);
  const [stackNotificationCount, setStackNotificationCount] = useState(-1);
  const user = useSelector(state => state?.auth?.data);
  const landingWidget = useSelector(state => state?.generic?.landingWidget);
  const dispatch = useDispatch();
  // const user = {
  //   id: 'cm60ql39f003l91r8l18bd80z',
  //   firstName: 'Sannya01',
  //   lastName: 'Wasim',
  //   email: 'sannya.wasim01@gmail.com',
  //   password: '$2b$10$Cb7LzbunTQT1gdt7QaeI9ut8sa73ZVkp1fhe6S5WgPBCLm.6njWUq',
  //   country: 'Pakistan',
  //   phoneNo: '+923368214535',
  //   gender: 'female',
  //   DoB: '2001-08-04T00:00:00.000Z',
  //   sign_in_provider: null,
  //   UiD: null,
  //   status: true,
  //   photo:
  //     'https://youthapp.s3.eu-north-1.amazonaws.com/4139875506profilePicture.jpg',
  //   links: ['www.youthapp.io'],
  //   fcm_token:
  //     'cV9EFlDqS9-pYfUHx2mcik:APA91bGiU2OWD2JP1872UmMq7_tffyBN0DeBaerTgRa1j2zkvA-CIIofiSt9zPN6MOseAf8augAJYFYDmtDEEYjxPEVwFViwmxwwaM-E7e_qVLfEfZ9GFf4',
  //   createdAt: '2025-01-17T12:29:18.148Z',
  //   isFirstLogin: false,
  //   coverImage:
  //     'https://youthapp.s3.eu-north-1.amazonaws.com/319080719609coverImage.jpg',
  //   bio: 'I am an engineer.',
  //   isVerified: true,
  //   friendFriends: [],
  //   friendships: [],
  //   LinkedAccount: [],
  //   numPosts: 87,
  //   numFollowers: 5,
  //   numFollowing: 2,
  //   favorites: [],
  //   linkedAccounts: [],
  // };

  const [widget, changeWidget] = useState('podcast');

  const toggleWidget = () => {
    if (widget === 'calender') {
      changeWidget('podcast');
    } else if (widget === 'date') {
      changeWidget('calender');
    } else {
      changeWidget('date');
    }
  };

  const DateComponent = () => {
    return (
      <View style={styles?.dateContainer}>
        <Text style={styles.day}>
          {
            [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ][new Date().getDay()]
          }
        </Text>
        <Text style={styles.hours}>
          {new Date().getHours().toString().padStart(2, '0')}
        </Text>
        <Text style={styles.minutes}>
          {new Date().getMinutes().toString().padStart(2, '0')}
        </Text>
      </View>
    );
  };

  const Podcast = () => {
    return (
      <View style={styles.timewidget}>
        <Image
          style={styles?.podcastThumbnail}
          source={require('../../assets/images/onboarding/Onboarding1.png')}
          resizeMethod='contain'
        />
        <View style={styles?.podcastMediaContainer}>
          <Text style={styles?.podcastHeading}>It shall so soon</Text>
          <Text style={styles?.podcastSubheading}>Yudio: Youth.Podcast</Text>
          <LandingWidgetAudioPlayer
            audioURL={
              'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
            }
            pink={true}
          />
          <View style={styles?.reactionButtons}>
            <BlackLike width={16} height={16} />
            <BlackShare width={16} height={16} />
          </View>
        </View>
      </View>
    );
  };
  return (
    <LinearGradient
      colors={['#478FE4', '#478FE4', '#5CD3C6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles?.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <ScrollView 
      contentContainerStyle={styles?.scrollView}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.replace('Dashboard', {screen: 'Home'});
          }}
          style={styles.skipButton}>
          <Text style={styles.skiptetxt}>Skip it</Text>
        </TouchableOpacity>
        <Text style={styles.GreetText}>Hi,</Text>
        <Text style={[styles.GreetText, {marginTop: -height * 0.025}]}>
          {user.firstName}
        </Text>
        <Text style={styles.welcomeText}>
          Welcome back to {''}
          <Image
            style={styles?.logo}
            resizeMode="contain"
            source={require('../../assets/images/Logo.png')}
          />
          {/* <Vactor /> */}
          World
        </Text>

        {widget === 'calender' ? (
          <View style={styles.timewidget}>
            <AnalogWatch />
            <Calendar />
          </View>
        ) : widget === 'date' ? (
          <View style={styles.timewidget}>
            <DateComponent />
            <Calendar />
          </View>
        ) : (
          <Podcast />
        )}

        {/* Notifications */}
        <ScrollView style={styles?.notificationScroll}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height:
                stackNotificationCount === -1
                  ? height * 0.12
                  : stackNotificationCount === 0
                  ? 0
                  : stackNotificationCount * (height * 0.12),
              alignItems: 'center',
            }}>
            <StackedNotifications count={setStackNotificationCount} />
          </View>
          <Notifications
            title="Chat"
            toggle={chatToggle}
            setToggle={setChatToggle}
            isVisible={chatVisible}
            setVisibility={setChatVisible}
          />
          <Notifications
            title="Social"
            toggle={socialToggle}
            setToggle={setSocialToggle}
            isVisible={socialVisible}
            setVisibility={setSocialVisible}
          />
          <Notifications
            title="Educational"
            toggle={educationToggle}
            setToggle={setEducationToggle}
            isVisible={educationVisible}
            setVisibility={setEducationVisible}
          />
          <Notifications
            title="Wallet"
            toggle={walletToggle}
            setToggle={setWalletToggle}
            isVisible={walletVisible}
            setVisibility={setWalletVisible}
          />
        </ScrollView>

        <TouchableOpacity
          onPress={toggleWidget}
          style={styles?.changeWidgetButton}>
          <Text style={styles.welcomeTextzO}>Change This widget</Text>
        </TouchableOpacity>
        <View style={styles?.footer}>
          <TouchableOpacity
            onPress={() => {
              dispatch(toggleLandingWidget(false));
              // navigation.navigate('Dashboard');
            }}>
            <View>
              <DontShowLandingWidget />
            </View>
          </TouchableOpacity>
          <Text style={styles?.dontShowText}> Don’t show me this page</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};


export default LandingWidget;

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollView: {
    marginTop : height * 0.02
  },
  skipButton: {
    height: height * 0.04,
    backgroundColor: 'white',
    width: width * 0.18,
    borderRadius: width * 0.01,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: height * 0.0225,
    marginRight: width * 0.045,
  },
  skiptetxt: {
    color: '#27869f',
    textAlign: 'center',
    fontFamily : fonts?.montserratExtraBold,
    fontSize : width * 0.035
  },
  GreetText: {
    color: 'white',
    fontSize: width * 0.15,
    fontFamily: 'Montserrat-ExtraBold',
    // width: 320,
    // alignSelf: 'center',
    marginLeft : width * 0.04
  },
  welcomeText: {
    color: colors.black,
    fontSize: 18,
    fontFamily: fonts?.montserratExtraBold,
    // marginTop: -height * 0.01,
    width: width * 0.9,
    alignSelf: 'center',
    letterSpacing: 0,
  },
  welcomeTextY: {
    color: colors?.white,
    fontSize: width * 0.049,
    fontFamily: fonts?.montserratExtraBold,
  },
  logo: {
    tintColor: colors?.white,
  },
  timewidget: {
    height: height * 0.22,
    width: width * 0.9,
    backgroundColor: 'rgba(250, 250, 250, 0.75)',
    alignSelf: 'center',
    borderRadius: width * 0.05,
    marginTop: height * 0.025,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // paddingHorizontal: -20,
    marginBottom: height * 0.01,
  },
  welcomeTextz: {
    color: 'rgba(250, 250, 250, 0.75)',
    fontSize: width * 0.039,
    fontFamily: 'Montserrat-ExtraBold',
  },
  welcomeTextzO: {
    color: 'white',
    fontSize: width * 0.035,
    fontFamily: 'Montserrat-ExtraBold',
    textAlign: 'center',
  },
  day: {
    color: 'red',
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.03,
    marginBottom: -height * 0.025,
  },
  hours: {
    color: colors.text,
    fontFamily: fonts.montserratExtraBold,
    fontSize: width * 0.17,
    marginBottom: -height * 0.03,
    textAlign: 'center',
  },
  minutes: {
    color: colors.text,
    fontFamily: fonts.montserratMedium,
    fontSize: width * 0.15,
    textAlign: 'center',
  },
  notificationScroll: {
    height: height * 0.37,
  },
  changeWidgetButton: {
    borderWidth: width * 0.002,
    borderColor: 'white',
    width: width * 0.63,
    height: height * 0.045,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.02,
    marginTop: height * 0.0125,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width * 0.01,
  },
  dontShowText: {
    color: colors.white,
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.035,
    marginLeft: width * 0.02,
  },
  dateContainer: {
    justifyContent: 'center',
    marginLeft: width * 0.02,
  },
  podcastThumbnail: {
    width: width * 0.3,
    height: height * 0.2,
    borderRadius: width * 0.03,
    marginLeft: width * 0.02,
  },
  reactionButtons: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: width * 0.035,
    marginTop: width * 0.02,
    width: width * 0.15,
    // marginBottom: -10,
    // padding : 10
  },
  podcastMediaContainer: {
    width: width * 0.53,
    alignItems: 'center',
  },
  podcastHeading: {
    textAlign: 'center',
    fontSize: width * 0.045,
    color: colors.text,
    fontFamily: fonts.montserratBlack,
  },
  podcastSubheading: {
    textAlign: 'center',
    fontSize: width * 0.03,
    color: colors.text,
    fontFamily: fonts.montserratMedium,
    marginVertical: width * 0.008,
  },
});
