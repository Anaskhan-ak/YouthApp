import {StyleSheet} from 'react-native';
import {height, width} from '../../constant';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: colors?.white,
    // alignItems : "center",
  },
  userInfoHeader: {
    marginVertical: height * 0.01,
    alignSelf: 'center',
  },
  input: {
    margin: width * 0.04,
  },
  post: {
    marginTop: height * 0.02,
    borderRadius: width * 0.03,
    overflow: 'hidden',
  },
  postInner: {
    padding: width * 0.04,
  },
});
