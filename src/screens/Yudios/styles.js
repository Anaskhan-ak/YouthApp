import { StyleSheet } from 'react-native';
import { height, width } from '../../constant';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.white,
  },
  header: {
    flexDirection: 'row',
    // backgroundColor : 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width * 0.02,
    marginTop: height * 0.01,
  },
  headerIcon: {
    backgroundColor: colors?.gray,
    width: width * 0.11,
    height: width * 0.11,
    borderRadius: width * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.03,
  },
  reactions: {
    position: 'absolute',
    right: width * 0.02,
    top: height * 0.25,
  },
  suggestedView: {
    padding : width * 0.02
  },
  suggestedHeading: {
    fontFamily : fonts?.montserratBold,
    fontSize : width * 0.04,
    marginBottom : height * 0.004
  },
  suggestedButton: {
    margin : width * 0.004
  },
  suggestedImage: {
    width : width * 0.3,
    height : height * 0.14,
    borderRadius : width * 0.02
  },
});
