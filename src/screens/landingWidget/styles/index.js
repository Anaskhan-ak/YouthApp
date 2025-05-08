import { StyleSheet } from 'react-native';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

export const styles = StyleSheet.create({
  container: {flex: 1},
  scrollView: {
    marginTop: height * 0.02,
  },
  skipButton: {
    height: height * 0.04,
    backgroundColor: 'white',
    width: width * 0.18,
    borderRadius: width * 0.01,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: height * 0.0225,
    marginRight: width * 0.045,
  },
  skiptetxt: {
    color: '#27869f',
    textAlign: 'center',
    fontFamily: fonts?.montserratExtraBold,
    fontSize: width * 0.035,
  },
  GreetText: {
    color: 'white',
    fontSize: width * 0.15,
    fontFamily: 'Montserrat-ExtraBold',
    marginLeft: width * 0.04,
  },
  welcomeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width * 0.04,
  },
  welcomeText: {
    color: colors.black,
    fontSize: 18,
    fontFamily: fonts?.montserratExtraBold,
    alignSelf: 'center',
    letterSpacing: 0,
  },
  welcomeTextY: {
    color: colors?.white,
    fontSize: width * 0.049,
    fontFamily: fonts?.montserratExtraBold,
  },
  logo: {
    tintColor: colors?.white,
  },
  timewidget: {
    height: height * 0.22,
    width: width * 0.9,
    backgroundColor: 'rgba(250, 250, 250, 0.75)',
    alignSelf: 'center',
    borderRadius: width * 0.05,
    marginTop: height * 0.025,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // paddingHorizontal: -20,
    marginBottom: height * 0.01,
  },
  welcomeTextz: {
    color: 'rgba(250, 250, 250, 0.75)',
    fontSize: width * 0.039,
    fontFamily: 'Montserrat-ExtraBold',
  },
  welcomeTextzO: {
    color: 'white',
    fontSize: width * 0.035,
    fontFamily: 'Montserrat-ExtraBold',
    textAlign: 'center',
  },
  day: {
    color: 'red',
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.03,
    marginBottom: -height * 0.025,
  },
  hours: {
    color: colors.text,
    fontFamily: fonts.montserratExtraBold,
    fontSize: width * 0.17,
    marginBottom: -height * 0.03,
    textAlign: 'center',
  },
  minutes: {
    color: colors.text,
    fontFamily: fonts.montserratMedium,
    fontSize: width * 0.15,
    textAlign: 'center',
  },
  notificationScroll: {
    height: height * 0.39,
  },
  changeWidgetButton: {
    borderWidth: width * 0.002,
    borderColor: 'white',
    width: width * 0.63,
    height: height * 0.045,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.02,
    marginTop: height * 0.0125,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width * 0.01,
  },
  dontShowText: {
    color: colors.white,
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.035,
    marginLeft: width * 0.02,
  },
  dateContainer: {
    justifyContent: 'center',
    marginLeft: width * 0.02,
  },
  podcastThumbnail: {
    width: width * 0.3,
    height: height * 0.2,
    borderRadius: width * 0.03,
    marginLeft: width * 0.02,
  },
  reactionButtons: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: width * 0.035,
    marginTop: width * 0.02,
    width: width * 0.15,
    // marginBottom: -10,
    // padding : 10
  },
  podcastMediaContainer: {
    width: width * 0.53,
    alignItems: 'center',
  },
  podcastHeading: {
    textAlign: 'center',
    fontSize: width * 0.045,
    color: colors.text,
    fontFamily: fonts.montserratBlack,
  },
  podcastSubheading: {
    textAlign: 'center',
    fontSize: width * 0.03,
    color: colors.text,
    fontFamily: fonts.montserratMedium,
    marginVertical: width * 0.008,
  },
});
