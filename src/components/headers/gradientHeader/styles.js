import { Platform, StyleSheet } from 'react-native';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    height: height * 0.12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: Platform?.OS === 'android' && width * 0.05,
    paddingVertical: Platform?.OS === 'android' && height * 0.02,
  },
  title: {
    fontFamily: fonts?.montserratExtraBold,
    color: colors?.white,
    fontSize: width * 0.055,
    flex : 0.7,
    textAlign : 'center'
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.03,
    flex : 0.1
  },
  advancedButton: {
    borderWidth: width * 0.003,
    borderColor: colors?.white,
    borderRadius: width * 0.01,
    padding: width * 0.01,
    alignItems: 'center',
    right: Platform?.OS === 'ios' && 8,
    flex : 0.2
  },
  advancedButtonText: {
    color: colors?.white,
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.03,
  },
});
