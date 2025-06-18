import { StyleSheet } from 'react-native';
import { height, Pixels, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';
export const styles = StyleSheet.create({
  container: {
    // flex : 1,
    backgroundColor: colors?.white,
    alignItems: 'center',
  },
  name: {
    fontFamily: fonts?.montserratBold,
    fontSize: Pixels(19),
    color: colors?.text,
    lineHeight: Pixels(20),
    marginVertical: height * 0.009,
  },
  form: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    borderRadius: width * 0.02,
    backgroundColor: colors?.extraLightGrey,
    marginVertical: height * 0.005,
  },
  inputTextColor: {
    fontFamily: fonts?.montserratMedium,
    fontSize: Pixels(14),
  },
  chars: {
    textAlign: 'right',
  },
  link: {
    marginVertical: height * 0.005,
  },
  linkText: {
    fontSize: Pixels(14),
    textDecorationLine: 'underline',
    fontFamily: fonts?.montserratSemiBold,
  },
  addMoreText: {
    fontSize: Pixels(14),
    textDecorationLine: 'underline',
    fontFamily: fonts?.montserratBold,
  },
  addMoreButton: {
    position: 'absolute',
    right: 10,
    zIndex: 10,
    bottom: height * 0.02,
  },
  bioInput: {
    flex: 1,
    textAlignVertical: 'top',
    color: colors?.text,
    fontFamily: fonts?.montserratMedium,
    fontSize : Pixels(13)
  },
  errorText:{
    color : colors?.red,
    fontFamily : fonts?.montserratMedium,
    fontSize : Pixels(10)
  },
  bioHeading : {
    fontSize: Pixels(14),
    fontFamily: fonts?.montserratBold,
    color : colors?.text,
    
  }
});
