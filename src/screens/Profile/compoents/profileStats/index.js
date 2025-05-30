import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {BlueTick, DropDown} from '../../../../assets/images/svgs';
import {height} from 'constant';

const ProfileStats = () => {
  return (
    <View style={styles?.container}>
      <View style={styles?.statsView}>
        <Text style={styles?.count}>1009</Text>
        <Text style={styles?.title}> Posts</Text>
      </View>

      <View style={styles?.statsView}>
        <Text style={styles?.count}>105</Text>
        <Text style={styles?.title}> Followers</Text>
      </View>

      <View style={styles?.statsView}>
        <Text style={styles?.count}>205</Text>
        <Text style={styles?.title}> Following</Text>
      </View>

      <View style={styles?.statsView}>
        <Text style={styles?.count}>345</Text>
        <Text style={styles?.title}> Subscribers</Text>
      </View>
    </View>
  );
};

export default ProfileStats;
