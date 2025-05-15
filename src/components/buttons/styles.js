import {Dimensions, Platform, StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
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
    height: height * 0.05,
    alignSelf: 'center',
    marginTop: height * 0.012,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: 'white',
    fontSize: width * 0.04,
    fontFamily: fonts?.montserratBold,
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
    fontSize: width * 0.04,
    fontFamily: fonts?.montserratExtraBold,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // marginTop: Platform.OS === 'ios' ? height * 0.012 : undefined,
  },

  socialButton: {
    height: height * 0.05,
    backgroundColor: 'black',
    width: width * 0.69,
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
  gbb1: {
    height: height * 0.05,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  gbb2: {
    height: height * 0.046,
    borderRadius: 3,
    justifyContent: 'center',
    backgroundColor: colors.white,
    alignItems: 'center',
  },
});

export const CreateButtonStyles = StyleSheet.create({
  container: {
    bottom: 0,
    position: 'absolute',
    width: width,
    zIndex: 10,
    paddingHorizontal: width * 0.15,
    paddingVertical: width * 0.05,
    borderTopLeftRadius: width * 0.05,
    borderTopRightRadius: width * 0.05,
  },
  button: {
    backgroundColor: colors?.white,
    borderRadius: width * 0.02,
    alignItems: 'center',
    padding: width * 0.02,
  },
  text: {
    fontFamily: fonts?.montserratExtraBold,
    fontSize: width * 0.05,
  },
});
