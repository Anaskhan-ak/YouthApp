import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { width } from '../../../../../constant';
import { colors } from '../../../../../utils/colors';

const RecordingBars = ({ isRecording }) => {
  const bars = useRef([...Array(16)].map(() => new Animated.Value(20))).current;

  useEffect(() => {
    let isMounted = true;

    const animateBar = (bar) => {
      if (!isMounted) return;

      Animated.sequence([
        Animated.timing(bar, {
          toValue: Math.random() * 5 + 10,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(bar, {
          toValue: 10,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => {
        if (isMounted && isRecording) animateBar(bar); // Recursively animate
      });
    };

    if (isRecording) {
      bars.forEach(bar => animateBar(bar));
    } else {
      bars.forEach(bar => bar.setValue(15));
    }

    return () => {
      isMounted = false;
    };
  }, [isRecording]);

  return (
    <View style={styles.container}>
      {bars.map((bar, i) => (
        <Animated.View
          key={i}
          style={[styles.bar, { height: bar }]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  bar: {
    width: width * 0.008,
    backgroundColor: colors?.RGB2 || 'blue',
    marginHorizontal: width * 0.01,
    borderRadius: width * 0.02,
  },
});

export default RecordingBars;
