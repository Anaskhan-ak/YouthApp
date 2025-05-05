import { StyleSheet } from 'react-native';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stackItem: {
    alignSelf: 'center',
  },
  toggleText: {
    fontSize: width * 0.023,
    fontFamily: fonts.Regular,
    color: colors.black,
  },
  dropdown: {
    marginRight: width * 0.02,
  },
  crossButton: {
    backgroundColor: 'rgba(250, 250, 250, 0.34)',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.04,
    height: width * 0.04,
    borderRadius: (width * 0.08) / 2,
  },
  crossText: {
    fontFamily: fonts.Regular,
    fontSize: width * 0.025,
    textAlign: 'center',
    color: colors.text,
  },
  swipeButton: {
    // backgroundColor: 'rgba(250, 250, 250, 0.3)', // Keep transparency
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: width * 0.03,
    margin: width * 0.005,
    height: height * 0.085,
    justifyContent: 'space-between',
    // alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  profileIcon: {
    height: width * 0.11,
    width: width * 0.11,
    borderRadius: (width * 0.11) / 2,
  },
  swipeButtonContainer: {flexDirection: 'row'},
  profileName: {
    fontSize: width * 0.037,
    fontFamily: fonts?.montserratBold,
    color: colors?.text,
  },
  notificationMessage: {
    fontSize: width * 0.03,
    fontFamily: fonts?.montserratRegular,
    color: colors?.text,
  },
  notificationTime: {
    fontFamily: fonts?.montserratRegular,
    fontSize: width * 0.0245,
    alignSelf: 'center',
    marginTop: -height * 0.03,
    color: colors?.text,
    left: width * 0.3,
  },
  stackContainer: {
    minHeight: height * 0.28,
    // flex : 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  stackToggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: width * 0.03,
    backgroundColor: 'rgba(250, 250, 250, 0.34)',
    paddingVertical: height * 0.003,
    paddingHorizontal: width * 0.025,
    borderRadius: width * 0.2,
  },
});
