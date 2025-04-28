import {Platform, StyleSheet} from 'react-native';
import {height, width} from '../../../constant';
import {fonts} from '../../../utils/fonts/index';
import {colors} from '../../../utils/colors';

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
    fontSize: width * 0.03,
    color: colors.black,
    fontFamily: fonts?.montserratRegular,
    alignItems: 'center',
  },
});
