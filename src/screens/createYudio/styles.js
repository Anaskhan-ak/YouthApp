import {Platform, StyleSheet} from 'react-native';
import {height, width} from '../../constant';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.white,
    marginTop: Platform?.OS === 'android' ? -width * 0.08 : -width * 0.2,
  },
  userInfoHeader: {
    marginVertical: width * 0.03,
  },
  content: {
    padding: width * 0.03,
    marginBottom: height * 0.1,
  },
  inputTitle: {
    backgroundColor: colors?.greyBackground,
    padding: width * 0.03,
    borderRadius: width * 0.02,
    color: colors?.gray12,
  },
  inputThumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height * 0.003,
  },
  inputDescContainer: {
    backgroundColor: colors?.greyBackground,
    borderRadius: width * 0.02,
    flex: 2,
  },
  inputDesc: {
    backgroundColor: colors?.greyBackground,
    color: colors?.gray12,
    borderRadius: width * 0.02,
    padding: width * 0.03,
    textAlignVertical: 'top',
    flex: 2,
  },
  thumbnailButton: {
    backgroundColor: colors?.greyBackground,
    borderRadius: width * 0.02,
    alignItems: 'center',
    flex: 1,
    margin: width * 0.008,
    paddingVertical: height * 0.029,
    overflow: 'hidden',
  },
  thumbnailImage: {
    borderRadius: width * 0.02,
    margin: width * 0.01,
    paddingVertical: height * 0.029,
    width: width * 0.3,
    height: height * 0.18,
    resizeMode: 'cover',
  },
  uploadThumbnailText: {
    color: colors?.textGray,
    fontFamily: fonts?.montserratRegular,
    marginTop: height * 0.03,
  },
  inputDescFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.005,
  },
  Ai: {
    borderColor: colors?.gray,
    borderWidth: width * 0.005,
    padding: width * 0.01,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: width * 0.04,
    borderWidth: width * 0.002,
    marginHorizontal: width * 0.01,
  },
  AiText: {
    fontSize: width * 0.015,
    fontFamily: fonts?.montserratBold,
    marginLeft: width * 0.01,
    color: colors?.textGray,
  },
  character: {
    color: colors?.gray12,
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.03,
  },
  yudioContainer: {
    // backgroundColor : 'red',
    marginTop: height * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dottedBorder: {
    borderStyle: 'dotted',
    backgroundColor: 'transparent',
    width: width * 0.44,
    height: width * 0.44,
    borderRadius: width * 0.44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: width * 0.008,
    padding: width * 0.06,
    borderColor: colors?.gray,
  },
  yudioGradientImageBorder: {
    width: width * 0.42,
    height: width * 0.42,
    borderRadius: width * 0.42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yudioImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.4,
  },
  mic: {
    marginVertical: height * 0.02,
  },
  recordedPlayerContainer: {
    marginTop: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordedPlayerHeading: {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.05,
  },
  recordedPlayerName: {
    fontFamily: fonts?.montserratRegular,
    fontSize: width * 0.04,
  },
  recordedPlayer: {
    // marginTop: height * 0.01,
  },
  crossButton: {
    alignSelf: 'flex-end',
    marginRight: width * 0.03,
    marginTop: -height * 0.01,
    // backgroundColor : 'red',
    padding: width * 0.02,
  },
  redTickButton: {
    alignSelf: 'center',
    marginTop: -height * 0.02,
  },
  yudioPlayerContainer: {
    marginVertical: height * 0.02,
  },
});
