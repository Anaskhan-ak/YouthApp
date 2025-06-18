import { StyleSheet } from 'react-native';
import { Pixels, width } from '../../../../constant';
import { fonts } from '../../../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent:"space-between",
    width: '90%',
    alignSelf: 'center',
    flexDirection:"row",
    marginTop:10
  },
  count: {
     fontSize: Pixels(12),
    fontFamily: fonts?.montserratBold,
  },
  title: {
    fontSize: Pixels(10),
    fontFamily: fonts?.montserratRegular,
  },
  statsView:{
    flexDirection:"row",
    alignItems:'baseline',
    paddingHorizontal : width * 0.03,
  }
});
