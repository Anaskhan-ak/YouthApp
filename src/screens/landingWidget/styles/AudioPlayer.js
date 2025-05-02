import { StyleSheet } from 'react-native';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 20,
    marginVertical: 5,
    width: width * 0.5,
    height: height * 0.08,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 30,
  },
  slider: {
    flex: 1,
    height: 20,
  },
  timeText: {
    color: 'white',
    fontSize: 8,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playPauseButton: {
    backgroundColor: 'white',
    width: 15,
    height: 15,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2,
  },
  audioProgress: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 2,
  },
  audioVolume: {
    height: 3,
    backgroundColor: colors.white,
    width: 15,
    marginLeft: 5,
  },
});
