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
import {darkThemeColors} from '../../utils/colors';

const {height, width} = Dimensions.get('window');
const colors = {white: '#FFFFFF'};

export const NextButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient
        colors={[darkThemeColors?.RGB1, darkThemeColors?.RGB2]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles?.nextButton}>
        <Text allowFontScaling={false} style={styles?.nextText}>
          {props?.title ? props?.title : 'Next'}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
