// RenderItem.js
import * as Animatable from 'react-native-animatable';
import React, {useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles';
import GradientText from '../../../components/text/GradientText';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {GradientBorderButton} from '../../../components/buttons/GradientBorderButton';
import {height, width} from '../../../constant';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import {onboardingContent} from '../../../utils/string';
import {images} from '../../../assets/images';
import {NextButton} from '../../../components/buttons/NextButton';
import {config} from '../../../environment';

const RenderItem = forwardRef(({item, index, handleSkip}, ref) => {
  const imageRef = useRef(null);

  useImperativeHandle(ref, () => ({
    fadeIn: () => imageRef.current?.fadeIn(1000),
    fadeOut: () => imageRef.current?.fadeOut(1000),
  }));

  return (
    <View style={[styles.container]}>
      {index !== 4 && (
        <TouchableOpacity onPress={handleSkip} style={styles?.skipButton}>
          <GradientText style={styles.text}>SKIP</GradientText>
        </TouchableOpacity>
      )}
      <Animatable.Image
        ref={imageRef}
        source={item.image}
        style={styles.imageBg}
        animation="fadeIn"
        duration={500}
        useNativeDriver
      />
    </View>
  );
});


export default RenderItem;
