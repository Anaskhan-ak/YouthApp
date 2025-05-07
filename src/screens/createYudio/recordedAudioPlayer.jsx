import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import {
    GradientRedTick,
    PinkPauseAudioButton,
    PinkPlayAudioButton,
} from '../../assets/images/svgs';
import { height, width } from '../../constant';
import { colors } from '../../utils/colors/index';

const RecordedAudioPlayer = ({audioURL}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const playPauseHandler = () => {
    try {
      if (isPlaying) {
        SoundPlayer.pause();
      } else {
        SoundPlayer.playUrl(audioURL);
      }
      setIsPlaying(!isPlaying);
    } catch (e) {
      console.log('Error in playPauseHandler:', e);
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
        <TouchableOpacity onPress={playPauseHandler}>
          {isPlaying ? (
            <PinkPauseAudioButton width={width * 0.1} height={width * 0.1}/>
          ) : (
            <PinkPlayAudioButton width={width * 0.1} height={width * 0.1} />
          )}
        </TouchableOpacity>
        <Slider
          style={styles?.slider}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          onSlidingComplete={value => {
            SoundPlayer.seek(value / 1000); // SoundPlayer expects seconds
            setPosition(value);
          }}
          minimumTrackTintColor={colors?.RGB1}
          maximumTrackTintColor={colors?.gray}
          thumbTintColor={colors?.RGB1}
        />
      </View>
      <View style={styles?.timeContainer}>
        <Text style={styles?.timeText}>{formatTime(position)}</Text>
        <Text style={styles?.timeText}>{formatTime(duration)}</Text>
      </View>
      <TouchableOpacity>
        <GradientRedTick/>
      </TouchableOpacity>
    </View>
  );
};

export default RecordedAudioPlayer;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 20,
    marginVertical: 5,
    width: width * 0.9,
    height: height * 0.08,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    // height: height * 0.1,
  },
  timeText: {
    color: colors?.text,
    fontSize: width * 0.03,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.75,
    alignSelf: 'flex-end',
    marginRight: width * 0.02,
  },
  playPauseButton: {
    backgroundColor: 'white',
    width: width * 0.04,
    height: width * 0.04,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2,
  },
});
