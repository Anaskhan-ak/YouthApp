import { StyleSheet } from 'react-native';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    height: height * 0.18,
    backgroundColor: colors?.extraLightGrey,
    borderRadius: width * 0.02,
    flex: 2,
  },
  input: {
    backgroundColor: colors?.extraLightGrey,
    color: colors?.gray12,
    borderRadius: width * 0.02,
    padding: width * 0.03,
    textAlignVertical: 'top',
    flex: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.01,
  },
  character: {
    color: colors?.gray12,
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.03,
  },
  button : {
    borderColor : colors?.gray,
    borderWidth : width * 0.005,
    padding : width * 0.01,
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems : 'center',
    borderRadius : width * 0.04,
    marginHorizontal : width * 0.01
  }, 
  buttonText : {
    fontSize : width * 0.015,
    fontFamily : fonts?.montserratBold,
    marginLeft : width * 0.01,
    color : colors?.textGray
  },
  row : {
    flexDirection : "row",
    alignItems : "center",
    justifyContent : "center"
  }
});
