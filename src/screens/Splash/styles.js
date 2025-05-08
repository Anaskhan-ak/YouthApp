import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const {height, width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  background: {flex: 1, alignItems: 'center', justifyContent: 'center',marginTop:-100,},
  contentView: {
    position: 'absolute',
    bottom: height * 0.03,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: width * 0.04,
    fontFamily: fonts?.montserratBold,
    color: colors?.white,
  },
  subHeading: {
    fontSize: width * 0.035,
    fontFamily: fonts?.montserratRegular,
    color: colors?.white,
  },
  logo: {width: 200, height: 200},
});
