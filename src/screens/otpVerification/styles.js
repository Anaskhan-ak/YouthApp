import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const {height, width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  topView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors?.white,
  },
  contentView: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  heading: {
    fontSize: width * 0.055,
    fontFamily: fonts?.montserratExtraBold,
    color: colors?.black,
    marginVertical: height * 0.02,
    marginTop: height * 0.03,
    textAlign:"center"
  },
  subHeading: {
    fontSize: width * 0.035,
    fontFamily: fonts?.montserratRegular,
    color: colors?.black,
    textAlign: 'center',
    lineHeight: height * 0.025,
    width: '70%',
  },
  logo: {width: 200, height: 200},
  gradientText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.03,
  },
  bottomContentView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: height * 0.02,
  },
});
