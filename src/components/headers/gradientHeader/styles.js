import {Platform, StyleSheet} from 'react-native';
import {height, Pixels, width} from '../../../constant';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'android' ? height * 0.12 : height * 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: Platform.OS === 'android' ? width * 0.05 : 0,
    paddingVertical: Platform.OS === 'android' ? height * 0.02 : 0,
  },
  backButton: {
    flex: 1,
    paddingLeft: 20,
    paddingBottom: 10,
    zIndex:999
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  title: {
    fontFamily: fonts.montserratExtraBold,
    color: colors.white,
    fontSize: Pixels(20),
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingBottom: 10,
  },
  advancedButton: {
    borderWidth: width * 0.003,
    borderColor: colors.white,
    borderRadius: width * 0.01,
    padding: width * 0.008,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.2,
  },
  advancedButtonText: {
    color: colors.white,
    fontFamily: fonts.montserratBold,
    fontSize: Pixels(10),
  },
});
