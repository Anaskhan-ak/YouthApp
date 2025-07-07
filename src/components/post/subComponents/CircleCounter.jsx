// components/SegmentedCircleCounter.js
import { StyleSheet, Text, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { width } from '../../../constant';

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  const d = [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
  ].join(' ');
  return d;
};

const CircleCounter = ({
  size = width * 0.06,
  segments,
  filled = 4,
  strokeWidth = 3,
  gapDegrees = 4,
  activeColor = '#000',
  inactiveColor = '#ddd',
  centerText = '4',
  centerTextColor = '#fff',
}) => {
  console.log("segments", segments)
  const radius = (size - strokeWidth) / 2;
  const anglePerSegment = 360 / segments;
  const usableAngle = anglePerSegment - gapDegrees;

  const arcs = Array.from({ length: segments }).map((_, i) => {
    const startAngle = i * anglePerSegment + gapDegrees / 2;
    const endAngle = startAngle + usableAngle;
    const path = describeArc(size / 2, size / 2, radius, startAngle, endAngle);

    return (
      <Path
        key={i}
        d={path}
        stroke={i < filled ? activeColor : inactiveColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
    );
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <G>
          {arcs}
        </G>
      </Svg>
      <Text style={[styles.centerText, { color: centerTextColor }]}>{centerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    position: 'absolute',
    fontSize: width * 0.03,
    fontWeight: 'bold',
  },
});

export default CircleCounter;
