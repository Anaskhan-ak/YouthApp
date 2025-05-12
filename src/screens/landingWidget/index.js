import {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {DontShowLandingWidget} from '../../assets/images/svgs';
import {apiCall} from '../../services/apiCall';
import Calendar from './components/Calender';
import AnalogWatch from './components/Clock';
import Notifications from './components/Notifications';
import {StackedNotifications} from './components/Swippable';
// import {useDispatch, useSelector} from 'react-redux';
import DateComponent from './components/Date';
import Podcast from './components/Podcast';
import {styles} from './styles/index';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator} from 'react-native';
import {colors} from '../../utils/colors';
import {getDataLocally} from '../../helper';

const {height, width} = Dimensions.get('window');

const LandingWidget = ({navigation}) => {
  const [chatToggle, setChatToggle] = useState(true);
  const [educationToggle, setEducationToggle] = useState(true);
  const [walletToggle, setWalletToggle] = useState(true);
  const [socialToggle, setSocialToggle] = useState(true);
  const [loading, setLoading] = useState(false);
  const [chatVisible, setChatVisible] = useState(true);
  const [educationVisible, setEducationVisible] = useState(true);
  const [walletVisible, setWalletVisible] = useState(true);
  const [socialVisible, setSocialVisible] = useState(true);
  const [stackNotificationCount, setStackNotificationCount] = useState(-1);
  const [userData, setUserData] = useState(null);
  const [items, setItems] = useState([]);
  const [widget, changeWidget] = useState('date');
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const notifications = await apiCall?.getNotifications({
          page: 1,
          pageSize: 3,
        });
        setItems(
          notifications?.map(item => ({
            id: item?.id,
            userId: item?.userId,
            content: item?.content,
            userName: `${item?.notificationFrom?.firstName} ${item?.notificationFrom?.lastName}`,
            userImage: item?.notificationFrom?.photo,
            createdAt: item?.create_at,
          })),
        );
      } catch (e) {
        console.log('Error fetching notifications', e);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);
  const toggleWidget = () => {
    if (widget === 'date') {
      changeWidget('calender');
    } else if (widget === 'calender') {
      changeWidget('podcast');
    } else {
      changeWidget('date');
    }
  };
  const user = async () => {
    const userData = await getDataLocally();
    setUserData(userData);
  };
  useEffect(() => {
    user();
  }, []);
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
      <SafeAreaView style={styles?.container}>
        <ScrollView contentContainerStyle={styles?.scrollView}>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.replace('Dashboard', {screen: 'Home'});
            }}
            style={styles?.skipButton}>
            <Text style={styles?.skiptetxt}>Skip it</Text>
          </TouchableOpacity> */}
          <Text style={styles?.GreetText}>Hi,</Text>
          <Text style={[styles?.GreetText, {marginTop: -height * 0.025}]}>
            {userData?.firstName}
          </Text>
          <View style={styles?.welcomeBox}>
            <Text style={styles?.welcomeText}>Welcome back to </Text>
            <Image
              style={styles?.logo}
              resizeMode="contain"
              source={require('../../assets/images/Logo.png')}
            />
            <Text style={styles?.welcomeText}> World</Text>
          </View>

          {widget === 'calender' ? (
            <View style={styles?.timewidget}>
              <AnalogWatch />
              <Calendar />
            </View>
          ) : widget === 'date' ? (
            <View style={styles?.timewidget}>
              <DateComponent />
              <Calendar />
            </View>
          ) : (
            <Podcast />
          )}

          {/* Notifications */}
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            style={styles?.notificationScroll}>
            {loading ? (
              <ActivityIndicator size="large" color={colors.white} />
            ) : (
              <>
                {items?.length > 0 && (
                  <View
                    style={{
                      height:
                        stackNotificationCount === -1
                          ? height * 0.12
                          : stackNotificationCount === 0
                          ? 0
                          : stackNotificationCount * (height * 0.12),
                      alignItems: 'center',
                    }}>
                    <StackedNotifications
                      count={setStackNotificationCount}
                      notifications={items}
                    />
                  </View>
                )}
                <View style={{height: 20}} />
                {items?.length > 0 && (
                  <Notifications
                    title="Chat"
                    toggle={chatToggle}
                    setToggle={setChatToggle}
                    isVisible={chatVisible}
                    setVisibility={setChatVisible}
                    notifications={items}
                  />
                )}
                {items?.length > 0 && (
                  <Notifications
                    title="Social"
                    toggle={socialToggle}
                    setToggle={setSocialToggle}
                    isVisible={socialVisible}
                    setVisibility={setSocialVisible}
                    notifications={items}
                  />
                )}
                {items?.length > 0 && (
                  <Notifications
                    title="Educational"
                    toggle={educationToggle}
                    setToggle={setEducationToggle}
                    isVisible={educationVisible}
                    setVisibility={setEducationVisible}
                    notifications={items}
                  />
                )}
                {items?.length > 0 && (
                  <Notifications
                    title="Wallet"
                    toggle={walletToggle}
                    setToggle={setWalletToggle}
                    isVisible={walletVisible}
                    setVisibility={setWalletVisible}
                    notifications={items}
                  />
                )}
              </>
            )}
          </ScrollView>

          <TouchableOpacity
            onPress={toggleWidget}
            style={styles?.changeWidgetButton}>
            <Text style={styles?.welcomeTextzO}>Change This widget</Text>
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
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LandingWidget;
