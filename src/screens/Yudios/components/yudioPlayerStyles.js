import { StyleSheet } from 'react-native';
import { height, width } from '../../../constant';

export const styles = StyleSheet.create({
  container: {
    width: width,
    alignItems: 'center',
    padding: width * 0.04,
    borderRadius: width * 0.02,
  },
  playPauseButton: {
    marginTop: height * 0.01,
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddingLeft: {
    paddingLeft: 4,
  },
  noPaddingLeft: {
    paddingLeft: 0,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width : width * 0.6
  },
  timeText: {
    fontSize: 12,
    color: '#000',
  },
  waveformContainer: {
    width: '100%',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
});
