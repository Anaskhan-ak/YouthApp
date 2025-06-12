import {PixelRatio, Platform, StyleSheet} from 'react-native';
import {height, width} from '../../../../constant';
import {fonts} from '../../../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: Platform?.OS === 'ios' && height * 0.15,
    paddingVertical: Platform?.OS === 'android' && height * 0.014,
    overflow: 'hidden',
    zIndex: Platform?.OS === 'ios' ? -1 : 0,
  },
  buttonWrapper: {
    marginTop: Platform?.OS === 'ios' && height * 0.1,
    width: width / 3.75,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.035,
    borderRadius: 10,
    flexDirection: 'row',
  },
  text: {
    fontSize: PixelRatio.getFontScale() * 9,
    fontFamily: fonts.montserratBold,
  },
});
