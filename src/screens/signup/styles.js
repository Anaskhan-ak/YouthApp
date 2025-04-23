import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
import {height, width} from '../../constant';
import {fonts} from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  imageView: {
    flex: 0.7,
    borderBottomLeftRadius: width * 0.1,
    borderBottomRightRadius: width * 0.1,
  },
  contentView: {
    flex: 1,
    backgroundColor: colors?.white,
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.015,
  },
  image: {flex: 1, marginTop: -height * 0.07},
  heading: {
    fontSize: width * 0.055,
    fontFamily: fonts?.montserratExtraBold,
  },
  title: {
    fontSize: width * 0.05,
    fontFamily: fonts?.montserratRegular,
    marginTop:4
  },
  textContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop:height*0.02
  },
  textView:{width: '49%'}
});
