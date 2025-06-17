import { Platform, StyleSheet } from 'react-native';
import { height, width } from '../../../constant';
export const styles = StyleSheet.create({
  gradient: {
    height: Platform?.OS === 'ios' ? height * 0.14 : height * 0.16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    overflow: 'hidden',
    marginTop: -height * 0.08,
    width: width,
    borderBottomLeftRadius: width * 0.07,
    borderBottomRightRadius: width * 0.07,
  },
  safeAreaContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: width * 0.05,
    paddingVertical: 10,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
  },
  imageBorder: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    left: 10,
  },
  image: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.1,
  },
});