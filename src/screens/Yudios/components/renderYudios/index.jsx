import { BlurView } from '@react-native-community/blur';
import { useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FeedReactions from '../../../../components/reactions/feedReactions';
import useUser from '../../../../hooks/user';
import YudioCard from '../yudioCard';
import { styles } from './styles';

const RenderYudios = ({yudios, yudio, currentAudioId, setCurrentAudioId,index}) => {
  const [showFullText, setShowFullText] = useState(false);
  const user = useUser();

  // console.log('Yudio', yudio?.yudios);
  return (
    <View style={styles?.renderItem}>
      {/* Yudio Card */}
      <YudioCard
        yudio={yudio?.yudios}
        currentAudioId={currentAudioId}
        setCurrentAudioId={setCurrentAudioId}
        index={index}
      />
      {/* Reactions */}
      <View style={styles?.reactions}>
        <FeedReactions post={yudio} />
      </View>
      {/* Suggested Yudios */}
      <View style={styles?.suggestedView}>
        <Text style={styles?.suggestedHeading}>
          More by {`${yudio?.user?.firstName} ${yudio?.user?.lastName}`}
        </Text>
        <FlatList
          data={yudios?.filter(item => item?.userId === user?.id)?.slice(0, 3)}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles?.suggestedButton}>
                <Image
                  source={
                    item?.yudios?.thumbnail
                      ? {uri: item?.yudios?.thumbnail}
                      : require('../../../../assets/images/SignupImage.jpeg')
                  }
                  style={styles?.suggestedImage}
                />
              </TouchableOpacity>
            );
          }}
          horizontal
        />
      </View>
      {/* Blur Bottom View */}
      <View style={styles?.blurContainer}>
        <ScrollView
          style={styles?.scrollContainer}
          contentContainerStyle={{paddingBottom: 10}} // optional padding
          scrollEnabled={false} // disable scroll so it expands fully
        >
          <Text style={styles?.blurText}>
            {yudio?.yudios?.caption?.length > 100 && !showFullText
              ? `${yudio?.yudios?.caption?.substring(0, 100)}... `
              : yudio?.yudios?.caption + ' '}
            {yudio?.yudios?.caption?.length > 100 && (
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

export default RenderYudios;
