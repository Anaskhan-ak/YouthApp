import { StyleSheet } from 'react-native';
import { height, width } from '../../constant';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.white,
  },
  userInfoHeader: {
    marginVertical: width * 0.03,
  },
  content: {
    padding: width * 0.03,
    // marginBottom: height * 0.1,
  },
  mediaImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  mediaImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.01,
    margin: width * 0.01,
  },
  cancelImage: {
    backgroundColor: colors?.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: width * 0.02,
    right: width * 0.02,
    padding: width * 0.008,
    borderRadius: width * 0.03,
    zIndex: 10,
  },
  selectFileContainer: {
    marginVertical: height * 0.005,
  },
  selectFileButton: {
    backgroundColor: colors?.greyBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: width * 0.025,
    marginVertical: height * 0.003,
    borderRadius: width * 0.02,
  },
  selectFileText: {
    marginLeft: width * 0.02,
    fontFamily: fonts?.montserratSemiBold,
  },
  audioPlayerContainer: {
    marginVertical: height * 0.01,
  },
  documentContainer: {
    flexDirection : "row",
    alignItems : 'center',
    justifyContent : 'flex-start',
    marginBottom : height * 0.1,
    width : width * 0.935
  },
  thumbnailBackground: {
    width : width * 0.4,
    height : height * 0.15,
    borderRadius : width * 0.03,
    overflow : 'hidden',
    alignItems : 'center',
    justifyContent : 'center',
  },
  blur: {
    position : "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  thumbnailImage: {
    width : width * 0.2,
    height : height * 0.15,
    overflow : 'hidden',
    resizeMode : "stretch"
  },
  documentText : {
    marginLeft : width * 0.02
  },
  documentName: {
    fontSize : width * 0.038,
    fontFamily : fonts?.montserratSemiBold,
    color : colors?.text
  },
  documentType: {
    fontSize : width * 0.035,
    fontFamily : fonts?.montserratRegular,
    color : colors?.textGray
  },
});
