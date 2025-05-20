import { StyleSheet } from 'react-native';
import { height, width } from '../../constant';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    padding: width * 0.04,
  },
  editThumbnail: {
    backgroundColor: colors?.extraLightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    margin: width * 0.01,
    borderRadius: width * 0.03,
    overflow: 'hidden',
  },
  editThumbnailPlaceholder: {
    width: width * 0.1,
    height: height * 0.05,
    borderRadius: width * 0.01,
  },
  editThumbnailImage: {
    width: width * 0.9,
    height: height * 0.2,
    borderRadius: width * 0.03,
    resizeMode: 'cover',
  },
  pen: {
    position: 'absolute',
    zIndex: 10,
    right: width * 0.01,
    top: width * 0.01,
  },
  errorText: {color: 'red', 
    fontSize: width * 0.03,
    marginLeft : width * 0.01
  },
});
