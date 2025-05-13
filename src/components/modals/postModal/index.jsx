import { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { height } from '../../../constant';
import { colors } from '../../../utils/colors';
import { styles } from './styles';

const MAX_TRANSLATE_Y = 0; // Fully expanded (height * 0.5)
const MIN_TRANSLATE_Y = height * 0.2; // Minimized (height * 0.3)

const PostModal = ({options, setOptions, content}) => {
  const translateY = useSharedValue(MAX_TRANSLATE_Y); // Starts fully expanded
  const gestureRef = useRef();

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      const newY = translateY.value + event.translationY;
      // Clamp between MIN_TRANSLATE_Y (minimized) and MAX_TRANSLATE_Y (expanded)
      translateY.value = Math.max(
        Math.min(newY, MAX_TRANSLATE_Y),
        MIN_TRANSLATE_Y,
      );
    })
    .onEnd(() => {
      // Snap to either MIN or MAX based on position
      const shouldMinimize =
        translateY.value > (MAX_TRANSLATE_Y + MIN_TRANSLATE_Y) / 2;
      translateY.value = shouldMinimize
        ? withSpring(MIN_TRANSLATE_Y)
        : withSpring(MAX_TRANSLATE_Y);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
    height: height * 0.5 - translateY.value, // Adjust height dynamically
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <LinearGradient
          colors={[colors?.RGB1, colors?.RGB2]}
          style={[styles.row, styles.gradientBar]}>
          {options?.map((opt, index) => (
            <TouchableOpacity
              key={index}
              simultaneousHandlers={gestureRef}
              activeOpacity={0.7}
              style={{
                opacity : opt?.active ? 1 : 0.5
              }}
              onPress={() => {
                setOptions(prev =>
                  prev.map((item, i) => ({
                    ...item,
                    active: i === index,
                  })),
                );
              }}>
                {opt.icon}
            </TouchableOpacity>
          ))}
        </LinearGradient>
        {content}
      </Animated.View>
    </GestureDetector>
  );
};

export default PostModal;
