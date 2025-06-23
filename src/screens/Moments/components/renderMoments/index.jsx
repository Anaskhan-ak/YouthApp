import { BlurView } from '@react-native-community/blur';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Video from 'react-native-video';
import FeedReactions from '../../../../components/reactions/feedReactions';
import { styles } from './styles';

const RenderMoments = ({moment, moments, visible, isVisible, isNext}) => {
  console.log('moment', moment);
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
      <View style={styles?.reactions}>
        <FeedReactions post={moment} />
      </View>
      <View style={styles?.blurContainer}>
        <ScrollView
          style={styles?.scrollContainer}
          contentContainerStyle={{paddingBottom: 10}} // optional padding
          scrollEnabled={false} // disable scroll so it expands fully
        >
          <Text style={styles?.blurText}>
            {moment?.Momments?.caption?.length > 100 && !showFullText
              ? `${moment?.Momments?.caption?.substring(0, 100)}... `
              : moment?.Momments?.caption + ' '}
            {moment?.Momments?.caption?.length > 100 && (
              <Text
                onPress={() => setShowFullText(prev => !prev)}
                style={styles?.seeAllText}>
                {showFullText ? 'See less' : 'Show more'}
              </Text>
            )}
          </Text>
        </ScrollView>

        <View style={styles?.tagsContainer}>
          {['#fashion', '#holiday', '#beach'].map(item => (
            <TouchableOpacity key={item}>
              <Text style={styles?.tagText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <BlurView
          style={[StyleSheet.absoluteFill, styles.blur]}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
      </View>
    </View>
  );
};

export default RenderMoments;
