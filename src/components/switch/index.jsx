import {useEffect, useState} from 'react';
import {Animated, Pressable, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {width} from '../../constant';
import {colors} from '../../utils/colors';

const Switch = props => {
  const {value, onValueChange} = props;
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

  useEffect(() => {
    // Update the animated value when the value prop changes
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 300, // Adjust the animation duration
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 18], // Adjust the distance of the switch head
  });

  const toggleSwitch = () => {
    const newValue = !value;
    onValueChange(newValue);
  };

  return (
    <Pressable onPress={toggleSwitch} style={styles.pressable}>
      <LinearGradient
        colors={
          value
            ? [
                props?.color1 ? props?.color1 : colors?.RGB1,
                props?.color2 ? props?.color2 : colors?.RGB2,
              ]
            : [colors?.gray, colors?.gray]
        }
        style={styles.innerContainer}>
        <Animated.View
          style={{
            transform: [{translateX}],
          }}>
          <View style={styles.headGradient} />
        </Animated.View>
      </LinearGradient>
    </Pressable>
  );
};

export default Switch;

const styles = StyleSheet.create({
  pressable: {
    width: width * 0.08,
    height: width * 0.04,
    borderRadius: 16,
  },
  backgroundGradient: {
    borderRadius: 16,
    flex: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
    borderRadius: width * 0.07,
  },
  headGradient: {
    width: width * 0.03,
    height: width * 0.03,
    borderRadius: 100,
    backgroundColor: colors?.white,
  },
});
