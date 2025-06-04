import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import { styles } from './styles';
import { WhiteLeftArrow,YouthIconWhite } from '../../../assets/images/svgs';

const {width, height} = Dimensions.get('window');

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftIconWrapper}>
        <WhiteLeftArrow />
      </View>
      <View style={styles.logoWrapper}>
        <YouthIconWhite width={width * 0.25} />
      </View>
    </View>
  );
};



export default ProfileHeader;
