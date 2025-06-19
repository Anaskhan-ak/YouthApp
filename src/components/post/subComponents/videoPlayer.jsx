import {BlurView} from '@react-native-community/blur';
import {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import {MuteIcon, PlayIcon, UnmuteIcon} from '../../../assets/images/svgs';
import {height, width} from '../../../constant';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

const PostVideo = ({url, isScrolling, isMoment}) => {
  const [pause, setPause] = useState(false);
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
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

  useEffect(() => {
    if (videoRef?.current) {
      if (!pause && isScrolling) {
        //if a video is playing and we start scrolling
        // videoRef?.current?.stop();
        setPause(true);
        console.log('Video stopped');
      }
    }
  }, [pause, isScrolling]);

  return (
    <View>
      <View style={styles?.mediaElements}>
        <TouchableOpacity
          style={styles?.icon}
          onPress={() => setMuted(prev => !prev)}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={1}
          />
          {muted ? <MuteIcon /> : <UnmuteIcon />}
        </TouchableOpacity>
        <View style={styles?.icon}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={1}
          />
          <Text style={styles?.durationText}>
            {formatTime(Math.max(duration - currentTime, 0))}
          </Text>
        </View>
      </View>

      {/* Video with Overlay Play Button */}
      <View style={{position: 'relative'}}>
        <VideoPlayer
          ref={videoRef}
          source={{uri: url}}
          style={[
            styles.mediaImage,
            {height: isMoment ? height * 0.5 : height * 0.38},
          ]}
          paused={pause}
          muted={muted}
          resizeMode="cover"
          hideControlsOnStart={true}
          onLoad={data => {
            setPause(true); // Start paused
            setDuration(data.duration); // total duration in seconds
          }}
          onProgress={data => {
            setCurrentTime(data.currentTime); // current playback time
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

        {/* Transparent overlay for play/pause toggle */}
        <TouchableOpacity
          onPress={() => setPause(prev => !prev)}
          activeOpacity={1}
          style={[StyleSheet.absoluteFill, {zIndex: 10}]}>
          {/* Show play icon only when paused */}
          {pause && (
            <View style={[styles.playButton, {top: isMoment ? height * 0.22:height * 0.16}]}>
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
    resizeMode: 'contain',
  },
  playButton: {
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
    paddingLeft: width * 0.015,
  },
  mediaElements: {
    position: 'absolute',
    zIndex: 11,
    right: width * 0.03,
    top: height * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.2,
  },
  icon: {
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
