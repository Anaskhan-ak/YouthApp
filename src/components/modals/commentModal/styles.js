import { StyleSheet } from 'react-native';
import { height, Pixels, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

export const styles = StyleSheet?.create({
  contentContainer: {
  flex: 1,
  paddingHorizontal: 20,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  backgroundColor: colors?.white,
},

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: height * 0.01,
  },
  commentCount: {
    fontFamily: fonts?.montserratSemiBold,
    fontSize: Pixels(18),
    color: colors?.text,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sortText: {
    fontFamily: fonts?.montserratRegular,
    fontSize: Pixels(14),
    color: colors?.text,
    marginRight: width * 0.02,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: width * 0.002,
    borderColor: colors?.gray11,
    borderRadius: width * 0.065,
    paddingHorizontal: width * 0.01,
    // marginBottom: height * 0.2,
  },
  input: {
    flex: 0.65,
    color: colors?.text,
    left: 10,
  },
  button: {
    padding: width * 0.01,
    // marginHorizontal: width * 0.005,
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.3,
    justifyContent: 'space-evenly',
    right: -width * 0.03,
  },
  image : {
    width : width * 0.1,
    height : width * 0.1,
    borderRadius : width * 0.1
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
});
