import { Image, Text, View } from 'react-native';
import { BlackLike, BlackShare } from '../../../assets/images/svgs';
import { styles } from '../styles';
import LandingWidgetAudioPlayer from './AudioPlayer';

const Podcast = () => {
    return (
      <View style={styles?.timewidget}>
        <Image
          style={styles?.podcastThumbnail}
          source={require('../../../assets/images/onboarding/Onboarding1.png')}
          resizeMethod="contain"
        />
        <View style={styles?.podcastMediaContainer}>
          <Text style={styles?.podcastHeading}>It shall so soon</Text>
          <Text style={styles?.podcastSubheading}>Yudio: Youth.Podcast</Text>
          <LandingWidgetAudioPlayer
            audioURL={
              'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
            }
            pink={true}
          />
          <View style={styles?.reactionButtons}>
            <BlackLike width={16} height={16} />
            <BlackShare width={16} height={16} />
          </View>
        </View>
      </View>
    );
  };

  export default Podcast