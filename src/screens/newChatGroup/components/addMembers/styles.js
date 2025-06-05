import { StyleSheet } from 'react-native';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';

export const styles = StyleSheet?.create({
  container: {
    flex: 1,
    backgroundColor: colors?.white,
  },
  search: {
    marginHorizontal: width * 0.06,
  },
  listContainer: {
    maxHeight: height * 0.35,
  },
  list: {
    padding: width * 0.03,
  },
  header: {
    fontFamily: fonts?.montserratMedium,
    color: colors?.textGray,
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: height * 0.005,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: width * 0.1,
    height: width * 0.1,
  },
  name: {
    fontFamily: fonts?.plusJakartaSansSemiBold,
    color: colors?.text,
    fontSize: width * 0.035,
    marginLeft: width * 0.01,
  },
  button: {
    borderRadius: width * 0.02,
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.04,
  },
  text: {
    fontFamily: fonts?.montserratSemiBold,
    fontSize: width * 0.03,
  },
});
