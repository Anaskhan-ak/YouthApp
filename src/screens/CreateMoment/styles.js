import { StyleSheet } from 'react-native';
import { height, width } from '../../constant';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    position: 'absolute',
    zIndex: 10,
    top: height * 0.02,
    justifyContent: 'space-between',
    // alignItems : 'center',
    flexDirection: 'row',
    width: width * 0.9,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: colors?.blackTransparent,
    width: width * 0.1,
    height: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.01,
  },
  camera: {width: width, height: height},
 


});
