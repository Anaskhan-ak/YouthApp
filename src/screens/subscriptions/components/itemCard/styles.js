import {Platform, StyleSheet} from 'react-native';
import {height, width} from '../../../../constant';
import {colors} from '../../../../utils/colors';
import {fonts} from '../../../../utils/fonts';

export const styles = StyleSheet.create({
  contentView: {
    backgroundColor: colors?.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
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
    marginVertical: height * 0.05,
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
  crossButton: {
    position: 'absolute',
    top: height * 0.045,
    left: width * 0.03,
    zIndex: 10,
    padding: 15,
  },
  container: {
    flex: 1,
    backgroundColor: colors?.white,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    color: colors?.black,
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.045,
    right: Platform?.OS === 'ios' && width * 0.04,
  },
  gradientText: {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.045,
  },
  contentBox: {
    margin: 10,
  },
  contentHeading: {
    color: colors?.gray,
    fontFamily: fonts?.montserratRegular,
    fontSize: width * 0.04,
    marginBottom: height * 0.015,
  },
  scrollContent: {
    paddingBottom: height * 0.01,
  },
  contentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: width * 0.02,
  },
  itemLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: width * 0.085,
    height: width * 0.085,
    borderRadius: (width * 0.085) / 2,
  },
  itemName: {
    fontSize: width * 0.037,
    fontFamily: fonts?.montserratSemiBold,
    marginLeft: width * 0.02,
  },
  gradientButton: {
    width: width * 0.12,
    height: height * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientButtonText: {
    fontFamily: fonts?.montserratSemiBold,
    textAlign: 'center',
    color: colors?.white,
  },
  grayButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors?.gray,
    height: height * 0.0325,
    width: width * 0.225,
    borderRadius: 5,
  },
  grayButtonText: {
    fontFamily: fonts?.montserratBold,
    textAlign: 'center',
    color: colors?.text,
  },
  list: {
    height: height * 0.85,
    padding: width * 0.03,
    // paddingBottom : height * 0.1
  },
});
