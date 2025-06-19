import { StyleSheet } from 'react-native';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';

export const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors?.red,
  },
gradientBorder : {
  wdith : width * 0.5,
  height : height * 0.3,
  borderRadius : width * 0.03
}
});
