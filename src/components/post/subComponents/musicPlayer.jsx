import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import {
  GradientPauseIcon,
  GradientPlayIcon,
  WhiteBackwardAudioIcon,
  WhiteForwardAudioIcon,
} from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors/index';

const MusicPlayer = ({audioURL}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const playPauseHandler = () => {
    try {
      if (isPlaying) {
        SoundPlayer.pause();
      } else {
        SoundPlayer.playUrl(
          audioURL
            ? audioURL
            : 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        );
      }
      setIsPlaying(!isPlaying);
    } catch (e) {
      console.log('Error in playPauseHandler:', e);
    }
  };

  const forwardHandler = async () => {
    try {
      const info = await SoundPlayer.getInfo();
      let newTime = Math.min(info.currentTime + 5, info.duration);
      SoundPlayer.seek(newTime);
    } catch (e) {
      console.log('Error in forwardHandler:', e);
    }
  };

  const backwardHandler = async () => {
    try {
      const info = await SoundPlayer.getInfo();
      let newTime = Math.max(info.currentTime - 5, 0);
      SoundPlayer.seek(newTime);
    } catch (e) {
      console.log('Error in backwardHandler:', e);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(async () => {
        try {
          const info = await SoundPlayer.getInfo();
          setPosition(info.currentTime * 1000);
        } catch (e) {
          console.log('getInfo error:', e);
        }
      }, 1000);
    } else if (!isPlaying && position !== 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  const formatTime = milliseconds => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
  };

  return (
    <View style={styles?.container}>
      <View style={styles?.sliderContainer}>
        <Text style={styles?.timeText}>{formatTime(position)}</Text>
        <Slider
          style={styles?.slider}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          onSlidingComplete={value => {
            SoundPlayer.seek(value / 1000); // SoundPlayer expects seconds
            setPosition(value);
          }}
          minimumTrackTintColor="white"
          maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
          thumbTintColor="transparent"
        />
        <Text style={styles?.timeText}>{formatTime(duration)}</Text>
      </View>

      <View style={styles?.controls}>
        <TouchableOpacity onPress={backwardHandler}>
          <WhiteBackwardAudioIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles?.playPauseButton}
          onPress={playPauseHandler}>
          {isPlaying ? (
            <GradientPauseIcon />
          ) : (
            <GradientPlayIcon width={width * 0.03} height={width * 0.03} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={forwardHandler}>
          <WhiteForwardAudioIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MusicPlayer;

export const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 5,
    marginVertical: 5,
    width: width * 0.5,
    height: Platform?.OS === 'ios' ? height * 0.08 : height * 0.06,
    backgroundColor: colors?.blackTransparent,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 30,
  },
  slider: {
    flex: 1,
    height: 20,
  },
  timeText: {
    color: 'white',
    fontSize: 8,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playPauseButton: {
    backgroundColor: 'white',
    width: width * 0.05,
    height: width * 0.05,
    borderRadius: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2,
  },
});
