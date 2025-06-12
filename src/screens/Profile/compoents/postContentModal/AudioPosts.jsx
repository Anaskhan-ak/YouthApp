import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import ChatPlayer from '../../../../components/audio/ChatPlayer';
import { width } from '../../../../constant';

const AudioPosts = ({posts}) => {
  const navigation = useNavigation();
  console.log("Yudios", posts)
  return (
    <View style={styles?.container}>
      <FlatList
        data={posts}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation?.navigate('PostDetails', {post: item})}
              style={styles?.player}>
              <ChatPlayer
                user={item?.user}
                audio={{
                  url: item?.yudios?.url,
                  waveform: item?.yudios?.waveform,
                }}
                customWidth={width * 0.97}
                iconType={'profile'}
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
