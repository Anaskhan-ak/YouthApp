import {height, width} from '../../../../constant';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: height * 0.15,
    gap: 10,
    marginHorizontal: width * 0.06,
  },
  imageBorder: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.12,
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
