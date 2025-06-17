import { Platform, StyleSheet } from 'react-native';
import { height, Pixels, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts/index';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: width * 0.02,
    paddingLeft: width * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.extraLightGrey,
    paddingVertical: Platform.OS === 'ios' && height * 0.01,
  },
  input: {
    flex: 1,
    fontSize: Pixels(13),
    color: colors.black,
    fontFamily: fonts?.montserratMedium,
    alignItems: 'center',
  },
  text : {
    fontSize: width * 0.03,
    color: colors.black,
    fontFamily: fonts?.montserratRegular,
  }
});
