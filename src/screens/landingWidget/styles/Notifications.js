import { StyleSheet } from 'react-native';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

export const styles = StyleSheet?.create({
    container: {
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: height * 0.003,
      marginBottom: height * 0.007,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: width * 0.87,
    },
    buttonContainer: {
      flexDirection: 'row',
      columnGap: height * 0.007,
      alignItems: 'center',
    },
    dropdownButton: {
      backgroundColor: 'rgba(250, 250, 250, 0.34)',
      padding: width * 0.0085,
      paddingHorizontal: width * 0.02,
      borderRadius: width * 0.1,
      columnGap: width * 0.01,
      flexDirection: 'row',
      alignItems: 'center',
    },
    dropdownText: {
      fontSize: width * 0.023,
      fontFamily: fonts?.montserratRegular,
      color: colors.black,
    },
    welcomeTextz: {
      color: 'rgba(250, 250, 250, 0.75)',
      fontSize: width * 0.039,
      fontFamily: fonts?.montserratExtraBold,
    },
    crossButton: {
      backgroundColor: 'rgba(250, 250, 250, 0.34)',
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.04,
      height: width * 0.04,
      borderRadius: width * 0.04/2,
    },
    crossButtonText: {
      fontFamily: fonts?.montserratRegular,
      fontSize: width * 0.025,
      textAlign: 'center',
      color: colors.text,
    },
    notificationContainer: {
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notificationButton: {width: width * 0.9},
  });
  