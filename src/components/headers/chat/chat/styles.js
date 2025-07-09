import { StyleSheet } from 'react-native';
import { height, Pixels, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    height: height * 0.12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.02,
    paddingTop: height * 0.03,
    backgroundColor: colors?.white,
  },
  backButton: {
    alignItems: 'center',
    // backgroundColor : 'red',
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.03,
    flex:0.2
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft : width * 0.1,
    flex:1
  },
  button: {
    borderWidth: width * 0.003,
    borderColor: colors?.white,
    borderRadius: width * 0.01,
    padding: width * 0.01,
    alignItems: 'center',
    margin : width * 0.01
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex:1
  },
  image: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.1,
  },
  textContainer: {
    marginLeft: width * 0.02,
  },
  title: {
    fontFamily : fonts?.montserratSemiBold,
    fontSize : Pixels(14)
  },
  lastOnline: {
    fontFamily : fonts?.montserratRegular,
    fontSize : Pixels(8),
    color : colors?.textGray
  },
});
