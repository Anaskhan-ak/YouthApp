import {StyleSheet, Platform} from 'react-native';
import {height, width} from '../../../constant';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

export const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
    // paddingBottom: height * 0.2,
    height: height * 0.8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors?.white,
  },
  heading: {
    alignSelf: 'center',
    fontFamily: fonts?.montserratExtraBold,
    fontSize: width * 0.058,
    textAlign: 'center',
    letterSpacing: -1,
    marginVertical: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: width * 0.02,
    paddingHorizontal: width * 0.03,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.1,
  },
  itemName: {
    marginLeft: width * 0.01,
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.038,
  },
  itemButton: {
    paddingVertical: Platform?.OS === 'android' && width * 0.01,
    paddingHorizontal: Platform?.OS === 'android' && width * 0.02,
    borderRadius: width * 0.01,
    width: Platform?.OS === 'ios' && width * 0.2,
    height: Platform?.OS === 'ios' && height * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    color: colors?.white,
    fontFamily: fonts?.montserratSemiBold,
  },
  search: {
    marginHorizontal: width * 0.04,
  },
  checkboxContainer: {
    // marginBottom : height * 0.1
  },
});
