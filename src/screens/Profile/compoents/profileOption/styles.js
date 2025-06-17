import { StyleSheet } from "react-native";
import { width } from "../../../../constant";
import { colors } from "../../../../utils/colors";
import { fonts } from "../../../../utils/fonts";

export const styles = StyleSheet.create({
  container : {
  },
  content: {
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  optionButton: {
    height: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.2,
    borderColor: colors?.lightGrey,
    borderRadius: width * 0.025,
    paddingHorizontal: 10,
  },
  iconButton: {
    width: width * 0.1,
  },
  editProfileText: {
    fontFamily: fonts?.montserratBold,
  },
  suggestions : {
    // transform : [{scale : 0.6}],
    // backgroundColor : 'red',
  }
});