import {View, Text} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {images} from '../../assets/images';
import {colors} from '../../utils/colors';
import ProfilePicture from './compoents/profilePicture';
import ProfileDetailCard from './compoents/profileDetailCard';
import ProfileStats from './compoents/profileStats';
import ProfileOption from './compoents/profileOption';
import Stories from '../../components/stories';

const Profile = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.3}}>
        <Image source={images?.palestine} style={{flex: 1}} />
      </View>
      <View
        style={{
          flex: 0.7,
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
          marginTop: -20,
          zIndex: 999,
          backgroundColor: colors?.white,
        }}>
          <ProfilePicture/>
          <ProfileDetailCard/>
          <ProfileStats/>
          <ProfileOption/>
          <Stories/>
        </View>
    </View>
  );
};

export default Profile;
