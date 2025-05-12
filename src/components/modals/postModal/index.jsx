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

const MAX_TRANSLATE_Y = -height * 0.5;
const MIN_TRANSLATE_Y = -height * 0.3; // how much higher the modal can move (upward)

const PostModal = ({ options }) => {
  const translateY = useSharedValue(MIN_TRANSLATE_Y); // initially open

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const newY = translateY.value + event.changeY;
      translateY.value = Math.max(Math.min(newY, MAX_TRANSLATE_Y), MIN_TRANSLATE_Y);
    })
    .onEnd(() => {
      translateY.value =
        translateY.value < (MIN_TRANSLATE_Y / 2)
          ? withSpring(MIN_TRANSLATE_Y)
          : withSpring(MAX_TRANSLATE_Y);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <LinearGradient
          colors={[colors?.RGB1, colors?.RGB2]}
          style={[styles.row, styles.gradientBar]}>
          {options?.map((opt, index) => (
            <TouchableOpacity key={index}>{opt?.icon}</TouchableOpacity>
          ))}
        </LinearGradient>
      </Animated.View>
    </GestureDetector>
  );
};

export default PostModal;
