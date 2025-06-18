import { StyleSheet } from 'react-native';
import { height, Pixels, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop : height * 0.02
  },
  heading: {
    fontSize: Pixels(19),
    fontFamily: fonts?.montserratExtraBold,
    color : colors?.text,
    lineHeight : Pixels(20),
    
  },
  title: {
    fontSize: width * 0.035,
    fontFamily: fonts?.montserratMedium,
    textAlign: 'center',
    lineHeight: height * 0.025,
  },
  link: {
    fontSize: width * 0.034,
    fontFamily: fonts?.montserratMedium,
    textAlign: 'center',
    lineHeight: height * 0.025,
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueTick: {
    marginHorizontal: 6,
  },
  tagline : {
    flexDirection : 'row',
    alignItems : "center",
    justifyContent : "space-between",
    marginTop : height * 0.01
  },
  taglineText : {
    fontFamily : fonts?.montserratRegular,
    fontSize : Pixels(13),
    color : colors?.text
  }
});
