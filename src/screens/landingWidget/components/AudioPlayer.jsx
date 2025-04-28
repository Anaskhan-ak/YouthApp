import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SoundPlayer from 'react-native-sound-player';
import {
  PinkForwardAudioButton,
  PinkPauseAudioButton,
  PinkPlayAudioButton,
  PinkRewindAUdioButton,
  PinkVolume,
} from '../../../assets/images/svgs';
import { colors } from '../../../utils/colors/index';
import { styles } from '../styles/AudioPlayer';

const LandingWidgetAudioPlayer = ({  pink }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioURL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  // useEffect(() => {
  //   console.log("********* AUDIO URL **********", audioURL);
  //   console.log("SOUND", SoundPlayer)
  //   try {
  //     SoundPlayer.loadUrl(audioURL);
  //     const checkDuration = setTimeout(async () => {
  //       const info = await SoundPlayer.getInfo();
  //       setDuration(info.duration * 1000); // convert to ms
  //     }, 1000);

  //     return () => {
  //       clearTimeout(checkDuration);
  //       SoundPlayer.stop();
  //     };
  //   } catch (e) {
  //     console.log('Cannot load sound file', e);
  //   }
  // }, [audioURL]);

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
    <LinearGradient
      style={styles?.container}
      colors={[colors.RGB1, colors.RGB2]}>
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
        <View style={styles?.audioProgress}>
          <PinkVolume width={13} height={13} />
          <View style={styles?.audioVolume} />
        </View>
      </View>

      <View style={styles?.controls}>
        <TouchableOpacity onPress={backwardHandler}>
          <PinkRewindAUdioButton />
        </TouchableOpacity>
        <TouchableOpacity onPress={playPauseHandler}>
          {isPlaying ? (
            <PinkPauseAudioButton />
          ) : (
            <PinkPlayAudioButton width={25} height={25} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={forwardHandler}>
          <PinkForwardAudioButton />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};



export default LandingWidgetAudioPlayer;
