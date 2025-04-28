import { StyleSheet } from 'react-native';
import { width } from '../../../constant';
import { colors } from '../../../utils/colors';

export const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      // padding: ms(5),
      width: width * 0.45,
    },
    headerText: {
      fontSize: width * 0.06,
      // marginBottom: 2,
      color: 'red',
      marginLeft: -width * 0.24,
      // fontWeight: '800',
      marginBottom : 5,
    },
    daysContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dayName: {
      width: 30,
      textAlign: 'center',
      marginBottom: 2,
      fontSize: 10,
    },
    emptyDay: {
      width: 10,
      height: 10,
      marginBottom: 2,
    },
    day: {
      width: 20,
      height: 20,
      textAlign: 'center',
      marginBottom: 3,
      borderRadius: 15,
      overflow: 'hidden',
      // backgroundColor: '#f0f0f0',
      // paddingVertical: 2,
      fontSize: 12,
      // fontWeight: '600',
      color: colors.black,
      alignItems : 'center',
      justifyContent : 'center',
    },
    today: {
      backgroundColor: 'red',
      color: 'white',
      alignItems : 'center',
      justifyContent : 'center',
    },
  });