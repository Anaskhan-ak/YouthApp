import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {BlueTick, DropDown} from '../../../../assets/images/svgs';
import {height} from 'constant';
import GradientText from '../../../../components/text/GradientText';

const ProfileDetailCard = ({userName, bio, link}) => {
  return (
    <View style={styles?.container}>
      <View style={styles?.profileView}>
        <Text style={styles?.heading}>{userName}</Text>
        <View style={styles?.blueTick}>
          <BlueTick />
        </View>
        <DropDown width={18} height={18} />
      </View>
      <Text style={styles?.title}>{bio}</Text>
      <GradientText style={styles?.link}>{link}</GradientText>
    </View>
  );
};

export default ProfileDetailCard;
