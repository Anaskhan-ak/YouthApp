import { useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import CreateButton from '../../components/buttons/CreateButton';
import GradientHeader from '../../components/headers/gradientHeader';
import { height, width } from '../../constant';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import Gallery from './components/gallery';

const CreateStory = () => {
  const [media, setMedia] = useState({});
  const [preview, setPreview] = useState(false);
  const playerRef = useRef();

  const handleForm = async () => {
    const formData = new FormData();
    formData?.append('type', 'STORY');
    formData.append('caption', 'caption');
    formData.append('isPublic', true);
    formData.append('location', 'Pakistan');
    formData.append('media', {
      uri: media?.uri,
      type: media?.type,
      name: media?.name,
    });
    console.log("formData", formData)
    try {
      const response = await apiCall?.createNewPost(formData)
      console.log("Successfully created story", response)
    } catch (error) {
      console.log("Error creating story", error)
    }
  };
  return (
    <View style={styles?.container}>
      {preview ? (
        <>
          <GradientHeader backPress={() => setPreview(false)} />
          {media?.type?.startsWith('image/') ? (
            <Image source={{uri: media?.uri}} style={styles?.media} />
          ) : (
            <VideoPlayer
              style={styles?.media}
              ref={playerRef}
              endWithThumbnail
              thumbnail={{
                uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
              }}
              source={{
                uri: media?.uri
                  ? media?.uri
                  : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              }}
              onError={e => console.log(e)}
            />
          )}
        </>
      ) : (
        <Gallery media={media} setMedia={setMedia} />
      )}
      {preview ? (
        <CreateButton title="Add to Story" onPress={handleForm}/>
      ) : (
        <CreateButton
          title="Create New Story"
          onPress={() => setPreview(true)}
        />
      )}
    </View>
  );
};

export default CreateStory;

const styles = StyleSheet.create({
  container: {flex: 1},
  media: {
    width: width * 0.95,
    height: height * 0.78,
    alignSelf: 'center',
    marginTop: height * 0.02,
    borderRadius: width * 0.02,
    resizeMode: 'contain',
    backgroundColor : colors?.black
  },
});
