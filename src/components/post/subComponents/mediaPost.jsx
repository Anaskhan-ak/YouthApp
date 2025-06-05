import { BlurView } from '@react-native-community/blur';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import { PlayIcon, TagFriends } from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import CircleCounter from '../subComponents/CircleCounter';
import PostBottomTab from '../subComponents/postBottomTab';

const MediaPost = ({post, modal}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaWidth, setMediaWidth] = useState(null);
  const [pause, setPause] = useState(false); 
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleMediaLayout = event => {
    const {width} = event.nativeEvent.layout;
    setMediaWidth(width);
  };

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({item, index}) => {
    const isVideo =
      item?.split('.')?.pop() === 'MOV' ||
      item?.split('.')?.pop() === 'mp4' ||
      item?.split('.')?.pop() === 'm3u8';
    return (
      <TouchableOpacity
        onLongPress={() => modal?.setModal(prev => ({...prev, isPost: true}))}>
        <View onLayout={handleMediaLayout} style={styles.mediaContainer}>
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
            {isVideo && (
              <View style={styles?.duration}>
                <BlurView
                  style={StyleSheet.absoluteFill}
                  blurType="light"
                  blurAmount={1}
                />
                <Text style={styles?.durationText}>{formatTime(duration)}</Text>
              </View>
            )}
          </View>
          {isVideo ? (
            <View style={{position: 'relative'}}>
              <VideoPlayer
                ref={videoRef}
                source={{uri: item}}
                style={styles.mediaImage}
                paused={pause}
                resizeMode="contain"
                hideControlsOnStart={true}
                // autoplay={true}
                onLoad={data => {
                  setPause(true)
                  setDuration(data.duration)
                }}
                bufferConfig={{
                  minBufferMs: 15000,
                  maxBufferMs: 50000,
                  bufferForPlaybackMs: 2500,
                  bufferForPlaybackAfterRebufferMs: 5000,
                  backBufferDurationMs: 120000,
                  cacheSizeMB: 0,
                  live: {targetOffsetMs: 500},
                }}
              />

              {/* Transparent Touchable area over the whole video */}
              <TouchableOpacity
                onPress={() => setPause(!pause)}
                activeOpacity={1}
                style={[StyleSheet.absoluteFill, {zIndex: 10}]}>
                {/* Show Play button only when paused */}
                {pause && (
                  <View style={styles.playButton}>
                    <BlurView
                      style={[
                        StyleSheet.absoluteFill,
                        {borderRadius: width * 0.2},
                      ]}
                      blurType="light"
                      blurAmount={10}
                    />
                    <PlayIcon />
                  </View>
                )}
              </TouchableOpacity>
            </View>
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

  useEffect(() => {
    if (videoRef?.current) {
      if (pause) {
        videoRef?.current?.pause();
      } else {
        videoRef?.current?.resume();
      }
    }
  }, [pause]);
  return (
    <View>
      <FlatList
        data={post?.media?.url}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
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
  playButton: {
    // backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: width * 0.2,
    position: 'absolute',
    zIndex: 11,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    left: width * 0.37,
    top: height * 0.16,
    alignSelf: 'center',
    width: width * 0.15,
    height: width * 0.15,
  },
  duration: {
    backgroundColor: colors?.black,
    borderRadius: width * 0.02,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.02,
    paddingVertical: width * 0.01,
  },
  durationText: {
    color: colors?.white,
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.03,
  },
});
