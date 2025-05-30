import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {profileOptions} from '../../../../utils/string';
import {styles} from './styles';

const ProfileOption = () => {
  return (
    <View style={styles?.container}>
      {profileOptions?.map(item => (
        <TouchableOpacity
          key={item?.id}
          style={[
            styles?.optionButton,
            item?.id !== 'editProfile' && styles?.iconButton,
          ]}>
          {item?.id === 'editProfile' ? (
            <Text style={styles?.editProfileText}>{item?.icon}</Text>
          ) : (
            item?.icon
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileOption;
