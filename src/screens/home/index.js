import {useEffect, useRef, useState} from 'react';
import {FlatList, Platform, RefreshControl, StatusBar} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeHeader from '../../components/headers/homeHeader';
import Post from '../../components/post';
import SuggestedUsers from '../../components/post/subComponents/suggestedUsers';
import RNBottomSheet from '../../components/sheets/BottomSheet';
import Stories from '../../components/stories';
import {height} from '../../constant';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import {apiCall} from '../../services/apiCall';
import {colors} from '../../utils/colors';
import CategorySelector from './components/categorySelector/Index';
import SideBar from './components/sideBar';
import {BlurView} from '@react-native-community/blur';
import {useIsFocused} from '@react-navigation/native';
import {getDataLocally} from '../../helper';

const Home = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const refRBSheet = useRef(null);
  const isFocus = useIsFocused();
  useEffect(() => {
    fetchPosts();
  }, [isFocus]);
  const fetchPosts = async () => {
    const userData = await getDataLocally();
    const body = {
      userId: userData?.id,
      page: 1,
      pageSize: 20,
    };
    try {
      const response = await apiCall?.getAllPosts(body);
      setPosts(response?.data?.posts);
    } catch (error) {
      throw error;
    }
  };
  const onRefresh = () => {
    fetchPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent backgroundColor={'transparent'}></StatusBar>
      <LinearGradient
        colors={[colors?.RGB3, colors?.RGB4]}
        style={{marginTop: Platform?.OS === 'ios' && -height * 0.08}}>
        <HomeHeader />
        <CategorySelector />
      </LinearGradient>
      {isSheetOpen && (
        <BlurView
          style={{
            position: 'absolute',
            top: height * 0.11,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
      )}
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={<Stories />}
        data={posts}
        renderItem={({item}) => <Post post={item} />}
        contentContainerStyle={{paddingBottom: height * 0.1}}
        ListFooterComponent={<SuggestedUsers />}
      />
      <SideBar refRBSheet={refRBSheet} />
      <RNBottomSheet setIsSheetOpen={setIsSheetOpen} sheetRef={refRBSheet} />
      <BottomTabNavigator />
    </SafeAreaView>
  );
};

export default Home;
