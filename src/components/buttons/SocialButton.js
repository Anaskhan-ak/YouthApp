import {Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';

export const SocialButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.socialButton}>
      <Image style={styles.socialButtonImage} source={props.source} />
      <Text style={styles.socialButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default SocialButton;
