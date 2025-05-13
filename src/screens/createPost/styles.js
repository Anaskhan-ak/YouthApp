import { StyleSheet } from 'react-native';
import { width } from '../../constant';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.white,
  },
  userInfoHeader : {
    marginVertical  :width * 0.03
  },
  content: {
    padding: width * 0.03,
    // marginBottom: height * 0.1,
  },
  mediaImageContainer : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : "red"
  },
  mediaImage : {
    width : width * 0.2,
    height : width * 0.2,
    borderRadius : width * 0.01,
    margin : width * 0.01
  },
  cancelImage : {
    backgroundColor : colors?.white,
    justifyContent : "center",
    alignItems : 'center',
    position : 'absolute',
    top : width * 0.02,
    right : width * 0.02,
    padding : width * 0.008,
    borderRadius : width * 0.03,
    zIndex : 10
  }
});
