import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Text } from 'react-native-svg';

const AnalogWatch = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = (360 / 12) * hours + (360 / 12) * (minutes / 60);
  const minuteAngle = (360 / 60) * minutes + (360 / 60) * (seconds / 60);
  const secondAngle = (360 / 60) * seconds;

  return (
    <View style={styles.container}>
      <Svg height="150" width="150">
        {/* White Border Circle */}
        <Circle cx="75" cy="75" r="70" stroke="white" strokeWidth="1" fill="white" />

        {/* Minute Lines and Counts */}
        {Array.from({ length: 60 }).map((_, index) => {
          const minuteLineAngle = (360 / 60) * index;
          const lineLength = index % 5 === 0 ? 6 : 3;
          const isFiveMinuteMark = index % 5 === 0;

          return (
            <React.Fragment key={index}>
              <Line
                x1="75"
                y1="10"
                x2="75"
                y2={12 + lineLength}
                strokeWidth="2"
                stroke="black"
                rotation={minuteLineAngle}
                origin="75,75"
              />
              {isFiveMinuteMark && (
                <Text
                  x="75"
                  y="32"
                  fill="black"
                  fontSize="16"
                  textAnchor="middle"
                  rotation={minuteLineAngle}
                  origin="75,75"
                >
                  {index / 5 === 0 ? 12 : index / 5}
                </Text>
              )}
            </React.Fragment>
          );
        })}

        {/* Hour Hand */}
        <Line
          x1="75"
          y1="75"
          x2="75"
          y2="35"
          strokeWidth="4"
          stroke="black"
          rotation={hourAngle}
          origin="75,75"
        />

        {/* Minute Hand */}
        <Line
          x1="75"
          y1="75"
          x2="75"
          y2="20"
          strokeWidth="3"
          stroke="black"
          rotation={minuteAngle}
          origin="75,75"
        />

        {/* Second Hand */}
        <Line
          x1="75"
          y1="75"
          x2="75"
          y2="10"
          strokeWidth="2"
          stroke="red"
          rotation={secondAngle}
          origin="75,75"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150,
  },
});

export default AnalogWatch;
