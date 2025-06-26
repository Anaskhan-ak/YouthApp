import {useNavigation} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Home} from '../assets/images/svgs';
import {height, Pixels, width} from '../constant';
import {colors} from '../utils/colors';
import {fonts} from '../utils/fonts';
import {bottomTabs} from '../utils/string';
import {BlurView} from '@react-native-community/blur';
import Svg, {
  ClipPath,
  Defs,
  ForeignObject,
  G,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';
// const Tab = createBottomTabNavigator();
import {LinearGradient as MainLinearGradient} from 'react-native-linear-gradient';
const BottomTabNavigator = () => {
  const navigation = useNavigation();
  const handlePress = screen => {
    navigation?.navigate(screen);
  };
  return (
    // <View style={styles?.container}>
    <MainLinearGradient
      colors={['#1D222C', 'transparent']}
      start={{x: 0, y: 2.5}}
      end={{x: 0, y: 0}}
      style={styles?.container}>
      <TouchableOpacity
        onPress={() => handlePress('Home')}
        style={styles?.homeView}>
        <Home />
      </TouchableOpacity>
      <View style={styles?.subContainer}>
        <BlurView
          blurAmount={40}
          blurType="light"
          style={StyleSheet.absoluteFillObject}
          // reducedTransparencyFallbackColor="#32BCD1"
        />
        <Svg
          width={Platform?.OS === 'android' ? width * 0.7 : width * 0.72}
          height={height * 0.072}
          viewBox="0 0 307 66"
          fill="none"
          style={StyleSheet.absoluteFill}>
          <ForeignObject
            x={-29.6152}
            y={-30}
            width={366.615}
            height={125.626}></ForeignObject>
          <G filter="url(#filter0_i_6544_7207)" data-figma-bg-blur-radius={30}>
            <Path
              d="M274.187 -1.43431e-06C292.309 -6.42162e-07 307 14.691 307 32.8132V32.8132C307 50.9354 292.309 65.6264 274.187 65.6264L33.198 65.6264C15.0758 65.6264 0.384824 50.9354 0.384825 32.8132V32.8132C0.384826 14.691 15.0758 -1.27604e-05 33.198 -1.19683e-05L274.187 -1.43431e-06Z"
              fill="url(#paint0_linear_6544_7207)"
              fillOpacity={0.55}
            />
          </G>
          <Defs>
            <ClipPath
              id="bgblur_0_6544_7207_clip_path"
              transform="translate(29.6152 30)">
              <Path d="M274.187 -1.43431e-06C292.309 -6.42162e-07 307 14.691 307 32.8132V32.8132C307 50.9354 292.309 65.6264 274.187 65.6264L33.198 65.6264C15.0758 65.6264 0.384824 50.9354 0.384825 32.8132V32.8132C0.384826 14.691 15.0758 -1.27604e-05 33.198 -1.19683e-05L274.187 -1.43431e-06Z" />
            </ClipPath>
            <LinearGradient
              id="paint0_linear_6544_7207"
              x1={381}
              y1={-67.5}
              x2={294.11}
              y2={157.885}
              gradientUnits="userSpaceOnUse">
              <Stop stopColor="#B7D1EE" />
              <Stop offset={1} stopColor="#32BCD1" />
            </LinearGradient>
          </Defs>
        </Svg>
        {bottomTabs?.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(item?.route)}
            style={styles?.iconView}>
            {item?.icon}
            <Text numberOfLines={1} style={styles?.title}>
              {item?.screen}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: () => null,
        tabBarStyle: {
          backgroundColor: 'rgba(54, 175, 214, 1)',
          alignSelf: 'flex-end',
          position: 'absolute',
          borderRadius: width * 0.1,
          bottom: height * 0.03,
          height: height * 0.07,
          marginHorizontal: width * 0.1,
        },
        tabBarActiveTintColor: colors?.white,
        tabBarInactiveTintColor: colors?.white,
      })}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={{height: height * 0.025}} />
              <Moment width={24} height={24} />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: width * 0.015,
                  fontFamily: fonts?.montserratExtraBold,
                  marginTop: height * 0.01,
                  color: colors?.white,
                }}>
                Moments
              </Text>
            </View>
          ),
        }}
        name="Moment"
        component={Interests}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={{height: height * 0.025}} />
              <Yudio width={24} height={24} fill={color} />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: width * 0.015,
                  fontFamily: fonts?.montserratExtraBold,
                  marginTop: height * 0.01,
                  color: colors?.white,
                }}>
                Yudio
              </Text>
            </View>
          ),
        }}
        name="Yudio"
        component={Interests}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={{height: height * 0.025}} />
              <LiveNow width={24} height={24} fill={color} />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: width * 0.015,
                  fontFamily: fonts?.montserratExtraBold,
                  marginTop: height * 0.01,
                  color: colors?.white,
                }}>
                Live Now
              </Text>
            </View>
          ),
        }}
        name="LiveNow"
        component={Interests}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={{height: height * 0.025}} />
              <NearBy width={24} height={24} fill={color} />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: width * 0.015,
                  fontFamily: fonts?.montserratExtraBold,
                  marginTop: height * 0.01,
                  color: colors?.white,
                }}>
                Nearby
              </Text>
            </View>
          ),
        }}
        name="NearBy"
        component={Interests}
      />
    </Tab.Navigator> */}
    </MainLinearGradient>
    // </View>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: height * 0.0,
    height: 146,
    // marginHorizontal: width * 0.02,
    width: width,
  },
  homeView: {
    width: Platform?.OS === 'ios' ? height * 0.07 : height * 0.08,
    borderRadius: width * 0.1,
    backgroundColor: colors?.pink,
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform?.OS === 'ios' ? height * 0.07 : height * 0.08,
    marginLeft: 15,
  },
  subContainer: {
    // backgroundColor: '#32BCD190',
    borderRadius: width * 0.1,
    height: Platform?.OS === 'ios' ? height * 0.07 : height * 0.08,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width * 0.7,
    paddingHorizontal: width * 0.08,
    overflow: 'hidden',
    marginRight: 10,
  },
  iconView: {alignItems: 'center', justifyContent: 'center'},
  title: {
    fontSize: Pixels(8),
    fontFamily: fonts?.montserratExtraBold,
    marginTop: height * 0.01,
    color: colors?.white,
  },
});
