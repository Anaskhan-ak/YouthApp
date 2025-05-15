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
    marginVertical : height * 0.005
  },
  selectFileButton: {
    backgroundColor : colors?.greyBackground,
    flexDirection : 'row',
    alignItems : "center",
    justifyContent : 'flex-start',
    padding : width * 0.025,
    marginVertical : height * 0.003,
    borderRadius : width * 0.02
  },
  selectFileText: {
    marginLeft : width * 0.02,
    fontFamily : fonts?.montserratSemiBold
  },
  audioPlayerContainer : {
    marginVertical : height * 0.01
  }
});
