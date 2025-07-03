import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VerticalWhiteDots, WhiteBackArrow } from '../../assets/images/svgs';
import EmptyComponent from '../../components/empty';
import { toast } from '../../components/toast';
import { getDataLocally } from '../../helper';
import useUser from '../../hooks/user';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import RenderMoments from './components/renderMoments';
import { styles } from './styles';

const Moments = ({route}) => {
  const [moments, setMoments] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const user = useUser();
  const {height} = useWindowDimensions();
  const [scrollInfo, setScrollInfo] = useState({isViewable: true, index: 0});
  const refFlatList = useRef(null);

  const viewabilityConfig = useRef({viewAreaCoveragePercentThreshold: 80});

  const onViewableItemsChanged = useCallback(({changed}) => {
    if (changed.length > 0) {
      setScrollInfo({
        isViewable: changed[0].isViewable,
        index: changed[0].index,
      });
    }
  }, []);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: height,
      offset: height * index,
      index,
    }),
    [height],
  );

  const keyExtractor = useCallback(item => `${item.id}`, []);
  const renderItem = useCallback(
    ({item, index}) => {
      const {index: scrollIndex} = scrollInfo;
      const isNext = Math.abs(index - scrollIndex) <= 1;

      return (
        <RenderMoments
          moment={item}
          index={index}
          isNext={isNext}
          visible={scrollInfo}
          isVisible={scrollIndex === index}
        />
      );
    },
    [scrollInfo],
  );

  useEffect(() => {
    const fetchMoments = async () => {
      setLoading(true);
      const userDetails = await getDataLocally();
      if (!userDetails) {
        toast('error', 'User not found. Please login again');
        setLoading(false);
        return;
      }

      const data = {
        userId: userDetails.id,
        page,
        pageSize,
      };

      try {
        const result = await apiCall?.getAllMoments(data);
        // console.log('moments fetched successfully', result);
        let newMoments = result || [];
        if (route?.params?.moment) {
        newMoments = [route.params.moment, ...newMoments];
      }
        setMoments(result || []);
      } catch (error) {
        console.log('Error fetching all moments', error);
        toast('error', 'Error fetching moments');
        setMoments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMoments();
  }, [route?.params?.moment]);

  const handleScroll = event => {
    const x = event.nativeEvent.contentOffset.x;
    const index = x / height;
    setPage(index);
  };

  const Loader = () => {
    return (
      <View style={styles?.emptyComp}>
        <ActivityIndicator size={'large'} color={colors?.RGB1} />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles?.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'black'}
        // translucent
      />
      {loading ? (
        <Loader /> // Full-screen loader while fetching
      ) : moments?.length === 0 ? (
        <EmptyComponent text="Failed to load moments" />
      ) : (
        <View style={styles.flexContainer}>
          {/* Header */}
          <View style={styles?.header}>
            <TouchableOpacity
              onPress={() => navigation?.navigate('Home')}
              style={styles?.headerIcon}>
              <WhiteBackArrow />
            </TouchableOpacity>
            {['For You', 'Following', 'Trending']?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation?.navigate('Home')}>
                  <Text style={[styles?.headerText, {color: colors?.gray}]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={styles?.headerIcon}
              onPress={() => navigation?.navigate('Home')}>
              <VerticalWhiteDots />
            </TouchableOpacity>
          </View>
          <FlatList
            pagingEnabled
            showsVerticalScrollIndicator={false}
            ref={refFlatList}
            automaticallyAdjustContentInsets
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig.current}
            onScroll={handleScroll}
            data={moments?.slice(0, 1)}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            decelerationRate="fast"
            keyExtractor={keyExtractor}
            onEndReachedThreshold={0.2}
            removeClippedSubviews
            bounces={false}
            scrollEventThrottle={16}
            snapToInterval={height}
            snapToAlignment="start"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Moments;
