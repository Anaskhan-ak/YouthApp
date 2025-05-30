import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {BlueTick, DropDown} from '../../../../assets/images/svgs';
import {height} from 'constant';
import GradientText from '../../../../components/text/GradientText';

const ProfileDetailCard = () => {
  return (
    <View style={styles?.container}>
      <View style={styles?.profileView}>
        <Text style={styles?.heading}>Mohammed Mostafa</Text>
        <View style={styles?.blueTick}>
          <BlueTick />
        </View>
        <DropDown width={18} height={18} />
      </View>
      <Text style={styles?.title}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus leo
        erat, dapibus non eros ut, venenatis fringilla quam. Donec id ipsum ut
        nisl sagittis tincidunt.
      </Text>
      <GradientText style={styles?.link}>www.YouthApp.io</GradientText>
    </View>
  );
};

export default ProfileDetailCard;
