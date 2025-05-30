import { height, width } from '../../constant';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

const {StyleSheet, Text} = require('react-native');
const {View} = require('react-native');

const EmptyComponent = ({Icon, text, subtext}) => {
  return (
    <View style={styles?.container}>
      <View style={{backgroundColor : 'red'}}>{Icon}</View>
      
      <Text style={styles?.text}>{text}</Text>
      <Text style={styles?.subText}>{subtext}</Text>
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
  subText: {
    textAlign: 'center',
    fontFamily: fonts?.montserratSemiBold,
    fontSize: width * 0.04,
    color : colors?.textGray
  },
});
