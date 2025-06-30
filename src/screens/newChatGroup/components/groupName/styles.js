import { StyleSheet } from 'react-native';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: height * 0.05,
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.25,
    borderWidth: width * 0.01,
    borderColor: colors?.white,
    shadowColor: colors?.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  plusButton: {
    width: width * 0.06,
    height: width * 0.06,
    borderRadius: width * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -height * 0.03,
    marginLeft: width * 0.15,
  },
  input: {
    backgroundColor: colors?.extraLightGrey,
    borderRadius: width * 0.2,
    width: width * 0.8,
    marginVertical: height * 0.08,
    padding: width * 0.03,
    color: colors?.text,
  },
  button: {
    marginVertical: height * 0.14,
  },
});
