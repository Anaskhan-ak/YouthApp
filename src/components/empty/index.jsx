import { height, width } from '../../constant';
import { fonts } from '../../utils/fonts';

const {StyleSheet} = require('react-native');
const {View} = require('react-native');

const EmptyComponent = () => {
  return (
    <View style={styles?.container}>
      <Text style={styles?.text}>Failed to load yudios</Text>
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
