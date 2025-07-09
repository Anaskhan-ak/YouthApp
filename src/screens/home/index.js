import {BlurView} from '@react-native-community/blur';
import {useIsFocused} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import EmptyComponent from '../../components/empty';
import HomeHeader from '../../components/headers/homeHeader';
import Post from '../../components/post';
import RNBottomSheet from '../../components/sheets/BottomSheet';
import Stories from '../../components/stories';
import {height} from '../../constant';
import {getDataLocally} from '../../helper';
import usePagination from '../../hooks/usePagination';
import useUser from '../../hooks/user';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import {apiCall} from '../../services/apiCall';
import {colors} from '../../utils/colors';
import CategorySelector from './components/categorySelector/Index';
import SideBar from './components/sideBar';
import RateModal from '../../components/modals/rate';

const Home = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const refRBSheet = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isRateModal, setIsRateModal] = useState(true);
  const [stories, setStories] = useState([]);
  const isFocus = useIsFocused();
  const user = useUser();
  const [currentAudioId, setCurrentAudioId] = useState('');
  const {
    data,
    refreshing,
    loadingMore,
    handleRefresh,
    loadMore,
    initialLoader,
  } = usePagination(
    {
      url: apiCall?.getAllPosts,
      body: {
        // userId: user?.id,
        page: 1,
        pageSize: 10,
      },
    },
    [isFocus],
  );
  const renderFooter = () => {
    if (!loadingMore || data?.length < 8) return null; //show footer only for subsequent pages
    return <ActivityIndicator size={'large'} animating />;
  };
  const getStories = async () => {
    try {
      const userData = await getDataLocally();
      const stories = await apiCall?.getStories({userId: userData?.id});
      setStories(stories);
    } catch (e) {
      console.log('e', e);
    } finally {
    }
  };
  useEffect(() => {
    getStories();
  }, [isFocus]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent backgroundColor={'transparent'}></StatusBar>
      <LinearGradient
        colors={[colors?.RGB3, colors?.RGB4]}
        style={{
          marginTop: Platform?.OS === 'ios' && -height * 0.08,
          zIndex: 999,
        }}>
        <HomeHeader />
        <CategorySelector />
      </LinearGradient>
      {/* <SuggestedMoments/> */}
      {initialLoader ? (
        <ActivityIndicator size={'large'} color={colors?.RGB1} />
      ) : data?.length === 0 ? (
        <EmptyComponent title="Failed to load posts" />
      ) : (
        <FlatList
          ListHeaderComponent={<Stories stories={stories} />}
          data={data}
          // keyExtractor={item => item?._id.toString()}
          renderItem={({item, index}) => (
            <Post
              post={item}
              isScrolling={isScrolling}
              index={index}
              currentAudioId={currentAudioId}
              setCurrentAudioId={setCurrentAudioId}
            />
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
            setIsScrolling(true);
          }}
          onScrollEndDrag={() => {
            setIsScrolling(false);
          }}
        />
      )}
      {isSheetOpen && (
        <BlurView
          style={[StyleSheet.absoluteFill]}
          blurType={Platform?.OS === 'ios' ? 'dark' : 'light'}
          blurAmount={3}
          reducedTransparencyFallbackColor="white"
        />
      )}
      {/* <RateModal setIsModal={setIsRateModal} isModal={isRateModal}/> */}
      <SideBar refRBSheet={refRBSheet} />
      <RNBottomSheet setIsSheetOpen={setIsSheetOpen} sheetRef={refRBSheet} />
      <BottomTabNavigator />
    </SafeAreaView>
  );
};

export default Home;
