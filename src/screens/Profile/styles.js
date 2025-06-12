import {StyleSheet} from 'react-native';
import {height, width} from '../../constant';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    position: 'absolute',
    top: height * 0.04,
    zIndex: 999,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImageContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverImage: {
    width: width,
    flex: 1,
    resizeMode: 'cover',
  },
  profileContentContainer: {
    flex: 0.7,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    marginTop: -20,
    zIndex: 999,
    backgroundColor: colors.white,
    paddingBottom: 20,
  },
});
