import { StyleSheet } from 'react-native';
import { height } from '../../constant';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.white,
  },
  emptyComp : {
      height: height,
      alignItems: 'center',
      justifyContent: 'center',
    }
});
