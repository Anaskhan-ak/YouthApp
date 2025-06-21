import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { width } from '../../../constant';
import { colors } from '../../../utils/colors';

const RecordButton = ({onPress, animatedValue, isRecording}) => {
  const CIRCLE_LENGTH = 2 * Math.PI * 40; // 2πr (r = 40)
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCLE_LENGTH, 0],
  });

  return (
    <View style={styles.centered}>
      <Svg width={width * 0.246} height={width * 0.246}>
        <Circle
          cx="50"
          cy="50"
          r="40"
          stroke="#eee"
          strokeWidth="6"
          fill="none"
        />
        <AnimatedCircle
          cx="50"
          cy="50"
          r="40"
          stroke={colors.pink}
          strokeWidth="6"
          strokeDasharray={`${CIRCLE_LENGTH}, ${CIRCLE_LENGTH}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.startButton,
          {
            backgroundColor: isRecording ? colors.RGB1 : colors.pink,
          },
        ]}
      />
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default RecordButton;

const styles = StyleSheet.create({
  startButton: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.15,
    borderWidth: width * 0.01,
    borderColor: colors?.white,
    position: 'absolute',
    zIndex: 10,
    alignSelf: 'center',
    backgroundColor: colors?.pink,
  },
  centered: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});
