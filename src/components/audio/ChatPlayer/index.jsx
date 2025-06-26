import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SoundPlayer from 'react-native-sound-player';
import Svg, { Rect } from 'react-native-svg';
import { images } from '../../../assets/images';
import {
  ActiveLike,
  GradientPlayIcon,
  PauseIcon,
  PlayIcon,
} from '../../../assets/images/svgs';
import GradientText from '../../../components/text/GradientText';
import {width} from '../../../constant';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

// when i pause, it reloads
// when i replay, it fill completely and then replays

const ChatPlayer = ({
  audio,
  user,
  customWidth,
  iconType,
  currentAudioId,
  setCurrentAudioId,
}) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const fixedBarsCount = 35;
  const isCurrentAudio = currentAudioId === audio?.id;
  const [play, setPlay] = useState(false);
  const [pause, setPause] = useState(false);

  // useEffect(() => {
  //   SoundPlayer.loadUrl(audio?.url);
  //   const interval = setInterval(() => {
  //     SoundPlayer.getInfo()
  //       .then(info => {
  //         setCurrentTime(info.currentTime);
  //         setDuration(info.duration);
  //       })
  //       .catch(() => {});
  //   }, 500);

  //   return () => clearInterval(interval);
  // }, [audio?.url]);

  const loadUrl = () => {
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
  };

  const Play = () => {
    setCurrentAudioId(audio?.id);
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
        setCurrentAudioId("")
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
  const progress = isCurrentAudio && duration > 0 ? currentTime / duration : 0;

  const RenderIcon = () =>{
    if (!play || pause)  { //not playing
      return <PlayIcon height={width * 0.03}/>
    }
    if ( play || !pause) { //resume
      return <PauseIcon height={width * 0.03}/>
    }
  }

  return (
    <LinearGradient
      colors={[colors?.RGB3, colors?.RGB4]}
      style={[
        styles?.container,
        {width: customWidth ? customWidth : width * 0.8},
      ]}>
      {/* <Image source={{uri: user?.photo}} style={styles?.image} /> */}
      <Image
        source={
          user?.photo ? {uri: user?.photo} : images?.defaultProfilePicture
        }
        style={styles?.image}
      />
      <View style={styles?.content}>
        <View style={styles?.header}>
          <Text
            style={styles?.name}>{`${user?.firstName} ${user?.lastName}`}</Text>
          {iconType === 'profile' && (
            <View style={styles?.iconContainer}>
              <TouchableOpacity
                style={[
                  styles?.playIcon,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                ]}>
                <GradientPlayIcon width={width * 0.04} height={width * 0.04} />
                <GradientText style={styles?.playIconText}>375K</GradientText>
              </TouchableOpacity>
              <TouchableOpacity style={styles?.playIcon}>
                <ActiveLike />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles?.playerContainer}>
          <TouchableOpacity
            onPress={() => {
              if (!play) {
                Play()
              } else {
                Pause()
              }
            }}>
            <View
              style={[
                styles.playPauseButton,
                play ? styles.noPaddingLeft : styles.paddingLeft,
              ]}>
             <RenderIcon/>
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
                    const isFilled =
                      isCurrentAudio && index / fixedBarsCount <= progress;
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
    flex: 1,
    marginLeft: width * 0.02,
    marginTop: width * 0.02,
  },
  name: {
    fontFamily: fonts?.montserratBold,
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
    marginBottom: width * 0.025,
  },
  player: {
    flex: 1,
  },
  waveformContainer: {
    paddingHorizontal: width * 0.03,
    paddingVertical: Platform?.OS === 'ios' ? 10 : 0,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: width * 0.02,
    color: colors?.text,
    fontFamily: fonts?.montserratRegular,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    right: Platform?.OS === 'ios' ? 10 : 0,
  },
  playIcon: {
    marginHorizontal: width * 0.01,
  },
  playIconText: {
    fontSize: width * 0.028,
    fontFamily: fonts?.montserratBold,
  },
});
