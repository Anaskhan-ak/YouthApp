import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import GradientText from '../text/GradientText';
import {colors} from '../../utils/colors';

const {height, width} = Dimensions.get('window');

export const GradientBorderButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[colors.primary, colors.primary, colors.RGB2]}
        style={{
          height: height * 0.05,
          width: props?.width ? props?.width : width * 0.79,
          alignSelf: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          alignItems: 'center',
        }}>
        <View
          style={{
            height: height * 0.046,
            width: props?.width ? props?.width - 3 : width * 0.78,
            borderRadius: 3,
            justifyContent: 'center',
            backgroundColor: colors.white,
          }}>
          <GradientText style={styles.gradientText}>{props.title}</GradientText>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
