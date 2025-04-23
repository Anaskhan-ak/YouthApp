import {Dimensions, Platform, StyleSheet} from 'react-native';
import {fonts} from '../../utils/fonts/index';
const {height, width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  nextButton: {
    height: height * 0.045,
    width: width * 0.3,
    borderRadius: width * 0.02,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    color: 'white',
    fontSize: width * 0.045,
    fontFamily: 'Montserrat-Bold',
  },
  primaryButton: {
    height: height * 0.055,
    alignSelf: 'center',
    marginTop: height * 0.012,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: 'white',
    fontSize: width * 0.037,
    fontFamily: 'Montserrat-Bold',
  },
  BoldButton: {
    height: height * 0.05,
    width: width * 0.8,
    borderRadius: width * 0.02,
    alignSelf: 'center',
    marginTop: height * 0.012,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BoldButtonText: {
    color: 'white',
    fontSize: width * 0.04,
    fontFamily: 'Montserrat-Bold',
  },
  gradientText: {
    fontSize: width * 0.037,
    fontFamily: fonts?.montserratExtraBold,
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' && height * 0.015,
  },
  socialButton: {
    height: height * 0.05,
    backgroundColor: 'black',
    width: width * 0.7,
    alignSelf: 'center',
    borderRadius: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: height * 0.01,
    flexDirection: 'row',
  },
  socialButtonImage: {
    resizeMode: 'contain',
  },
  socialButtonText: {
    fontSize: width * 0.037,
    color: 'white',
    fontFamily: fonts?.montserratBold,
  },
  blackButton: {
    height: height * 0.05,
    backgroundColor: 'black',
    width: width * 0.7,
    alignSelf: 'center',
    borderRadius: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: height * 0.01,
    flexDirection: 'row',
  },
  blackButtonText: {
    fontSize: width * 0.037,
    color: 'white',
    fontFamily: fonts.montserratMedium,
  },
});
