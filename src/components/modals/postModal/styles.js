import { Dimensions, StyleSheet } from 'react-native';
import { width } from '../../../constant';
const {height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  animatedContainer: {
    // position: 'absolute',
    // bottom: 0,
    width: width,
    alignSelf: 'center',
    // backgroundColor : "red"
  },

  gradientBar: {
    borderTopLeftRadius: width * 0.04,
    borderTopRightRadius: width * 0.04,
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.07,
  },
});
