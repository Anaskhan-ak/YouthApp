import { Dimensions, Platform, StyleSheet } from 'react-native';
import { colors } from '../../../utils/colors/index';
import { fonts } from '../../../utils/fonts';
const {height, width} = Dimensions.get('window');
export const styles = StyleSheet.create({
    text: {
      alignSelf: 'center',
      // fontWeight:"bold",
      fontFamily: fonts?.montserratBold,
      fontSize: width * 0.038,
    },
    skipButton: {
      height: height * 0.045,
      backgroundColor: 'white',
      width: width * 0.2,
      justifyContent: 'center',
      alignSelf: 'flex-end',
      marginRight: width * 0.05,
      marginTop: height * 0.06,
      borderRadius: 5,
    },
    bottomContainer: {
      backgroundColor: colors?.white,
      borderTopEndRadius: width*0.1,
      borderTopStartRadius: width*0.1,
    },
    Heading: {
      alignSelf: 'center',
      fontFamily: fonts?.montserratExtraBold,
      fontSize: width * 0.058,
      marginTop: height * 0.04,
      width: width * 0.85,
      textAlign: 'center',
      letterSpacing: -1,
    },
    dots: {
      resizeMode: 'contain',
      marginHorizontal: width * 0.004,
    },
    slider: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginVertical: height * 0.02,
    },
    description:{
      fontFamily: fonts?.montserratRegular,
      width: width * 0.8,
      alignSelf: 'center',
      fontSize: width * 0.038,
      textAlign: 'center',
      marginTop:10,
      lineHeight:height*0.025
    },
    container:{flex: 1, backgroundColor: colors.white,marginTop:Platform.OS === 'ios'?-height*0.07:-height*0.04}
  });