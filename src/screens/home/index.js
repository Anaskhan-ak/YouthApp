import { useEffect, useRef, useState } from 'react';
import { FlatList, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '../../components/headers/homeHeader';
import Post from '../../components/post';
import SuggestedUsers from '../../components/post/subComponents/suggestedUsers';
import RNBottomSheet from '../../components/sheets/BottomSheet';
import Stories from '../../components/stories';
import { height } from '../../constant';
import { getDataLocally } from '../../helper';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import CategorySelector from './components/categorySelector/Index';
import SideBar from './components/sideBar';

const Home = () => {
  const refRBSheet = useRef(null);
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      const userDetails = await getDataLocally()
      const body = {
        userId: userDetails?.id,
        page: 1,
        pageSize: 50,
      };
      try {
        const response = await apiCall?.getAllPosts(body);
        console.log('Get All Posts', response?.data?.posts);
        setPosts(response?.data?.posts)
      } catch (error) {
        throw error
      }
    };
    fetchPosts()
  }, []);
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
        data={posts}
        renderItem={({item}) => <Post post={item} />}
        contentContainerStyle={{paddingBottom : height * 0.1}}
        ListFooterComponent={<SuggestedUsers/>}
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
