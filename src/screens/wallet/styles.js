import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {Platform} from 'react-native';

const {height, width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.white,
  },
  header: {
    flex: 0.2,
    justifyContent:"center"
  },
  contentContainer: {
    flex: 0.8,
    backgroundColor: colors?.white,
    borderTopStartRadius: width * 0.1,
    borderTopEndRadius: width * 0.1,
    marginTop: -height * 0.04,
    alignItems: 'center',
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    marginTop: height * 0.05,
    resizeMode:"contain",
  },
  headingWithIconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: width * 0.055,
    fontFamily: fonts?.montserratExtraBold,
  },
  title: {
    fontSize: width * 0.0375,
    fontFamily: fonts?.montserratMedium,
    textAlign: 'center',
    width: '80%',
    lineHeight: height * 0.025,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: height * 0.05,
    // gap:5
  },
  bottomContentView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
