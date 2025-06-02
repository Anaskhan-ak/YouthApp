import { useRef } from 'react';
import { FlatList, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '../../components/headers/homeHeader';
import Post from '../../components/post';
import RNBottomSheet from '../../components/sheets/BottomSheet';
import Stories from '../../components/stories';
import { height } from '../../constant';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import { colors } from '../../utils/colors';
import CategorySelector from './components/categorySelector/Index';
import SideBar from './components/sideBar';
import { data, eventData, musicData, yudioData } from './constants';

const Home = () => {
  const refRBSheet = useRef(null);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent backgroundColor={'transparent'}></StatusBar>
      <LinearGradient
        colors={[colors?.RGB3, colors?.RGB4]}
        style={{marginTop: Platform?.OS === 'ios' && -height * 0.08}}>
        <HomeHeader />
        <CategorySelector />
      </LinearGradient>
      <FlatList
        ListHeaderComponent={<Stories />}
        data={[data, eventData, yudioData, musicData]}
        renderItem={({item}) => <Post post={item} />}
      />
      {/* <BlurView
        style={{
          position: 'absolute',
          top: height * 0.19,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      /> */}
      <SideBar refRBSheet={refRBSheet} />
      <RNBottomSheet sheetRef={refRBSheet} />
      <BottomTabNavigator />
    </SafeAreaView>
  );
};

export default Home;
