import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {height, width} from '../../constant';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import {Cross, ErrorWhite} from '../../assets/images/svgs';

const AuthError = ({setShowError,title,message}) => {
  const handlePress = () => {
    setShowError(false);
  };
  return (
    <View style={styles?.errorContainer}>
      <LinearGradient
        style={styles?.iconView}
        colors={[colors?.RGB1, colors?.RGB2]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <ErrorWhite />
      </LinearGradient>
      <View style={styles?.contentContainer}>
        <Text style={styles?.heading}>{title}</Text>
        <Text style={styles?.title}>
         {message}
        </Text>
      </View>
      <TouchableOpacity onPress={handlePress}>
        <Cross />
      </TouchableOpacity>
    </View>
  );
};

export default AuthError;
