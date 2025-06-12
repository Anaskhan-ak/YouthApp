import React, {useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../../../utils/colors';
import {homeCategoryOptions} from '../../../../utils/string';
import {styles} from './styles';
import {width} from '../../../../constant';
import {BlurView} from '@react-native-community/blur';
import Svg, {
  ClipPath,
  Defs,
  ForeignObject,
  G,
  LinearGradient as SvgLinearGradient,
  Path,
  Stop,
} from 'react-native-svg';
const CategorySelector = () => {
  const [category, setCategory] = useState(1);

  const handlePress = item => {
    setCategory(item?.id);
  };

  return (
    <View style={styles.container}>
      <BlurView
        blurAmount={10}
        blurType="light"
        style={StyleSheet.absoluteFillObject}
        // reducedTransparencyFallbackColor="#32BCD1"/
      />
      <Svg
        width={431}
        height={92}
        viewBox="0 0 431 92"
        fill="none"
        style={StyleSheet.absoluteFill}>
        <ForeignObject x={-30} y={-30} width={492} height={152}></ForeignObject>
        <G filter="url(#filter0_i_6517_14540)" data-figma-bg-blur-radius={30}>
          <Path
            d="M412 -8.74228e-07C423.046 -3.91405e-07 432 8.95431 432 20L432 72C432 83.0457 423.046 92 412 92L20 92C8.9543 92 -3.63004e-06 83.0457 -3.14722e-06 72L-8.74228e-07 20C-3.91405e-07 8.95429 8.95431 -1.84919e-05 20 -1.80091e-05L412 -8.74228e-07Z"
            fill="url(#paint0_linear_6517_14540)"
            fillOpacity={0.55}
          />
        </G>
        <Defs>
          <ClipPath
            id="bgblur_0_6517_14540_clip_path"
            transform="translate(30 30)">
            <Path d="M412 -8.74228e-07C423.046 -3.91405e-07 432 8.95431 432 20L432 72C432 83.0457 423.046 92 412 92L20 92C8.9543 92 -3.63004e-06 83.0457 -3.14722e-06 72L-8.74228e-07 20C-3.91405e-07 8.95429 8.95431 -1.84919e-05 20 -1.80091e-05L412 -8.74228e-07Z" />
          </ClipPath>
          <SvgLinearGradient
            id="paint0_linear_6517_14540"
            x1={536.261}
            y1={-94.6266}
            x2={414.906}
            y2={221.743}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#AED1F8" />
            <Stop offset={1} stopColor="#88E7F6" />
          </SvgLinearGradient>
        </Defs>
      </Svg>
      {homeCategoryOptions?.map(item => {
        const isActive = category === item?.id;
        return (
          <TouchableOpacity
            key={item?.id}
            onPress={() => handlePress(item)}
            style={[
              styles.buttonWrapper,
              {
                width:
                  Platform?.OS === 'android' && item?.id === 1
                    ? width / 3.8
                    : item?.id === 4
                    ? width / 7
                    : width / 4.2,
              },
            ]}
            activeOpacity={0.8}>
            <LinearGradient
              colors={
                isActive
                  ? [colors.pink, colors.pink]
                  : [colors.white, colors.white]
              }
              style={styles.button}>
              {item?.icon}
              <Text
                style={[
                  styles.text,
                  {
                    color: isActive ? colors.white : colors.black,
                    marginLeft: item?.icon ? 2 : 0,
                  },
                ]}>
                {item?.name}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CategorySelector;
