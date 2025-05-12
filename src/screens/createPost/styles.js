import { StyleSheet } from 'react-native';
import { height, width } from '../../constant';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.white,
  },
  userInfoHeader : {
    marginVertical  :width * 0.03
  },
  content: {
    padding: width * 0.03,
    marginBottom: height * 0.1,
  },
  modal : {
    alignItems : "center",
    justifyContent : "flex-end",
    paddingBottom : height * 0.4  // remove this
  }
});
