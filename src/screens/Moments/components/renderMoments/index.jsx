import { useWindowDimensions, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import { styles } from './styles';

const RenderMoments = ({moment, moments, visible, isVisible, isNext}) => {
  // console.log('moment', moment);
  const {height} = useWindowDimensions();

  // const videoStyle = useMemo(() => styles.video(height), [height]);
  return (
    <View style={styles?.container}>
      <Video
        source={{uri: moment?.Momments?.url}}
        autoPlay
        repeat
        resizeMode="cover"
        muted={!isVisible}
        playInBackground={false}
        paused={!isVisible}
        ignoreSilentSwitch="ignore"
        // style={videoStyle}
        style={styles?.video}
        
      />
      <LinearGradient
        colors={[
          '#000000F0',
          '#000000D0',
          '#000000A0',
          '#00000070',
          '#00000040',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.5}}
        style={styles.controlsContainer}
      />
    </View>
  );
};


export default RenderMoments;
