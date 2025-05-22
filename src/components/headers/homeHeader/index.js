import {View, StyleSheet, Image, Platform} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../utils/colors';
import {height, width} from '../../../constant';
import {HomeHeaderLogo, Menu} from '../../../assets/images/svgs';
import {styles} from './styles';

const HomeHeader = ({img}) => {
  return (
    <LinearGradient
      colors={[colors?.RGB1, colors?.RGB2]}
      start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      style={styles.gradient}>
      <SafeAreaView edges={['left', 'right']} style={styles.safeAreaContent}>
        <HomeHeaderLogo />
        <View style={styles.rightContainer}>
          <Menu width={width * 0.08} height={width * 0.08} />
          <LinearGradient
            colors={[colors?.RGB2, colors?.RGB1]}
            style={styles.imageBorder}>
            <Image
              source={
                img ? img : require('../../../assets/images/SignupImage.jpeg')
              }
              style={styles.image}
            />
          </LinearGradient>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeHeader;
