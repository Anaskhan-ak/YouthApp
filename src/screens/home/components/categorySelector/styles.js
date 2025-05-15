import {StyleSheet, Platform} from 'react-native';
import {height, width} from '../../../../constant';
import {fonts} from '../../../../utils/fonts';

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      height: Platform?.OS === 'ios' && height * 0.15,
    },
    buttonWrapper: {
      width: '32%',
      marginTop: Platform?.OS === 'ios' && height * 0.035,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      height: height * 0.036,
      borderRadius: 10,
      flexDirection: 'row',
    },
    text: {
      fontSize: width * 0.028,
      fontFamily: fonts.montserratBold,
    },
  });