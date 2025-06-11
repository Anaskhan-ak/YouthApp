import { BlurView } from '@react-native-community/blur';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import { MuteIcon, PlayIcon, UnmuteIcon } from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const PostVideo = ({url, paused, togglePlay}) => {
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
    if (!videoRef.current) return;

    if (paused) {
      videoRef?.current?.resume();
    } else {
      videoRef?.current?.pause();
    }
  }, [paused]);

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
          style={styles.mediaImage}
          paused={paused}
          muted={muted}
          resizeMode="contain"
          hideControlsOnStart={true}
          onLoad={data => {
            setDuration(data.duration);
          }}
          onProgress={data => {
            setCurrentTime(data.currentTime);
          }}
        />

        {/* Transparent overlay for play/paused toggle */}
        <TouchableOpacity
          // onPress={() => setPause(!paused)}
          onPress={togglePlay}
          activeOpacity={1}
          style={[StyleSheet.absoluteFill, {zIndex: 10}]}>
          {/* Show play icon only when paused */}
          {paused && (
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
