import { StyleSheet } from 'react-native';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingBottom : height * 0.15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors?.white,
  },
  heading: {
    alignSelf: 'center',
    fontFamily: fonts?.montserratExtraBold,
    fontSize: width * 0.058,
    textAlign: 'center',
    letterSpacing: -1,
    marginVertical: 12,
  },
  checkboxContainer: {
    paddingHorizontal: width * 0.06,
  },
  checkboxElement: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical : height * 0.01
  },
  text : {
    fontFamily : fonts?.montserratRegular,
    fontSize : width * 0.04
  },
  gradientCircle : {
    width : width * 0.06,
    height : width * 0.06,
    borderRadius : width * 0.06,
    alignItems : "center",
    justifyContent : 'center'
  },
  whiteCircle : {
    width : width * 0.058,
    height : width * 0.058,
    borderRadius : width * 0.058,
    backgroundColor : colors?.white
  },
  search : {
    marginHorizontal : width * 0.04
  }
});
