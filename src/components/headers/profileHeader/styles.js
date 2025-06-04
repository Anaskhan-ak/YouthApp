import { height, width } from "../../../constant";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.05,
    flexDirection: 'row',
    paddingHorizontal: width * 0.04,
  },
  leftIconWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  logoWrapper: {
    flex: 1.7,
    justifyContent: 'center',
  },
});