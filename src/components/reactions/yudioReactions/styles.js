import {StyleSheet} from 'react-native';
import {height, width} from '../../../constant';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors?.gray,
    width: width * 0.11,
    height: width * 0.11,
    padding: width * 0.02,
    borderRadius: width * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.006,
  },
  buttonView: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.1,
    backgroundColor: colors?.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.025,
  },
  gradientProfileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: width * 0.02,
  },
  gradientProfileIcon: {
    width: width * 0.11,
    height: width * 0.11,
    borderRadius: width * 0.11,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientProfileImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.1,
    alignSelf: 'center',
  },
  plusButton: {
    position: 'absolute',
    top: height * 0.04,
    backgroundColor: colors?.white,
    borderRadius: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
