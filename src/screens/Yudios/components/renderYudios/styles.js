import { Platform, StyleSheet } from 'react-native';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';

export const styles = StyleSheet.create({
  renderItem: {
    flex: 1,
    height: height,
    // justifyContent: 'center',
    // marginTop: Platform?.OS === 'ios' ? -height * 0.1 : -height * 0.04,
  },
  reactions: {
    position: 'absolute',
    right: width * 0.02,
    top: height * 0.15,
  },
  suggestedView: {
    padding: width * 0.02,
  },
  suggestedHeading: {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.04,
    marginBottom: height * 0.004,
  },
  suggestedButton: {
    margin: width * 0.004,
  },
  suggestedImage: {
    width: width * 0.26,
    height: height * 0.11,
    borderRadius: width * 0.02,
  },
  blurContainer: {
    borderTopLeftRadius: width * 0.04,
    borderTopRightRadius: width * 0.04,
    padding: width * 0.03,
    bottom: Platform?.OS === 'android' ? height * 0.1 : height * 0.15,
    position: 'absolute',
    width: width,
    overflow: 'hidden',
    zIndex: 10,
  },
  blur: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height * 0.1,
    zIndex: -1,
  },
  blurText: {
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.03,
    color: colors?.text,
  },
  blurButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeAllText: {
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.03,
    color: colors?.RGB1,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: width * 0.005,
  },
  tagText: {
    color: colors?.RGB1,
    fontFamily: fonts?.montserratMedium,
    marginHorizontal: width * 0.02,
  },
});
