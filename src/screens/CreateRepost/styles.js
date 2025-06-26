import { StyleSheet } from 'react-native';
import { height, width } from '../../constant';
import { colors } from '../../utils/colors';

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
    // alignSelf : "center",
    marginTop: height * 0.02,
    padding: width * 0.04,
    borderRadius: width * 0.03,
  },
});
