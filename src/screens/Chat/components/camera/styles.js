import { StyleSheet } from 'react-native';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.008,
    overflow : "hidden",
  },
  cameraContainer :  {
    justifyContent: 'center',
    alignItems: 'center',
    overflow : "hidden"
  },
  camera: {
    borderRadius: width * 0.03,
    height: height * 0.32,
    width: width * 0.95,
  },
  button: {
    width: width * 0.15,
    height: width * 0.15,
    borderWidth: width * 0.01,
    borderColor: colors?.white,
    borderRadius: width * 0.15,
    position: 'absolute',
    zIndex: 10,
    bottom: height * 0.01,
    alignSelf : "center",
    alignItems : 'center',
    justifyContent : 'center'
  },
  toggleCamera: {
    position: 'absolute',
    zIndex: 10,
    top: height * 0.01,
    left: width * 0.04,
  },
});