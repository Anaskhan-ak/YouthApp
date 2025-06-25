import {Dimensions, Platform, StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
import {height, Pixels, width} from '../../constant';
import {fonts} from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  imageView: {
    flex: 1.2,
    borderBottomLeftRadius: width * 0.1,
    borderBottomRightRadius: width * 0.1,
    marginTop: -height * 0.075,
  },
  contentView: {
    flex: 1,
    backgroundColor: colors?.white,
    paddingHorizontal: width * 0.06,
  },
  image: {flex: 1},
  heading: {
    fontSize: Pixels(21),
    fontFamily: fonts?.montserratExtraBold,
  },
  title: {
   fontSize: Pixels(21),
    fontFamily: fonts?.montserratMedium,
    marginTop: 2,
    marginBottom: 10,
  },
  content: {
    fontSize: width * 0.028,
    fontFamily: fonts?.montserratRegular,
    lineHeight: height * 0.023,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  textView: {width: '49%'},
  phoneContainer: {
    flexDirection: 'row',
    borderRadius: width * 0.02,
    paddingLeft: width * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.extraLightGrey,
    paddingVertical: Platform.OS === 'ios' ? height * 0.01 : height * 0.014,
  },
  phoneText: {
    fontFamily: fonts?.montserratRegular,
    fontSize: width * 0.03,
    color: colors?.gray10,
    width: width * 0.17,
  },
  gradientText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.028,
  },
  bottomContentView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: height * 0.013,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberMe: {
    width: 12,
    height: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rememberMeContainer: {flexDirection: 'row', alignItems: 'center'},
  checkRememberMe: {
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: colors?.white,
  },
  authView: {
    marginTop: Platform?.OS == 'android' ? height * 0.16 : height * 0.05,
  },
  headingWithIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  unSelect: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(178, 178, 178, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(178, 178, 178, 1)',
  },
});
