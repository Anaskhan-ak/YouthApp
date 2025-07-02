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
import { height, width } from '../../../constant';
import { generateAudioWaveforms } from '../../../helper';
import { colors } from '../../../utils/colors';

const YudioPlayer = ({audio, bg, currentAudioId, setCurrentAudioId}) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [waveform, setWaveform] = useState(audio?.waveform);
  const fixedBarsCount = 35;
  const isCurrentAudio = currentAudioId === audio?.id;
  const [play, setPlay] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(()=>{
    const generateWaveforms = async()=>{
      try {
        const response = await generateAudioWaveforms(audio)
        if (response){
          setWaveform(response)
        }
      } catch (error) {
        console.log("error generating wavforms", error)
      }
    }
    if (!audio?.waveform){
      generateWaveforms()
    }
  },[])

  const loadUrl = () => {
    // console.log("audio url", audio?.uri)
    SoundPlayer.loadUrl(audio?.uri);
    const interval = setInterval(() => {
      SoundPlayer.getInfo()
        .then(info => {
          setCurrentTime(info.currentTime);
          setDuration(info.duration);
        })
        .catch(() => {});
    }, 500);

    return () => clearInterval(interval);
  };

  const Play = () => {
    if (audio?.id) {setCurrentAudioId(audio?.id);}
    loadUrl();
    SoundPlayer?.play();
    setPlay(true);
  };
  const Pause = () => {
    if (pause) {
      //already paused
      SoundPlayer?.resume();
      setPause(false);
    } else {
      SoundPlayer?.pause();
      setPause(true);
    }
  };

  // stop playing when audio reaches end
  useEffect(() => {
    // console.log(`currentTime ${currentTime}        duration ${duration} `);
    if (
      currentTime > 0 &&
      duration > 0 &&
      duration - currentTime <= 0.02 // allows 200ms slack
    ) {
      SoundPlayer?.stop();
      setPlay(false);
    }

    const finishedSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      () => {
        setPlay(false);
        setCurrentTime(0);
        setDuration(0);
        setCurrentAudioId('');
      },
    );

    return () => {
      finishedSubscription.remove();
    };
  }, [currentTime, duration]);

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
  const progress = isCurrentAudio && duration > 0 ? currentTime / duration : 0;

  const RenderIcon = () => {
    if (!play || pause) {
      //not playing
      return <PlayIcon height={width * 0.03} />;
    }
    if (play || !pause) {
      //resume
      return <PauseIcon height={width * 0.03} />;
    }
  };

  return (
    <View
      style={[
        styles.container,
        bg && {backgroundColor: colors?.extraLightGrey},
      ]}>
      <TouchableOpacity
        onPress={() => {
          if (!play) {
            Play();
          } else {
            Pause();
          }
        }}>
        <LinearGradient
          colors={['#478FE4', '#5CD3C6']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            styles.playPauseButton,
          ]}>
          <RenderIcon/>
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
                const isFilled =
                      isCurrentAudio && index / fixedBarsCount <= progress;
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
    marginTop: height * 0.012,
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
    // alignItems : 'center',
    justifyContent : 'center',
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
