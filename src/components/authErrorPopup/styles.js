import { Platform, StyleSheet } from "react-native";
import { fonts } from "../../utils/fonts";
import { height, width } from "../../constant";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
   iconView:{
   width:width*0.1,
   height:height*0.045,
   borderRadius:6,
   alignItems:"center",
   justifyContent:"center",
   },
   errorContainer:{
    width: '92%',
    marginTop: height * 0.35,
    backgroundColor: colors?.white,
    alignSelf: 'center',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors?.red,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading:{
    fontSize: width * 0.034,
    fontFamily: fonts?.montserratBold,
  },
  title:{
    fontSize: width * 0.03,
    fontFamily: fonts?.montserratRegular,
  },
  contentContainer:{flex:1,left:10}
  });