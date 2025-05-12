import { BlurView } from '@react-native-community/blur';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BlackBackArrow, BlackYouthLogo } from '../../assets/images/svgs';
import YudioReactions from '../../components/reactions/yudioReactions';
import { height } from '../../constant';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import YudioCard from './components/yudioCard';
import { styles } from './styles';

const Yudios = ({route}) => {
  // const {yudio} = route?.params;
  const [yudios, setYudios] = useState([]);
  const [showFullText, setShowFullText] = useState(false);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchYudios = async () => {
      const data = {
        userId: 'cm60ql39f003l91r8l18bd80z',
        page: 1,
        pageSize: 15,
      };
      try {
        const result = await apiCall?.getAllYudios(data);
        // console.log('Successfully fetched all yudios', result);
        setYudios(result);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching all yudios', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchYudios();
    // if (yudio) {
    //   console.log("Yudio", yudio)
    //   setYudios([yudio, ...yudios]);
    // }
  }, []);

  const EmptyComponent = () => {
    return (
      <View style={styles?.emptyComp}>
        <Text style={styles?.emptyCompText}>Failed to load yudios</Text>
      </View>
    );
  };

  const RenderYudios = ({yudio}) => {
    // console.log('Yudio', yudio?.yudios);
    return (
      <>
        {yudios?.length === 0 ? (
          <EmptyComponent />
        ) : (
          <View style={styles?.renderItem}>
            {/* Yudio Card */}
            <YudioCard yudio={yudio?.yudios} />
            {/* Reactions */}
            <View style={styles?.reactions}>
              <YudioReactions />
            </View>
            {/* Suggested Yudios */}
            <View style={styles?.suggestedView}>
              <Text style={styles?.suggestedHeading}>
                More by {`${yudio?.user?.firstName} ${yudio?.user?.lastName}`}
              </Text>
              <FlatList
                data={yudios
                  ?.filter(item => item?.userId === 'cm60ql39f003l91r8l18bd80z')
                  ?.slice(0, 3)}
                renderItem={({item}) => {
                  // console.log("Item", item)
                  return (
                    <TouchableOpacity style={styles?.suggestedButton}>
                      <Image
                        source={
                          item?.yudios?.thumbnail
                            ? {uri: item?.yudios?.thumbnail}
                            : require('../../assets/images/SignupImage.jpeg')
                        }
                        style={styles?.suggestedImage}
                      />
                    </TouchableOpacity>
                  );
                }}
                horizontal
              />
            </View>
            {/* Blur Bottom View */}
            <View style={styles?.blurContainer}>
              <ScrollView
                style={styles?.scrollContainer}
                contentContainerStyle={{paddingBottom: 10}} // optional padding
                scrollEnabled={false} // disable scroll so it expands fully
              >
                <Text style={styles?.blurText}>
                  {yudio?.yudios?.caption?.length > 100 && !showFullText
                    ? `${yudio?.yudios?.caption?.substring(0, 100)}... `
                    : yudio?.yudios?.caption + ' '}
                  {yudio?.yudios?.caption?.length > 100 && (
                    <Text
                      onPress={() => setShowFullText(prev => !prev)}
                      style={styles?.seeAllText}>
                      {showFullText ? 'See less' : 'Show more'}
                    </Text>
                  )}
                </Text>
              </ScrollView>

              <View style={styles?.tagsContainer}>
                {['#fashion', '#holiday', '#beach'].map(item => (
                  <TouchableOpacity key={item}>
                    <Text style={styles?.tagText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <BlurView
                style={[StyleSheet.absoluteFill, styles.blur]}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
              />
            </View>
          </View>
        )}
      </>
    );
  };

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
      {/* <StatusBar barStyle='dark-content' backgroundColor={'transparent'} translucent/> */}
      {/* Header */}
      <View style={styles?.header}>
        <TouchableOpacity style={styles?.headerIcon}>
          <BlackBackArrow />
        </TouchableOpacity>
        {['For You', 'Following', 'Trending', 'Live']?.map(item => {
          return (
            <TouchableOpacity>
              <Text style={[styles?.headerText, {color: colors?.gray}]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity style={styles?.headerIcon}>
          <BlackYouthLogo />
        </TouchableOpacity>
      </View>
      <FlatList
        data={yudios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <RenderYudios yudio={item} />}
        ListEmptyComponent={<Loader />}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={height}
        snapToAlignment="start"
      />
    </SafeAreaView>
  );
};

export default Yudios;
