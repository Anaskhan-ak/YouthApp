import { StyleSheet } from 'react-native';
import { height, width } from '../../constant';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.white,
    flex : 1
  },
  image: {
    width: width,
    height: height * 0.4,
    borderBottomRightRadius: width * 0.08,
    borderBottomLeftRadius: width * 0.08,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 10,
    padding: 15,
    height: height * 0.3,
  },
  heading: {
    // fontFamily: fonts?.montserratBold,
    fontFamily: fonts?.plusJakartaSansBold,
    fontSize: 30,
    color: colors?.black,
    letterSpacing: 0,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    fontFamily: fonts?.plusJakartaSansRegular,
    color: colors?.gray12,
    textAlign: 'center',
  },
  crossButton : {
    position : 'absolute',
    top : height * 0.045,
    left :  width * 0.03,
    zIndex : 10,
    padding : 15,
  }
});
