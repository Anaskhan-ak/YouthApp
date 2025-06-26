import {
  StyleSheet
} from 'react-native';
import { height, Pixels, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';
import { Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  showAllText: {
    fontFamily: fonts?.montserratMedium,
    fontSize: Pixels(8),
    color: colors?.text,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentBox: {
    borderWidth: width * 0.002,
    borderColor: colors?.gray11,
    borderRadius: width * 0.02,
    padding: width * 0.02,
    marginVertical: height * 0.005,
  },
  gradientBorder: {
    width: width * 0.06,
    height: width * 0.06,
    borderRadius: width * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: width * 0.07,
  },
  textContainer: {
    flex: 0.65,
  },
  name: {
    fontFamily: fonts?.montserratBold,
    fontSize: Pixels(10),
    color: colors?.text,
  },
  time: {
    fontFamily: fonts?.montserratMedium,
    fontSize: Pixels(9),
    color: colors?.textGray,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.3,
    justifyContent: 'space-evenly',
    right: Platform?.OS==='android'?-width * 0.03:-width * 0.06,
  },
  commentText: {
    fontFamily: fonts?.montserratMedium,
    fontSize: Pixels(11),
    color: colors?.text,
    marginLeft: width * 0.075,
    marginTop: height * 0.01,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: width * 0.002,
    borderColor: colors?.gray11,
    borderRadius: width * 0.065,
    paddingHorizontal: width * 0.01,
    marginVertical: height * 0.005,
  },
  input: {
    flex: 0.65,
    color: colors?.text,
    left:10,
    paddingVertical:Platform?.OS==='ios'&&height*0.0125
  },
  button: {
    padding: width * 0.01,
    // marginHorizontal: width * 0.005,
    zIndex:999
  },
  recordingBars: {
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.01,
  },
  yudioPlayer: {
    width: width * 0.8,
    height: height * 0.08,
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  yudioWrapper: {
    transform: [{scale: 0.7}],
    marginLeft: -width * 0.05,
  },
  replyTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  replyName: {
    fontFamily: fonts?.montserratSemiBold,
    color: colors?.textGray,
    fontSize: Pixels(10),
  },
  cancelReply: {
    backgroundColor: colors?.gray,
    paddingHorizontal: width * 0.01,
    borderRadius: width * 0.01,
    marginLeft: width * 0.02,
  },
  cancelReplyText: {
    fontFamily: fonts?.montserratSemiBold,
    color: colors?.pink,
    fontSize: Pixels(10),
  },
  repliesContainer : {
    overflow : 'hidden',
    width : width * 0.7,
    marginLeft : width * 0.1,
    borderLeftWidth : width * 0.001,
    borderColor : colors?.gray,
    marginVertical : height * 0.01,
  },
  repliesWrapper : {
    transform : [{scale : 0.9}]
  }
});