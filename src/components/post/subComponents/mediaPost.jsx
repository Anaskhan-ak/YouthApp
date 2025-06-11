import { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { TagFriends } from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import CircleCounter from '../subComponents/CircleCounter';
import PostBottomTab from '../subComponents/postBottomTab';
import PostVideo from './videoPlayer';
// import VideoPlayer from './videoPlayer';

const MediaPost = ({post, modal}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaWidth, setMediaWidth] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const handleMediaLayout = event => {
    const {width} = event.nativeEvent.layout;
    setMediaWidth(width);
  };

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    setActiveIndex(viewableItems[0].index);
    setActiveVideo(null);
  }).current;

  const renderItem = ({item, index}) => {
    const isVideo = ['MOV', 'mp4', 'm3u8'].includes(item?.split('.')?.pop());
    const isActiveVideo = activeVideo === item;
    const paused = !isActiveVideo;
    console.log('pause', paused)

    const handleTogglePlay = () => {
      const nextActive = activeVideo === item ? null : item;
      const willBePaused = nextActive !== item; // 👈 future paused state
      console.log('Paused', willBePaused);
      console.log('active video', nextActive);
      setActiveVideo(nextActive);
    };

    return (
      <TouchableOpacity
        onLongPress={() => modal?.setModal(prev => ({...prev, isPost: true}))}>
        <View onLayout={handleMediaLayout} style={styles.mediaContainer}>
          {!isVideo && (
            <View style={styles.mediaElements}>
              <TouchableOpacity>
                <TagFriends />
              </TouchableOpacity>
              {post?.media?.url?.length > 1 && (
                <CircleCounter
                  segments={post?.media?.length}
                  filled={index + 1}
                  centerText={index + 1}
                  activeColor={colors?.white}
                  inactiveColor={colors?.gray}
                  centerTextColor={colors?.white}
                />
              )}
            </View>
          )}

          {isVideo ? (
            <PostVideo
              url={item}
              paused={paused} // ✅ always correct
              togglePlay={handleTogglePlay}
            />
          ) : (
            <Image
              source={{uri: item}}
              style={styles.mediaImage}
              resizeMode="contain"
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={post?.media?.url}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `${index}_${activeIndex}`}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />
      {post?.media?.url?.length > 1 && (
        <View style={styles.pagination}>
          {post?.media?.url?.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    activeIndex === index ? colors.RGB2 : colors.white,
                  width: activeIndex === index ? width * 0.06 : width * 0.027,
                },
              ]}
            />
          ))}
        </View>
      )}
      {!modal?.modal?.isPost && (
        <View style={[styles.reactionsTab, {width: mediaWidth}]}>
          <PostBottomTab post={post} />
        </View>
      )}
    </View>
  );
};

export default MediaPost;

const styles = StyleSheet.create({
  mediaContainer: {
    backgroundColor: colors?.black,
    marginHorizontal: height * 0.01,
    borderRadius: width * 0.04,
    marginTop: height * 0.015,
    overflow: 'hidden',
  },
  mediaElements: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.03,
    position: 'absolute',
    zIndex: 10,
    width: width * 0.82,
    // backgroundColor : 'red',
    marginTop: height * 0.01,
    padding: width * 0.01,
  },
  mediaImage: {
    width: width * 0.89,
    height: height * 0.38,
    resizeMode: 'contain',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
    top: height * 0.32,
    width: width * 0.82,
    alignSelf: 'center',
  },
  dot: {
    height: width * 0.027,
    borderRadius: width * 0.027,
    marginHorizontal: width * 0.01,
  },
  reactionsTab: {
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
    right: height * 0.0045,
    left: height * 0.01,
    alignSelf: 'center',
  },
});
