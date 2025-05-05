import { StyleSheet } from 'react-native';
import { height, width } from '../../constant';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor : colors?.white
  },
  header : {
    margin : height * 0.02,
    marginTop : height * 0.06
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems : 'center'
  },
  gradientHeading: {
    fontFamily: fonts?.montserratExtraBold,
    fontSize: width * 0.08,
    lineHeight: width * 0.1,
  },
  subHeading : {
    fontFamily : fonts?.montserratRegular,
    fontSize : width * 0.032,
    alignItems : 'center',
    marginTop : height * 0.006
  },
  itemGradientButton : {
    borderRadius : width * 0.02,
    margin : width * 0.02,
    borderRadius : width * 0.02,
    width : width * 0.4,
    height : height * 0.06,
    alignItems : 'center',
    justifyContent : 'center'
  },
  itemButton : {
    borderRadius : width * 0.02,
    margin : width * 0.02,
    borderColor : colors?.grayTransparent,
    borderWidth : width * 0.002,
    borderRadius : width * 0.02,
    width : width * 0.4,
    height : height * 0.06,
    alignItems : 'center',
    justifyContent : 'center'
  },
  itemText : {
    fontFamily : fonts?.montserratSemiBold
  }
});
