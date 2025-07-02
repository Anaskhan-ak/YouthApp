import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import {
  PinkPauseAudioButton,
  PinkPlayAudioButton
} from '../../../assets/images/svgs';
import { width } from '../../../constant';
import { colors } from '../../../utils/colors/index';
import { styles } from './recordedAudioPlayerStyles';

const RecordedAudioPlayer = ({audioURL}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

const playPauseHandler = () => {
  try {
    if (isPlaying) {
      SoundPlayer.pause();
      setIsPlaying(false);
    } else {
      const localPath = Platform.OS === 'ios' ? `file://${audioURL}` : audioURL;
      console.log('Playing path:', localPath);
      SoundPlayer.play(localPath);
      setIsPlaying(true);
    }
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
          setPosition(info.currentTime * 1000); // in ms
          setDuration(info.duration * 1000); // also in ms
        } catch (e) {
          console.log('getInfo error:', e);
        }
      }, 500);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const onFinished = () => {
      setIsPlaying(false);
      setPosition(0); // reset
    };

    const finishedSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      onFinished,
    );

    return () => {
      finishedSubscription.remove();
    };
  }, []);

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
            <PinkPauseAudioButton width={width * 0.08} height={width * 0.08} />
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
            SoundPlayer.seek(value / 1000); // convert ms to sec
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
    </View>
  );
};

export default RecordedAudioPlayer;


