import { height, width } from '../../constant';
import { fonts } from '../../utils/fonts';

const {StyleSheet, Text} = require('react-native');
const {View} = require('react-native');

const EmptyComponent = ({text}) => {
  return (
    <View style={styles?.container}>
      <Text style={styles?.text}>{text}</Text>
    </View>
  );
};

export default EmptyComponent

const styles = StyleSheet.create({
  container: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.06,
  },
});
