import { useEffect, useState } from 'react';
import {
  DeviceEventEmitter,
  Dimensions,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SoundPlayer from 'react-native-sound-player';
import Svg, { Rect } from 'react-native-svg';
import {
  BlackForwardAudioButton,
  BlackRewindAUdioButton,
  PauseIcon,
  PlayIcon,
} from '../../../assets/images/svgs';
import { styles } from './yudioPlayerStyles';

const YudioPlayer = ({ audioUrl, waveform }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const fixedBarsCount = 35;

  useEffect(() => {
    SoundPlayer.loadUrl(audioUrl);

    const interval = setInterval(() => {
      SoundPlayer.getInfo()
        .then(info => {
          setCurrentTime(info.currentTime);
          setDuration(info.duration);
        })
        .catch(() => {});
    }, 500);

    const onFinished = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const subscription = DeviceEventEmitter.addListener(
      'FinishedPlaying',
      onFinished
    );

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, [audioUrl]);

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
      ? Array.from({ length: fixedBarsCount }, (_, i) => {
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
    <View style={styles.container}>
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

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

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={backwardHandler}>
          <BlackRewindAUdioButton />
        </TouchableOpacity>
        <TouchableOpacity onPress={playPause}>
          <LinearGradient
            colors={['#478FE4', '#5CD3C6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.playPauseButton,
              isPlaying ? styles.noPaddingLeft : styles.paddingLeft,
            ]}>
            {isPlaying ? <PauseIcon height={20} /> : <PlayIcon height={20} />}
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={forwardHandler}>
          <BlackForwardAudioButton />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default YudioPlayer;
