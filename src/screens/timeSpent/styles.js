import {
  StyleSheet
} from 'react-native';
import { height, Pixels, width } from '../../constant';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : colors?.white
  },
  content: {
    // flex: 1,
    padding: width * 0.05,
  },
  heading: {
    color: colors.text,
    fontFamily : fonts?.montserratBold,
    fontSize: Pixels(12),
  },
  subheading: {
    color: colors.text,
    marginLeft: width * 0.02,
    fontFamily : fonts?.montserratRegular,
    fontSize : Pixels(12)
  },
  graphStyle: {
    marginTop: 30,
    borderRadius: 16,
  },
  button: {
    backgroundColor: colors.gray11,
    padding: width * 0.03,
    borderRadius: width * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.007,
  },
  buttonText: {
    color: colors.text,
    fontFamily : fonts?.montserratBold,
    fontSize: Pixels(13),
  },
  buttonDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  gradientText: {
    // color: colors.RGB1,
    marginHorizontal: width * 0.02,
    fontFamily : fonts?.montserratBold,
    fontSize : Pixels(13)
  },
  activeButton: {
    backgroundColor: colors.gray11,
    padding: width * 0.03,
    borderTopLeftRadius: width * 0.02,
    borderTopRightRadius: width * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 1,
  },
  tabContainer : {
    marginBottom: height * 0.007
  },
  tab: {
    backgroundColor: colors.gray11,
    padding: width * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: width * 0.003,
  },
  tabText: {
    color: colors.gray12,
    fontFamily : fonts?.montserratBold,
    fontSize: Pixels(11),
  },
});