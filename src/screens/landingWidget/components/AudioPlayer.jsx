import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';
import { PinkForwardAudioButton, PinkPauseAudioButton, PinkPlayAudioButton, PinkRewindAUdioButton, PinkVolume } from '../../../assets/images/svgs';
import { colors } from '../../../utils/colors/index';

Sound.setCategory('Playback');

const LandingWidgetAudioPlayer = ({audioURL, pink}) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // useEffect(() => {
  //   loadSound(audioURL);
  //   return () => {
  //     if (sound) {
  //       sound.release();
  //     }
  //   };
  // }, []);
  const loadSound = url => {
    const newSound = new Sound(url, '', error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      setSound(newSound);
      setDuration(newSound.getDuration() * 1000);
    });
  };

  const playPauseHandler = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play(success => {
          if (success) {
            setIsPlaying(false);
            setPosition(0);
            setDuration(0);
            console.log('Successfully finished playing');
          } else {
            console.log('Playback failed due to audio decoding errors');
          }
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const forwardHandler = () => {
    if (sound) {
      const newPosition = Math.min(position + 5000, duration);
      sound.setCurrentTime(newPosition / 1000);
      setPosition(newPosition);
    }
  };

  const backwardHandler = () => {
    if (sound) {
      const newPosition = Math.max(position - 5000, 0);
      sound.setCurrentTime(newPosition / 1000);
      setPosition(newPosition);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        sound?.getCurrentTime(seconds => setPosition(seconds * 1000));
      }, 1000);
    } else if (!isPlaying && position !== 0) {
      if (interval) {
        clearInterval(interval);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, sound]);

  const formatTime = milliseconds => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

    return `${paddedMinutes}:${paddedSeconds}`;
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.RGB1, colors.RGB2]}>
      <View style={styles.sliderContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Slider
          style={styles.slider}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          onSlidingComplete={value => {
            if (sound) {
              sound.setCurrentTime(value / 1000);
              setPosition(value);
            }
          }}
          minimumTrackTintColor="white"
          maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
          thumbTintColor="transparent"
        />
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
        <View style={styles?.audioProgress}>
          <PinkVolume width={13} height={13} />
          <View
            style={styles?.audioVolume}
          />
        </View>
      </View>

      <View style={styles.controls}>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 20,
    marginVertical: 5,
    width: 170,
    height: 45,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
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
    width: 15,
    height: 15,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2,
  },
  audioProgress: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 2,
  },
  audioVolume: {
    height: 3,
    backgroundColor: colors.white,
    width: 15,
    marginLeft: 5,
  },
});


export default LandingWidgetAudioPlayer;
