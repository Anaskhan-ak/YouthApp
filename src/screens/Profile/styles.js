import { StyleSheet } from 'react-native';
import { height, width } from '../../constant';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // padding: 16,
    position: 'absolute',
    top: height * 0.04,
    zIndex: 999,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    width : width * 0.9,
    alignSelf : 'center'
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
    backgroundColor: colors?.gray,
  },
  coverImage: {
    width: width,
    flex: 1,
    resizeMode: 'cover',
  },
  profileContentContainer: {
    flex: 0.8,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    marginTop: -20,
    zIndex: 999,
    backgroundColor: colors.white,
    paddingBottom: 20,
  },
  icons: {
    marginVertical: height * 0.008,
  },
  indicator:{flex: 1, alignItems: 'center', justifyContent: 'center'},
  headerIcons : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
  },
  headerIcon : {
    padding : width * 0.02,
    margin : width * 0.01,
  }
});
