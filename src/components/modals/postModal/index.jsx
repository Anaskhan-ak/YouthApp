import {useRef} from 'react';
import {TouchableOpacity, Platform} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {height} from '../../../constant';
import {colors} from '../../../utils/colors';
import {styles} from './styles';

const PostModal = ({options, setOptions, content, fixed}) => {
  const MAX_HEIGHT = fixed ? height * 0.35 : height * 0.5; // fully expanded
  const MIN_HEIGHT = Platform?.OS === 'ios' ? height * 0.4 : height * 0.4; // minimized

  const gestureRef = useRef();
  const modalHeight = useSharedValue(MAX_HEIGHT); // Start expanded

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      const newHeight = modalHeight.value - event.translationY;

      // Clamp height between MIN and MAX
      modalHeight.value = Math.max(Math.min(newHeight, MAX_HEIGHT), MIN_HEIGHT);
    })
    .onEnd(() => {
      const shouldCollapse = modalHeight.value < (MIN_HEIGHT + MAX_HEIGHT) / 2;

      modalHeight.value = withSpring(shouldCollapse ? MIN_HEIGHT : MAX_HEIGHT);
    })
    .withRef(gestureRef);

  const animatedStyle = useAnimatedStyle(() => ({
    height: modalHeight.value,
  }));

  return (
    <Animated.View style={[styles.animatedContainer, animatedStyle]}>
      {/* Draggable Bar Only */}
      <GestureDetector gesture={panGesture}>
        <LinearGradient
          colors={[colors?.RGB1, colors?.RGB2]}
          style={[styles.row, styles.gradientBar]}>
          {options?.map((opt, index) => (
            <TouchableOpacity
              key={index}
              simultaneousHandlers={gestureRef}
              activeOpacity={0.7}
              style={{opacity: opt?.active ? 1 : 0.5}}
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
      </GestureDetector>

      {/* Scrollable Content */}
      <Animated.View style={{flex: 1}}>{content}</Animated.View>
    </Animated.View>
  );
};

export default PostModal;
