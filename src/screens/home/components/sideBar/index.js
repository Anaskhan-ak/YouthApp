import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../../utils/colors';
import {height, width} from '../../../../constant';
import {sideBarOptions} from '../../../../utils/string';
import {styles} from './styles';

const SideBar = ({}) => {
const handlePress=()=>{

    } 
  return (
    <View style={styles?.container}>
      {sideBarOptions?.map(item => (
        <TouchableOpacity onPress={handlePress}>
          <LinearGradient
            colors={[colors?.RGB2, colors?.RGB1]}
            style={styles?.imageBorder}>
            <View>{item?.icon}</View>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SideBar;
