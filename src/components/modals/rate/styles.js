import { height, width } from "../../../constant";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/fonts";

const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
    container: {
      height: height * 0.45,
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      backgroundColor: colors?.white,
      height: height * 0.26,
      width: width * 0.9,
      padding : width * 0.04,
      borderRadius : width * 0.05,
      justifyContent : 'flex-end'
    },
    image : {
        alignSelf : 'center',
        marginBottom : -height * 0.02
    },
    header  :{
        flexDirection : 'row',
        alignItems : "center",
        justifyContent : 'center'
    },
    headerText : {
        fontFamily : fonts?.montserratSemiBold,
        fontSize : width * 0.06
    },
    headerGradientText : {
        fontFamily : fonts?.montserratExtraBold,
        fontSize : width * 0.07
    },
    text : {
        fontFamily : fonts?.montserratSemiBold,
        fontSize : width * 0.035,
        textAlign : 'center',
        marginVertical : height * 0.006
    },
    buttonTab : {
        borderBottomLeftRadius : width * 0.05,
        borderBottomRightRadius : width * 0.05,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        borderTopColor : colors?.gray,
        alignSelf : 'center',
        width : width * 0.9,
        marginBottom : -width * 0.04,
        marginTop : width * 0.03,
        borderTopWidth : width * 0.001,
        borderTopColor : colors?.textGray
    },
    button : {
        paddingHorizontal : width * 0.13,
        paddingVertical : height * 0.02,
        borderLeftWidth : width * 0.001
    },
    buttonText : {
        color : colors?.primary,
        fontFamily : fonts?.montserratSemiBold,
        fontSize : width * 0.04
    }
  });
  