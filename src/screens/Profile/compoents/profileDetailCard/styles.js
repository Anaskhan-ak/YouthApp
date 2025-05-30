import {StyleSheet} from 'react-native';
import {colors} from '../../../../utils/colors';
import {height, width} from '../../../../constant';
import {fonts} from '../../../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  heading: {
    fontSize: width * 0.05,
    fontFamily: fonts?.montserratExtraBold,
  },
  title: {
    fontSize: width * 0.035,
    fontFamily: fonts?.montserratMedium,
    textAlign: 'center',
    lineHeight: height * 0.025,
  },
  link: {
    fontSize: width * 0.034,
    fontFamily: fonts?.montserratMedium,
    textAlign: 'center',
    lineHeight: height * 0.025,
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueTick: {
    marginHorizontal: 6,
  },
});
