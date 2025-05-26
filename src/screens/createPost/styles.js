import {Platform, StyleSheet} from 'react-native';
import {width} from '../../constant';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.white,
    marginTop: Platform?.OS === 'android' ? -width * 0.08 : -width * 0.2,
  },
  userInfoHeader: {
    marginBottom: width * 0.03,
  },
  content: {
    padding: width * 0.03,
    // marginBottom: height * 0.1,
  },
});
