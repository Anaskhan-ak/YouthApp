import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { width } from '../../constant';
import { colors } from '../../utils/colors';

const BAR_COUNT = 100;

const AudioBars = ({ isRecording }) => {
  const bars = Array.from({ length: BAR_COUNT }, (_, i) => ({
    rotate: (360 / BAR_COUNT) * i,
    scale: useSharedValue(1),
  }));

  useEffect(() => {
    if (isRecording) {
      bars.forEach((bar, index) => {
        bar.scale.value = withRepeat(
          withTiming(1.5, { duration: 400 }),
          -1,
          true
        );
      });
    } else {
      bars.forEach((bar) => {
        bar.scale.value = withTiming(1);
      });
    }
  }, [isRecording]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.barContainer}>
        {bars.map((bar, i) => {
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [
              { rotate: `${bar.rotate}deg` },
              { translateY: -width * 0.18 },
              { scaleY: bar.scale.value },
            ],
          }));

          return (
            <Animated.View
              key={i}
              style={[
                styles.bar,
                animatedStyle,
                { backgroundColor: colors.RGB1 },
              ]}
            />
          );
        })}
      </View>

      <LinearGradient
        colors={[colors.RGB1, colors.RGB2]}
        style={styles.gradientBorder}
      >
        <Image
          source={require('../../assets/images/SignupImage.jpeg')}
          style={styles.image}
        />
      </LinearGradient>
    </View>
  );
};

export default AudioBars;

const styles = StyleSheet.create({
    wrapper: {
      width: width * 0.35,
      height: width * 0.35,
      justifyContent: 'center',
      alignItems: 'center',
    },
    barContainer: {
      position: 'absolute',
      width: width * 0.35,
      height: width * 0.35,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bar: {
      position: 'absolute',
      width: width * 0.004,
      height: width * 0.03,
      borderRadius: 2,
    },
    gradientBorder: {
      width: width * 0.3,
      height: width * 0.3,
      borderRadius: width * 0.15,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    image: {
      width: width * 0.28,
      height: width * 0.28,
      borderRadius: width * 0.14,
    },
  });
  
