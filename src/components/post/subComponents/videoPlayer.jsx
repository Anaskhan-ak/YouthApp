import { BlurView } from '@react-native-community/blur';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import { PlayIcon } from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const PostVideo = ({url}) => {
  const [pause, setPause] = useState(false);
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  //   console.log("url", url)
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
      <View style={styles?.duration}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={1}
        />
        <Text style={styles?.durationText}>{formatTime(duration)}</Text>
      </View>
      <View style={{position: 'relative'}}>
        <VideoPlayer
          ref={videoRef}
          source={{uri: url}}
          style={styles.mediaImage}
          paused={pause}
          resizeMode="contain"
          hideControlsOnStart={true}
          // autoplay={true}
          onLoad={data => {
            setPause(true);
            setDuration(data.duration);
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
                style={[StyleSheet.absoluteFill, {borderRadius: width * 0.2}]}
                blurType="light"
                blurAmount={10}
              />
              <PlayIcon />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostVideo;

const styles = StyleSheet.create({
  mediaImage: {
    width: width * 0.89,
    height: height * 0.38,
    resizeMode: 'contain',
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
    position: 'absolute',
    zIndex: 11,
    right: width * 0.03,
    top: height * 0.01,
  },
  durationText: {
    color: colors?.white,
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.03,
  },
});
