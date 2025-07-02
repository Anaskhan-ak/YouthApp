import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SoundPlayer from 'react-native-sound-player';
import Svg, { Rect } from 'react-native-svg';
import { PauseIcon, PlayIcon } from '../../../assets/images/svgs';
import { width } from '../../../constant';
import { colors } from '../../../utils/colors';

const YudioPlayer = ({audio, bg}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [waveform, setWaveform] = useState(audio?.waveform);
  const fixedBarsCount = 35;

  // console.log("audio", audio?.uri)

  // useEffect(() => {
  //   console.log('Audio', audio);
  //   const loadWaveform = async () => {
  //     if (!audio || !audio.uri) return;

  //     try {
  //       // Optional: add small delay to let state fully update
  //       await new Promise(resolve => setTimeout(resolve, 50));

  //       const result = await generateAudioWaveforms(audio);
  //       setWaveform(result);
  //     } catch (err) {
  //       console.error('Waveform generation error:', err);
  //     }
  //   };

  //   loadWaveform();
  // }, [audio]);

  useEffect(() => {
    let interval;

    if (audio?.uri) {
      SoundPlayer.loadUrl(audio.uri);

      interval = setInterval(() => {
        SoundPlayer.getInfo()
          .then(info => {
            setCurrentTime(info.currentTime);
            setDuration(info.duration);

            // When audio ends
            if (info.currentTime >= info.duration && info.duration !== 0) {
              setIsPlaying(false);
              setCurrentTime(0); // reset time
              SoundPlayer.seek(0); // reset player to beginning
              clearInterval(interval);
            }
          })
          .catch(e => {
            console.log('getInfo error:', e);
          });
      }, 500);
    }

    return () => clearInterval(interval);
  }, [audio?.uri]);

  const playPause = () => {
    if (isPlaying) {
      SoundPlayer.pause();
    } else {
      SoundPlayer.play();
    }
    setIsPlaying(!isPlaying);
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

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const mappedWaveform =
    waveform && waveform.length > 0
      ? Array.from({length: fixedBarsCount}, (_, i) => {
          const start = Math.floor((i / fixedBarsCount) * waveform.length);
          const end = Math.floor(((i + 1) / fixedBarsCount) * waveform.length);
          const segment = waveform.slice(start, end);
          return (
            segment.reduce((sum, val) => sum + val, 0) / segment.length || 0
          );
        })
      : Array(fixedBarsCount).fill(0);

  const waveformWidth = Dimensions.get('window').width - 20;
  const barWidth = waveformWidth / fixedBarsCount - 2;
  const barHeightScale = 100;
  const progress = currentTime / duration;

  return (
    <View
      style={[
        styles.container,
        bg && {backgroundColor: colors?.extraLightGrey},
      ]}>
      <TouchableOpacity onPress={playPause}>
        <LinearGradient
          colors={['#478FE4', '#5CD3C6']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            styles.playPauseButton,
            isPlaying ? styles.noPaddingLeft : styles.paddingLeft,
          ]}>
          {isPlaying ? <PauseIcon height={20} /> : <PlayIcon height={20} />}
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.flex1}>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
        {waveform?.length > 0 ? (
          <View style={styles.waveformContainer}>
            <Svg
              height={barHeightScale - 30}
              width="100%"
              viewBox={`0 0 ${waveformWidth} ${barHeightScale}`}>
              {mappedWaveform.map((value, index) => {
                const barHeight = Math.max(value * barHeightScale, 3);
                const isFilled = index / fixedBarsCount <= progress;
                return (
                  <Rect
                    key={index}
                    x={index * (barWidth + 2)}
                    y={(barHeightScale - barHeight) / 2}
                    width={barWidth}
                    height={barHeight}
                    fill={isFilled ? '#36AFD6' : '#D3D3D3'}
                    rx={barWidth / 2}
                    ry={barWidth / 2}
                  />
                );
              })}
            </Svg>
          </View>
        ) : (
          <ActivityIndicator size={'small'} color={colors?.RGB1} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width * 0.04,
    borderRadius: width * 0.02,
  },
  playPauseButton: {
    marginTop: 12,
    width: 36,
    height: 36,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddingLeft: {
    paddingLeft: 4,
  },
  noPaddingLeft: {
    paddingLeft: 0,
  },
  flex1: {
    flex: 1,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#000',
  },
  waveformContainer: {
    width: '100%',
  },
});

export default YudioPlayer;
