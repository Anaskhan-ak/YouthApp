import {StyleSheet} from 'react-native';
import {colors} from '../../../../utils/colors';
import {height, width} from '../../../../constant';

export const styles = StyleSheet.create({
  container: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.25,
    alignSelf: 'center',
    marginTop: -height * 0.06,
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.25,
  },
  btn: {
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: width * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 6,
    zIndex: 999,
    right: 4,
  },
});
