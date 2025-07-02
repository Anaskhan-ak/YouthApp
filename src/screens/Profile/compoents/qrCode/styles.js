import { StyleSheet } from 'react-native';
import { height, Pixels, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';

export const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
    padding: 20,
    alignItems: 'center',
  },
gradientBorder: {
    // wdith : width * 0.7,
    // height : height * 0.3,
    padding: width * 0.01,
    borderRadius: width * 0.03,
  },
  qrcode: {
    backgroundColor: colors?.white, 
    padding: width * 0.03,
    borderRadius: width * 0.02,
  },  
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: height * 0.02,
    width: width * 0.6,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontFamily: fonts?.montserratMedium,
    fontSize: Pixels(12),
    color: colors?.gray,
  },
});
