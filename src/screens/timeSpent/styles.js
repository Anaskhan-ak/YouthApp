import {
  StyleSheet
} from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  heading: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 17,
  },
  subheading: {
    color: colors.text,
    marginLeft: 5,
    fontWeight: '300',
  },
  graphStyle: {
    marginTop: 30,
    borderRadius: 16,
  },
  button: {
    backgroundColor: colors.gray11,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  buttonText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  gradientText: {
    // color: colors.RGB1,
    marginHorizontal: 10,
  },
  activeButton: {
    backgroundColor: colors.gray11,
    padding: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 1,
  },
  tab: {
    backgroundColor: colors.gray11,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 1,
  },
  tabText: {
    color: colors.gray12,
    fontWeight: 'bold',
    fontSize: 12,
  },
});