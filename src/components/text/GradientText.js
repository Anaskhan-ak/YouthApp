import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const GradientText = props => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={['#478FE4', '#478FE4', '#5CD3C6']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.root}>
        <Text {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
const styles = StyleSheet.create({
  root: {
    alignItems: 'baseline',
    justifyContent: 'center',
  },
});
