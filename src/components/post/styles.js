import { StyleSheet } from 'react-native';
import { height, Pixels, width } from '../../constant';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors?.white,
    padding: width * 0.02,
    margin: width * 0.02,
    borderRadius: width * 0.04,
  },
  content: {
    // backgroundColor : 'yellow',
  },
  likes: {
    margin: height * 0.01,
  },
  comments: {
    // backgroundColor : 'red',
    margin: height * 0.01,
  },
  eventTextConatiner: {
    marginLeft: width * 0.02,
  },
  eventLocation: {
    fontFamily: fonts?.montserratSemiBold,
    fontSize: width * 0.03,
    color: colors?.text,
  },
  eventCaption: {
    fontFamily: fonts?.montserratExtraBold,
    fontSize: width * 0.03,
    color: colors?.text,
  },
  eventHost: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: width * 0.01,
  },
  hostImage: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.08,
    borderWidth: width * 0.005,
    borderColor: colors?.RGB2,
  },
  hostName: {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.026,
    color: colors?.text,
    marginLeft: width * 0.01,
  },
  eventElements: {
    bottom: height * 0.03,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  attendees: {
    marginBottom: -height * 0.01,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  dots: {
    padding: width * 0.04,
  },
  modalBg: {
    flex: 1,
    backgroundColor: `${colors?.black}CC`,
  },
  modal: {
  },
  caption: {
    margin: height * 0.01,
  },
  captionText: {
    fontFamily: fonts?.montserratMedium,
    fontSize: Pixels(12),
    color: colors?.text,
    lineHeight : height * 0.02
  },
});
