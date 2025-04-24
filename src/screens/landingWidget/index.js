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
import { DontShowLandingWidget } from '../../assets/images/svgs';
import { colors } from '../../utils/colors/index';
import { fonts } from '../../utils/fonts/index';
import Calendar from './components/Calender';
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
  // const user = useSelector(state => state.auth.data);
  // const landingWidget = useSelector(state => state.generic.landingWidget);
  // const dispatch = useDispatch();
  const user = {
    id: 'cm60ql39f003l91r8l18bd80z',
    firstName: 'Sannya01',
    lastName: 'Wasim',
    email: 'sannya.wasim01@gmail.com',
    password: '$2b$10$Cb7LzbunTQT1gdt7QaeI9ut8sa73ZVkp1fhe6S5WgPBCLm.6njWUq',
    country: 'Pakistan',
    phoneNo: '+923368214535',
    gender: 'female',
    DoB: '2001-08-04T00:00:00.000Z',
    sign_in_provider: null,
    UiD: null,
    status: true,
    photo:
      'https://youthapp.s3.eu-north-1.amazonaws.com/4139875506profilePicture.jpg',
    links: ['www.youthapp.io'],
    fcm_token:
      'cV9EFlDqS9-pYfUHx2mcik:APA91bGiU2OWD2JP1872UmMq7_tffyBN0DeBaerTgRa1j2zkvA-CIIofiSt9zPN6MOseAf8augAJYFYDmtDEEYjxPEVwFViwmxwwaM-E7e_qVLfEfZ9GFf4',
    createdAt: '2025-01-17T12:29:18.148Z',
    isFirstLogin: false,
    coverImage:
      'https://youthapp.s3.eu-north-1.amazonaws.com/319080719609coverImage.jpg',
    bio: 'I am an engineer.',
    isVerified: true,
    friendFriends: [],
    friendships: [],
    LinkedAccount: [],
    numPosts: 87,
    numFollowers: 5,
    numFollowing: 2,
    favorites: [],
    linkedAccounts: [],
  };

  const [widget, changeWidget] = useState('date');

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
      <ScrollView contentContainerStyle={styles?.scrollView}>
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
        {/* <ScrollView style={styles?.notificationScroll}>
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
        </ScrollView> */}

        <TouchableOpacity
          onPress={toggleWidget}
          style={styles?.changeWidgetButton}>
          <Text style={styles.welcomeTextzO}>Change This widget</Text>
        </TouchableOpacity>
        <View style={styles?.footer}>
          <TouchableOpacity
            onPress={() => {
              // dispatch(toggleLandingWidget(false));
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
  scrollView: {paddingBottom: 20, marginTop: 25},
  skipButton: {
    height: height * 0.04,
    backgroundColor: 'white',
    width: width * 0.18,
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: height * 0.0225,
    marginRight: width * 0.045,
  },
  skiptetxt: {
    color: '#27869f',
    textAlign: 'center',
    fontWeight: '900',
  },
  GreetText: {
    color: 'white',
    fontSize: width * 0.15,
    fontFamily: 'Montserrat-ExtraBold',
    width: 320,
    alignSelf: 'center',
  },
  welcomeText: {
    color: colors.black,
    fontSize: 18,
    fontFamily: 'Montserrat-ExtraBold',
    // marginTop: -height * 0.01,
    width: '90%',
    alignSelf: 'center',
    letterSpacing: 0,
  },
  welcomeTextY: {
    color: 'white',
    fontSize: width * 0.049,
    fontFamily: 'Montserrat-ExtraBold',
  },
  logo: {
    tintColor: 'white',
  },
  timewidget: {
    height: height * 0.22,
    width: '90%',
    backgroundColor: 'rgba(250, 250, 250, 0.75)',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: height * 0.025,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    fontSize: 10,
    // marginBottom: -20,
  },
  hours: {
    color: colors.text,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 65,
    // marginBottom: -25,
    textAlign: 'center',
  },
  minutes: {
    color: colors.text,
    fontFamily: fonts.montserratMedium,
    fontSize: 55,
    textAlign: 'center',
  },
  notificationScroll: {
    height: height * 0.32,
  },
  changeWidgetButton: {
    borderWidth: 1,
    borderColor: 'white',
    width: width * 0.63,
    height: height * 0.045,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: height * 0.0125,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  dontShowText: {
    color: colors.white,
    fontFamily: fonts?.montserratMedium,
    fontSize: 13,
    marginLeft: 10,
  },
  dateContainer: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  podcastThumbnail: {
    width: 130,
    height: 160,
    borderRadius: 20,
    marginLeft: 10,
  },
  reactionButtons: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 18,
    marginTop: 10,
    width: 60,
    // marginBottom: -10,
    // padding : 10
  },
  podcastMediaContainer: {
    width: '63%',
    alignItems: 'center',
  },
  podcastHeading: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.text,
    fontFamily: fonts.montserratBlack,
  },
  podcastSubheading: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.text,
    fontFamily: fonts.montserratMedium,
    marginVertical: 2,
  },
});
