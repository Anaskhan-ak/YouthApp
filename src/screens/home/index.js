import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyComponent from '../../components/empty';
import HomeHeader from '../../components/headers/homeHeader';
import Post from '../../components/post';
import SuggestedUsers from '../../components/post/subComponents/suggestedUsers';
import RNBottomSheet from '../../components/sheets/BottomSheet';
import Stories from '../../components/stories';
import { toast } from '../../components/toast';
import { height } from '../../constant';
import { getDataLocally } from '../../helper';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import CategorySelector from './components/categorySelector/Index';
import SideBar from './components/sideBar';

const Home = () => {
  const refRBSheet = useRef(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPostsAndYudios = async () => {
      setLoading(true);
      const userDetails = await getDataLocally();
      const body = {
        userId: userDetails?.id,
        page: 1,
        pageSize: 50,
      };

      try {
        const [postsResponse, yudiosResponse] = await Promise.all([
          apiCall?.getAllPosts(body),
          apiCall?.getAllYudios(body),
        ]);

        // console.log('yudiosResponse', yudiosResponse);

        const postsData = postsResponse?.data?.posts || [];
        const yudiosData = yudiosResponse?.data?.posts || [];

        // Inject yudios randomly into posts
        const combined = [...postsData];
        for (let i = 0; i < yudiosData.length; i++) {
          const randomIndex = Math.floor(Math.random() * (combined.length + 1));
          console.log("Random Index", randomIndex)
          combined.splice(randomIndex, 0, yudiosData[i]);
        }

        // console.log('Combined feed:', combined);
        setPosts(combined || []);
      } catch (error) {
        console.error('Error fetching posts/yudios', error);
        setPosts([]);
        toast('error', 'Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndYudios();
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
      {loading ? (
        <ActivityIndicator size={'large'} color={colors?.RGB1} />
      ) : posts?.length === 0 ? (
        <EmptyComponent title="Failed to load posts" />
      ) : (
        <FlatList
          ListHeaderComponent={<Stories />}
          data={posts}
          renderItem={({item}) => <Post post={item} />}
          contentContainerStyle={{paddingBottom: height * 0.1}}
          ListFooterComponent={<SuggestedUsers />}
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
      <RNBottomSheet sheetRef={refRBSheet} />
      <BottomTabNavigator />
    </SafeAreaView>
  );
};

export default Home;
