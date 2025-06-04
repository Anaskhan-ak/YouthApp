import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {Platform} from 'react-native';

const {height, width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.white,
  },
  header: {
    flex: 0.2,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 0.8,
    backgroundColor: colors?.white,
    borderTopStartRadius: width * 0.1,
    borderTopEndRadius: width * 0.1,
    marginTop: -height * 0.04,
    paddingVertical: 20,
    paddingHorizontal: width * 0.08,
  },

  heading: {
    fontSize: width * 0.065,
    fontFamily: fonts?.montserratExtraBold,
  },
  title: {
    fontSize: width * 0.035,
    fontFamily: fonts?.montserratMedium,
    lineHeight: height * 0.025,
    left: 15,
  },
  unSelect: {
    width: 18,
    height: 18,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkRememberMe: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: colors?.white,
    zIndex: 999,
  },
  bulletView: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    marginVertical: 20,
  },
  text: {
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.035,
  },
});
