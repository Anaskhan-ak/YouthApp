import { StyleSheet } from "react-native";
import { height, width } from "../../../constant";
import { colors } from "../../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 20,
    marginVertical: 5,
    width: width * 0.9,
    height: height * 0.08,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
  },
  timeText: {
    color: colors?.text,
    fontSize: width * 0.03,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.75,
    alignSelf: 'flex-end',
    marginRight: width * 0.02,
  },
  playPauseButton: {
    backgroundColor: 'white',
    width: width * 0.04,
    height: width * 0.04,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2,
  },
});