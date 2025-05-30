import {View, Text} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {images} from '../../../../assets/images';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../../utils/colors';
import {Plus} from '../../../../assets/images/svgs';

const ProfilePicture = () => {
  return (
    <View style={styles?.container}>
      <LinearGradient colors={[colors?.RGB2, colors?.RGB1]} style={styles?.btn}>
        <View>
          <Plus width={12} height={12} />
        </View>
      </LinearGradient>
      <Image source={images?.profileImage} style={styles?.image} />
    </View>
  );
};

export default ProfilePicture;
