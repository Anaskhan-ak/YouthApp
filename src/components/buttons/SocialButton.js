import {Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import { Apple, Google } from '../../assets/images/svgs';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../utils/colors';

export const SocialButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.socialButton}>
      {/* <Image style={styles.socialButtonImage} source={props.source} /> */}
      {props?.type==='google'?<Google/>:<Apple/>}
      {!props?.isLoading ? (
               <Text
                 style={props?.textStyle ? props?.textStyle : styles.primaryText}>
                 {props?.title}
               </Text>
             ) : (
               <ActivityIndicator size="small" color={colors.white} />
             )}
    </TouchableOpacity>
  );
};

export default SocialButton;
