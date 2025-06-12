import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {BlueTick, DropDown} from '../../../../assets/images/svgs';
import {height} from 'constant';

const ProfileStats = ({post, followers, followings, subscribers}) => {
  return (
    <View style={styles?.container}>
      <View style={styles?.statsView}>
        <Text style={styles?.count}>{post}</Text>
        <Text style={styles?.title}> Posts</Text>
      </View>

      <View style={styles?.statsView}>
        <Text style={styles?.count}>{followers}</Text>
        <Text style={styles?.title}> Followers</Text>
      </View>

      <View style={styles?.statsView}>
        <Text style={styles?.count}>{followings}</Text>
        <Text style={styles?.title}> Following</Text>
      </View>

      <View style={styles?.statsView}>
        <Text style={styles?.count}>{subscribers}</Text>
        <Text style={styles?.title}> Subscribers</Text>
      </View>
    </View>
  );
};

export default ProfileStats;
