import {StyleSheet, Platform} from 'react-native';
import {height, width} from '../../constant';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
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
  cardContainer: {
    height: height * 0.08,
    borderRadius: 16,
    marginVertical: 6,
    padding: 1.5,
  },
  cardInner: {
    flex: Platform?.OS === 'android' && 1,
    height: height * 0.073,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors?.white,
    borderRadius: 14,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 1.5,
    marginHorizontal: Platform?.OS === 'ios' && 1,
    right: Platform?.OS === 'ios' && 1.4,
  },
  iconContainer: {
    width: width * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: fonts?.montserratExtraBold,
    fontSize: width * 0.04,
    color: '#000',
  },
  desc: {
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.028,
    color: '#666',
    marginTop: 2,
  },
  indicatorContainer: {
    width: 24,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  unselectedIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: '#5392E9',
  },
  btnContainer: {
    paddingBottom: 120,
    marginVertical: 5,
    zIndex:999
  },
});
