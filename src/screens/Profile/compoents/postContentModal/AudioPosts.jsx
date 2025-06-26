import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import ChatPlayer from '../../../../components/audio/ChatPlayer';
import { width } from '../../../../constant';

const AudioPosts = ({posts}) => {
  const navigation = useNavigation();
  const [currentAudioId, setCurrentAudioId] = useState('')
  // console.log("Yudios", posts)
  return (
    <View style={styles?.container}>
      <FlatList
        data={posts}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation?.navigate('PostDetails', {post: item})}
              style={styles?.player}>
              <ChatPlayer
                user={item?.user}
                audio={{
                  url: item?.yudios?.url,
                  waveform: item?.yudios?.waveform,
                  id : index
                }}
                customWidth={width * 0.97}
                iconType={'profile'}
                currentAudioId={currentAudioId}
                setCurrentAudioId={setCurrentAudioId}
              />
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles?.listContent}
      />
    </View>
  );
};

export default AudioPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  player: {
    margin: width * 0.01,
  },
  listContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
