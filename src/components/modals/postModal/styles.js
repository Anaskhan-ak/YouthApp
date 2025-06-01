import {Dimensions, Platform, StyleSheet} from 'react-native';
import {width} from '../../../constant';
const {height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  animatedContainer: {
    width: width,
    alignSelf: 'center',
    // backgroundColor : "red"
  },

  gradientBar: {
    width: Platform?.OS == 'ios' && width,
    height: Platform?.OS == 'ios' && height * 0.06,
    justifyContent: Platform?.OS === 'ios' ? 'space-around' : 'space-between',
    borderTopLeftRadius: width * 0.04,
    borderTopRightRadius: width * 0.04,
    paddingVertical: Platform?.OS === 'android' && width * 0.04,
    paddingHorizontal: Platform?.OS === 'android' && width * 0.07,
  },
});
