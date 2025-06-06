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
  const [play, setPlay] = useState(false); //play=false --> pause  play=true --> play
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

  useEffect(() => {
    if (videoRef?.current) {
      if (play) {
        videoRef?.current?.pause();
      } else {
        videoRef?.current?.resume();
      }
    }
  }, [play]);
  return (
    <View>
      <FlatList
        data={post?.media?.url}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onLongPress={() =>
                modal?.setModal(prev => ({...prev, isPost: true}))
              }>
              <View
                onLayout={handleMediaLayout}
                style={[
                  styles.mediaContainer,
                  // , modal === true && {
                  //   position : "absolute",
                  //   zIndex : 100            }
                ]}>
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
                  {(item?.split('.')?.pop() === 'MOV' || //m3u8
                    item?.split('.')?.pop() === 'mp4' ||
                    item?.split('.')?.pop() === 'm3u8') && (
                    <View style={styles?.duration}>
                      <BlurView
                        style={StyleSheet.absoluteFill}
                        blurType="light"
                        blurAmount={1}
                      />
                      <Text style={styles?.durationText}>
                        {formatTime(duration)}
                      </Text>
                    </View>
                  )}
                </View>
                {item?.split('.')?.pop() === 'MOV' || //m3u8
                item?.split('.')?.pop() === 'mp4' ||
                item?.split('.')?.pop() === 'm3u8' ? (
                  <TouchableOpacity
                    onPress={() => setPlay(prev => !prev)}>
                    <VideoPlayer
                      ref={videoRef}
                      source={{uri: item}}
                      style={styles.mediaImage}
                      paused={!play}
                      resizeMode="contain"
                      hideControlsOnStart={true}
                      autoplay={true}
                      onLoad={data => setDuration(data.duration)}
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
                    {play && (
                      <View style={styles.playButton} activeOpacity={0.7}>
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
                ) : (
                  <Image
                    source={{uri: item}}
                    style={styles.mediaImage}
                    resizeMode="cover"
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
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
    resizeMode: 'cover',
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
    backgroundColor: colors?.black,
    borderRadius: width * 0.2,
    position: 'absolute',
    zIndex: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    left: width * 0.4,
    top: height * 0.165,
    padding: width * 0.02,
    width: width * 0.1,
    height: width * 0.1,
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
