import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
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
import { fonts } from '../../../utils/fonts';

const ChatPlayer = ({audio, user}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const fixedBarsCount = 35;

  useEffect(() => {
    SoundPlayer.loadUrl(audio?.url);
    const interval = setInterval(() => {
      SoundPlayer.getInfo()
        .then(info => {
          setCurrentTime(info.currentTime);
          setDuration(info.duration);
        })
        .catch(() => {});
    }, 500);

    return () => clearInterval(interval);
  }, [audio?.url]);

  const playPause = () => {
    if (isPlaying) {
      SoundPlayer.pause();
    } else {
      SoundPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const mappedWaveform =
    audio?.waveform && audio?.waveform.length > 0
      ? Array.from({length: fixedBarsCount}, (_, i) => {
          const start = Math.floor(
            (i / fixedBarsCount) * audio?.waveform.length,
          );
          const end = Math.floor(
            ((i + 1) / fixedBarsCount) * audio?.waveform.length,
          );
          const segment = audio?.waveform.slice(start, end);
          return (
            segment.reduce((sum, val) => sum + val, 0) / segment.length || 0
          );
        })
      : Array(fixedBarsCount).fill(0);

  const waveformWidth = width - 20;
  const barWidth = waveformWidth / fixedBarsCount - 2;
  const barHeightScale = 90;
  const progress = currentTime / duration;

  return (
    <LinearGradient
      colors={[colors?.RGB1, colors?.RGB2]}
      style={styles?.container}>
      <Image source={{uri: user?.photo}} style={styles?.image} />
      <View style={styles?.content}>
        <Text
          style={styles?.name}>{`${user?.firstName} ${user?.lastName}`}</Text>
        <View style={styles?.playerContainer}>
          <TouchableOpacity onPress={playPause}>
            <View
              style={[
                styles.playPauseButton,
                isPlaying ? styles.noPaddingLeft : styles.paddingLeft,
              ]}>
              {isPlaying ? <PauseIcon height={width * 0.03} /> : <PlayIcon height={width * 0.03} />}
            </View>
          </TouchableOpacity>
          <View style={styles?.player}>
            {audio?.waveform?.length > 0 ? (
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
                        fill={isFilled ? colors?.white : colors?.gray}
                        rx={barWidth / 2}
                        ry={barWidth / 2}
                      />
                    );
                  })}
                </Svg>
                <View style={styles.timeRow}>
                  <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                  <Text style={styles.timeText}>{formatTime(duration)}</Text>
                </View>
              </View>
            ) : (
              <ActivityIndicator size={'small'} color={colors?.RGB1} />
            )}
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ChatPlayer;

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: width * 0.01,
    borderRadius: width * 0.02,
  },
  image: {
    width: width * 0.2,
    height: width * 0.23,
    borderRadius: width * 0.02,
  },
  content: {
    flex : 1,
    marginLeft : width * 0.02,
    marginTop : width * 0.02
  },
  name: {
    fontFamily : fonts?.montserratBold
  },
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',    
  },
  playPauseButton: {
    width: width * 0.06,
    height: width * 0.06,
    borderRadius: width * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors?.pink,
    marginBottom : width * 0.025
  },
  player: {
    flex : 1,
  },
  waveformContainer: {
    paddingHorizontal : width * 0.03
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: width * 0.02, 
    color: colors?.text,
    fontFamily : fonts?.montserratRegular
  },
});
