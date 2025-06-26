import { Platform, StyleSheet } from 'react-native';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    height : height
  },
  // video: height => ({
    video : {
    backgroundColor: colors?.black,
    width: '100%',
    // height: Platform.OS === 'ios' ? height : height - 50,
    height : height,
    resizeMode : 'cover',
  // }),
    },
  reactions: {
      position: 'absolute',
      right: width * 0.02,
      top: height * 0.15,
    },
    blurContainer: {
        borderTopLeftRadius: width * 0.04,
        borderTopRightRadius: width * 0.04,
        padding: width * 0.03,
        bottom: Platform?.OS === 'android' ? 0 : height * 0.15,
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
        color: colors?.white,
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
