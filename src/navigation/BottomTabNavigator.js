import { useNavigation } from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Home } from '../assets/images/svgs';
import { height, width } from '../constant';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import { bottomTabs } from '../utils/string';

// const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  const handlePress = screen => {
    navigation?.navigate(screen);
  };
  return (
    <View style={styles?.container}>
      <TouchableOpacity
        onPress={() => handlePress('Home')}
        style={styles?.homeView}>
        <Home />
      </TouchableOpacity>
      <View style={styles?.subContainer}>
        {bottomTabs?.map(item => (
          <TouchableOpacity
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
    </View>
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
    bottom: height * 0.04,
    marginHorizontal: width * 0.02,
  },
  homeView: {
    width: Platform?.OS === 'ios' ? height * 0.07 : height * 0.08,
    borderRadius: width * 0.1,
    backgroundColor: colors?.pink,
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform?.OS === 'ios' ? height * 0.07 : height * 0.08,
  },
  subContainer: {
    backgroundColor: 'rgba(54, 175, 214, 1)',
    borderRadius: width * 0.1,
    height: Platform?.OS === 'ios' ? height * 0.07 : height * 0.08,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '78%',
    paddingHorizontal: width * 0.08,
  },
  iconView: {alignItems: 'center', justifyContent: 'center'},
  title: {
    fontSize: width * 0.015,
    fontFamily: fonts?.montserratExtraBold,
    marginTop: height * 0.01,
    color: colors?.white,
  },
});
