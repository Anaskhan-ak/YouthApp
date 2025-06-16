import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import {
  StoryIconFilters,
  StoryIconFriends,
  StoryIconMusic,
  StoryIconSticker,
  StoryIconText,
} from '../../assets/images/svgs';
import CreateButton from '../../components/buttons/CreateButton';
import GradientHeader from '../../components/headers/gradientHeader';
import { toast } from '../../components/toast';
import { height, width } from '../../constant';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import Gallery from './components/gallery';

const CreateStory = () => {
  const [media, setMedia] = useState({});
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const playerRef = useRef();
  const navigation = useNavigation();
  const storyIcons = [
    {type: 'music', icon: <StoryIconMusic/>},
    {type: 'filter', icon: <StoryIconFilters/>},
    {type: 'text', icon: <StoryIconText/>},
    {type: 'sticker', icon: <StoryIconSticker/>},
    {type: 'friends', icon: <StoryIconFriends/>},
  ];

  const handleForm = async () => {
    const isImage = media?.type === 'jpg' || media?.type === 'png' || media?.type === 'jpeg'
    setLoading(true);
    const formData = new FormData();
    formData?.append('type', 'STORY');
    formData.append('caption', 'caption');
    formData.append('isPublic', true);
    formData.append('location', 'Pakistan');
    formData.append('mediaType', isImage ? 'image' : 'video');
    formData.append('media', {
      uri: media?.uri,
      type: media?.type,
      name: media?.name,
    });
    // console.log("formData", formData)
    try {
      const response = await apiCall?.createNewPost(formData);
      console.log('Successfully created story', response);
      toast('success', 'Successfully created story');
      setLoading(false);
      navigation?.navigate('Home');
    } catch (error) {
      console.log('Error creating story', error);
      toast('error', 'Error creating story');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const StoryIcons = () => {
    return (
        <FlatList
          data={storyIcons}
          renderItem={({item}) => (
            <TouchableOpacity style={styles?.icon}>
              {item?.icon}
            </TouchableOpacity>
          )}
          horizontal
          style={styles.iconList}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: 'flex-end', flexGrow: 1 }}
        />
    );
  };

  return (
    <View style={styles?.container}>
      {preview ? (
        <>
          <GradientHeader
            backPress={() => setPreview(false)}
            storyIcons={<StoryIcons />}
          />
          {media?.type?.startsWith('image/') ? (
            <Image source={{uri: media?.uri}} style={styles?.media} />
          ) : (
            <VideoPlayer
            autoplay={true}
              style={styles?.media}
              ref={playerRef}
              endWithThumbnail
              source={{
                uri: media?.uri
                  ? media?.uri
                  : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              }}
              onError={e => console.log(e)}
              resizeMode='cover'
            />
          )}
        </>
      ) : (
        <Gallery media={media} setMedia={setMedia} />
      )}
      {preview ? (
        <CreateButton
          title="Add to Story"
          onPress={handleForm}
          loader={
            loading && (
              <ActivityIndicator
                size={'small'}
                color={colors?.RGB1}
                animating
              />
            )
          }
          secondButton={{
            title : 'Add to Highlights'
          }}
        />
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
    backgroundColor: colors?.black,
  },
  icon: {
    backgroundColor: colors?.white,
    width: width * 0.09,
    height: width * 0.09,
    borderRadius: width * 0.09,
    alignItems : 'center',
    justifyContent : 'center',
    marginHorizontal : width * 0.01
  },
  iconList: {
    // flex : 1,
    alignSelf : "flex-end",
    // alignItems : 'flex-end'
  },
});
