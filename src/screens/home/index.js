import { BlurView } from '@react-native-community/blur';
import { useIsFocused } from '@react-navigation/native';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyComponent from '../../components/empty';
import HomeHeader from '../../components/headers/homeHeader';
import Post from '../../components/post';
import RNBottomSheet from '../../components/sheets/BottomSheet';
import Stories from '../../components/stories';
import { height } from '../../constant';
import usePagination from '../../hooks/usePagination';
import useUser from '../../hooks/user';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import CategorySelector from './components/categorySelector/Index';
import SideBar from './components/sideBar';

const Home = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);
  const refRBSheet = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const isFocus = useIsFocused();
  const user = useUser();
  const {
    data,
    totalResult,
    refreshing,
    loadingMore,
    handleRefresh,
    loadMore,
    initialLoader,
  } = usePagination({
    url: apiCall?.getAllPosts,
    body: {
      userId: 'cmbhntz1u000325i4b6291aew',
      page: 1,
      pageSize: 10,
    },
  });
  // useEffect(() => {
  //   fetchPosts();
  //   fetchPostsAndYudios();
  // }, [isFocus]);
  // const fetchPosts = async () => {
  //   const userData = await getDataLocally();
  //   const body = {
  //     userId: userData?.id,
  //     page,
  //     pageSize,
  //   };
  //   try {
  //     const response = await apiCall?.getAllPosts(body);
  //     setPosts(response?.data?.posts);
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  // const onRefresh = () => {
  //   fetchPosts();
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 3000);
  // };
  // const fetchPostsAndYudios = async () => {
  //   setLoading(true);
  //   const userDetails = await getDataLocally();
  //   const body = {
  //     userId: userDetails?.id,
  //     page: 1,
  //     pageSize: 8,
  //   };

  //   try {
  //     const [postsResponse, yudiosResponse] = await Promise.all([
  //       apiCall?.getAllPosts(body),
  //       apiCall?.getAllYudios(body),
  //     ]);

  //     // console.log('yudiosResponse', yudiosResponse);

  //     const postsData = postsResponse?.data?.posts || [];
  //     const yudiosData = yudiosResponse?.data?.posts || [];

  //     // Inject yudios randomly into posts
  //     const combined = [...postsData];
  //     for (let i = 0; i < yudiosData.length; i++) {
  //       const randomIndex = Math.floor(Math.random() * (combined.length + 1));
  //       console.log('Random Index', randomIndex);
  //       combined.splice(randomIndex, 0, yudiosData[i]);
  //     }

  //     // console.log('Combined feed:', combined);
  //     setPosts(combined || []);
  //   } catch (error) {
  //     console.error('Error fetching posts/yudios', error);
  //     setPosts([]);
  //     toast('error', 'Error fetching posts');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const renderFooter = () => {
    if (!loadingMore || data?.length < 8) return null; //show footer only for subsequent pages
    return <ActivityIndicator size={'large'} animating />;
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

      {initialLoader ? (
        <ActivityIndicator size={'large'} color={colors?.RGB1} />
      ) : data?.length === 0 ? (
        <EmptyComponent title="Failed to load posts" />
      ) : (
        <FlatList
          ListHeaderComponent={<Stories />}
          data={data}
          // keyExtractor={item => item?._id.toString()}
          renderItem={({item}) => (
            <Post post={item} isScrolling={isScrolling} />
          )}
          contentContainerStyle={{paddingBottom: height * 0.1}}
          // ListFooterComponent={<SuggestedUsers />}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          onScrollBeginDrag={() => {
            console.log('started scrolling');
            setIsScrolling(true);
          }}
          onScrollEndDrag={() => {
            console.log('stopped scrolling');
            setIsScrolling(false);
          }}
        />
      )}

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
      <RNBottomSheet setIsSheetOpen={setIsSheetOpen} sheetRef={refRBSheet} />
      <BottomTabNavigator />
    </SafeAreaView>
  );
};

export default Home;
