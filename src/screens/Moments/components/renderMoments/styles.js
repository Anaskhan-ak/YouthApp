import { StyleSheet } from 'react-native';
import { height } from '../../../../constant';
import { colors } from '../../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex : 1,
    height : height
  },
  // video: height => ({
    video : {
    backgroundColor: colors?.black,
    width: '100%',
    // height: Platform.OS === 'ios' ? height : height - 50,
    height : height,
    resizeMode : 'cover',
    borderWidth : 10,
    borderColor : 'red'
  // }),
    },
  controlsContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
