import {height, width} from '../../../../constant';
import {ImageBackground, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: height * 0.15,
    gap: 10,
    marginHorizontal: width * 0.06,
  },
  btn: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    left: 10,
  },
  image: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.08,
  },
});
