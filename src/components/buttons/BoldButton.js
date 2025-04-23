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
import {colors} from '../../utils/colors';

const {height, width} = Dimensions.get('window');

export const BoldButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props?.disabled ? props?.disabled : false}>
      <LinearGradient
        colors={[colors.primary, colors.RGB2]} // Gradient colors
        start={{x: 0, y: 0}} // Gradient start point (left-top)
        end={{x: 1, y: 0}} // Gradient end point (right-top)
        style={props?.style ? props?.style : styles.BoldButton} // Style for the container
      >
        <Text style={props.textStyle ? props.textStyle : styles.BoldButtonText}>
          {props.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default BoldButton;
