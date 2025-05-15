import { pick } from '@react-native-documents/picker';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNBlobUtil from 'react-native-blob-util';
import {
  CameraIcon,
  Cross,
  FileAudio,
  FileIcon,
  FileImport,
  FileMicIcon,
  GalleryIcon,
} from '../../assets/images/svgs';
import YudioPlayer from '../../components/audio/YudioPlayer';
import CreateButton from '../../components/buttons/CreateButton';
import Drawer from '../../components/drawer';
import GradientHeader from '../../components/headers/gradientHeader';
import UserInfoHeader from '../../components/headers/userInfoHeader';
import MultilineInput from '../../components/inputs/multilineInput';
import PostModal from '../../components/modals/postModal';
import { width } from '../../constant';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import AudioComponent from './components/audios';
import CameraComponent from './components/camera';
import FilesComponent from './components/files';
import Gallery from './components/gallery';
import { styles } from './styles';

const CreatePost = () => {
  const [drawer, setDrawer] = useState(false);
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [chars, setChars] = useState(0);
  const maxChars = 4000;
  const navigation = useNavigation();

  const handleForm = async () => {
    // console.log('Description', description);
    // console.log("Media", media)

    const formData = new FormData();
    if (
      media?.some(m => m?.type === 'video/mp4') ||
      media?.some(m => m.type === 'image/jpeg')
    ) {
      formData.append('type', 'MEDIA');
      formData.append('caption', description);
      formData.append('location', 'Pakistan');
      formData.append('audience', 'PUBLIC');
      // if (
      //   tagFriends &&
      //   tagFriends.filter(item => item !== undefined && item !== '').length >
      //     0
      // ) {
      formData.append(
        'Tag',
        // JSON.stringify(
        //   tagFriends.filter(item => item !== undefined && item !== ''),
        // ),
        JSON?.stringify(['cm64oiovt005391r8pjysmd7b']),
      );
      // }

      if (media) {
        media?.forEach(m =>
          formData.append('media', {
            uri: m?.uri,
            type: m?.type,
            name:
              m?.type === 'image/jpeg'
                ? `${Date.now()}.jpeg`
                : `${Date.now()}.mp4`,
          }),
        );
      }
    } else if (media?.some(m => m?.type === 'audio/wav')) {
      formData.append('type', 'YUDIO');
      // formDataParam.append('isPublic', true);
      formData.append('caption', media[0]?.description);
      formData.append('title', media[0]?.title);
      formData.append('location', 'Pakistan');
      formData.append('audience', 'PUBLIC');
      // if (
      //   tagFriends &&
      //   tagFriends.filter(item => item !== undefined && item !== '').length >
      //     0
      // ) {
      formData.append(
        'Tag',
        // JSON.stringify(
        //   tagFriends.filter(item => item !== undefined && item !== ''),
        // ),
        JSON?.stringify(['cm64oiovt005391r8pjysmd7b']),
      );
      // }

      formData.append('thumbnail', {
        uri: media[0]?.thumbnail,
        type: 'image/jpeg',
        name: `${Date.now()}.jpg`,
      });

      // Handle audio
      formData.append('audio', {
        uri: media[0]?.uri,
        type: 'audio/wav',
        name: `recording-${Date.now()}.wav`,
      });
    } else if (media?.some(m => m?.type === 'audio/mpeg')) {
      formData.append('userId', 'cm60ql39f003l91r8l18bd80z');
      formData.append('type', 'MUSIC');
      formData.append('location', 'Paksitan');
      formData.append('audience', 'PUBLIC');
      formData.append('caption', description);
      // if (
      //   tagFriends &&
      //   tagFriends.filter(item => item !== undefined && item !== '').length >
      //     0
      // ) {
      formData.append(
        'Tag',
        // JSON.stringify(
        //   tagFriends.filter(item => item !== undefined && item !== ''),
        // ),
        JSON?.stringify(['cm64oiovt005391r8pjysmd7b']),
      );
      // }

      const thumbnailStat = await RNBlobUtil.fs.stat(thumbnail?.uri);
      formData.append('thumbnail', {
        uri: 'file://' + thumbnailStat.path,
        type: thumbnail?.type,
        name: thumbnail?.name,
      });

      // Convert audio URI
      const audioStat = await RNBlobUtil.fs.stat(media[0]?.uri);
      formData.append('audio', {
        uri: 'file://' + audioStat.path,
        type: media[0]?.type,
        name: media[0]?.name,
      });
    }

    console.log('Form Data', formData);
    try {
      const result = await apiCall?.createNewPost(formData);
      console.log('Successfully created Post', result?.data);
    } catch (error) {
      console.log('Error creating post', error);
    }
  };

  const [options, setOptions] = useState([
    {
      type: 'gallery',
      icon: <GalleryIcon />,
      active: true,
    },
    {
      type: 'audios',
      icon: <FileAudio />,
      active: false,
    },
    {
      type: 'files',
      icon: <FileImport />,
      active: false,
    },
    {
      type: 'camera',
      icon: <CameraIcon />,
      active: false,
    },
  ]);

  const pickFiles = async type => {
    if (type === 'audio') {
      const [res] = await pick({
        type: ['audio/*'],
        allowMultiSelection: false,
      });
      // console.log(res);
      setMedia(prev => [
        ...prev,
        {
          uri: res?.uri,
          type: res?.type,
          name: res?.name,
        },
      ]);
    } else if (type === 'thumbnail') {
      const [res] = await pick({
        type: ['image/*'],
        allowMultiSelection: false,
      });
      // console.log(res);
      setThumbnail({
        uri: res?.uri,
        type: res?.type,
        name: res?.name,
      });
    }
  };

  console.log('Media.uri', media);

  return (
    <SafeAreaView style={styles?.container}>
      <GradientHeader
        title="New Post"
        backPress={() => navigation?.goBack}
        advancedButtonPress={() => setDrawer(!drawer)}
      />
      <ScrollView style={styles?.content}>
        <View style={styles?.userInfoHeader}>
          <UserInfoHeader
            userName={'Sannya Wasim'}
            image={require('../../assets/images/SignupImage.jpeg')}
          />
        </View>
        <MultilineInput
          placeholder="Say something about this..."
          placeholderTextColor={colors?.gray}
          editable={true}
          multiline={true}
          numberOfLines={5}
          scrollEnabled={true}
          value={description}
          onChangeText={setDescription}
          chars={chars}
          setChars={setChars}
          maxChars={maxChars}
          postType={'post'}
        />
        {options?.find(opt => opt?.type === 'audios').active &&
          media?.length === 0 && (
            <View style={styles?.selectFileContainer}>
              <TouchableOpacity
                style={styles?.selectFileButton}
                onPress={() => pickFiles('audio')}>
                <FileIcon />
                <Text style={styles?.selectFileText}>Select from Files</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles?.selectFileButton}
                onPress={() => {
                  navigation.navigate('CreateYudio');
                }}>
                <FileMicIcon width={width * 0.05} height={width * 0.05} />
                <Text style={styles?.selectFileText}>Record new Yudio</Text>
              </TouchableOpacity>
            </View>
          )}
        {media &&
        (media?.some(m => m?.type === 'video/mp4') ||
          media?.some(m => m.type === 'image/jpeg')) ? (
          <FlatList
            data={media}
            renderItem={({item}) => (
              <View style={{position: 'relative'}}>
                <TouchableOpacity
                  style={styles.cancelImage}
                  onPress={() =>
                    setMedia(prev =>
                      prev.filter(media => media.uri !== item.uri),
                    )
                  }>
                  <Cross width={width * 0.02} height={width * 0.02} />
                </TouchableOpacity>
                <Image source={{uri: item?.uri}} style={styles.mediaImage} />
              </View>
            )}
            numColumns={4}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          media?.some(m => m?.type === 'audio/mpeg') && (
            <View style={styles?.audioPlayerContainer}>
              <YudioPlayer
                audio={{
                  uri: media[0]?.uri,
                  type: media[0]?.type,
                  name: media[0]?.name,
                }}
              />
              <TouchableOpacity
                style={styles?.selectFileButton}
                onPress={() => pickFiles('thumbnail')}>
                <FileIcon />
                <Text style={styles?.selectFileText}>Select Thumbnail</Text>
              </TouchableOpacity>
            </View>
          )
        )}
        {drawer && <Drawer />}
      </ScrollView>
      {!drawer && (
        <PostModal
          options={options}
          setOptions={setOptions}
          content={
            options?.find(opt => opt?.type === 'gallery').active ? (
              <Gallery media={media} setMedia={setMedia} />
            ) : options?.find(opt => opt?.type === 'camera').active ? (
              <CameraComponent media={media} setMedia={setMedia} />
            ) : options?.find(opt => opt?.type === 'audios').active ? (
              <AudioComponent media={media} setMedia={setMedia} />
            ) : (
              <FilesComponent media={media} setMedia={setMedia} />
            )
          }
        />
      )}
      <CreateButton title="Create New Post" onPress={handleForm} />
    </SafeAreaView>
  );
};

export default CreatePost;
