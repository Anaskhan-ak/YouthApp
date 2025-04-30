import {StyleSheet} from 'react-native';
import {height, width} from '../../../constant';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: height * 0.03,
  },
  otpContainer: {
    marginBottom: height * 0.03,
  },
  otpInput: {
    borderBottomWidth: 2,
    width: width * 0.12,
  },
});
