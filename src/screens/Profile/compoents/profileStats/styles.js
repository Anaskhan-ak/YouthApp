import {StyleSheet} from 'react-native';
import {colors} from '../../../../utils/colors';
import {height, width} from '../../../../constant';
import {fonts} from '../../../../utils/fonts';

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
     fontSize: width * 0.026,
    fontFamily: fonts?.montserratExtraBold,
  },
  title: {
    fontSize: width * 0.026,
    fontFamily: fonts?.montserratMedium,
  },
  statsView:{
    flexDirection:"row",
    alignItems:'center'
  }
});
