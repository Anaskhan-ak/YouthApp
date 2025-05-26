import { pick } from '@react-native-documents/picker';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import RNBlobUtil from 'react-native-blob-util';
import { images } from '../../assets/images';
import {
  CameraIcon,
  FileAudio,
  FileImport,
  GalleryIcon,
} from '../../assets/images/svgs';
import CreateButton from '../../components/buttons/CreateButton';
import Drawer from '../../components/drawer';
import GradientHeader from '../../components/headers/gradientHeader';
import UserInfoHeader from '../../components/headers/userInfoHeader';
import MultilineInput from '../../components/inputs/multilineInput';
import Audience from '../../components/sheets/audience';
import Location from '../../components/sheets/location';
import TagFriends from '../../components/sheets/tagFriends';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import FileSelectorButtons from './components/fileSelectors';
import MediaUploader from './components/mediaUpload';
import PostContentModal from './components/postContentModal';
import { styles } from './styles';

const CreatePost = () => {
  const [drawer, setDrawer] = useState(false);
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [metaData, setMetaData] = useState({
    audience: {
      active: false,
      value: 'PUBLIC',
      ref: useRef(),
    },
    location: {
      active: false,
      value: 'Pakistan',
      ref: useRef(),
    },
    tagFriends: {
      active: false,
      value: [],
      ref: useRef(),
    },
  });
  const [chars, setChars] = useState(0);
  const maxChars = 4000;
  const navigation = useNavigation();
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

  const handleForm = async () => {
    const formData = new FormData();
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
    if (
      media?.some(m => m?.type === 'video/mp4') ||
      media?.some(m => m.type === 'image/jpeg')
    ) {
      formData.append('type', 'MEDIA');
      formData.append('caption', description);
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
      formData.append('caption', description);

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
    } else {
      formData.append('type', 'DOCUMENT');
      formData.append('caption', description);

      if (thumbnail) {
        const thumbnailStat = await RNBlobUtil.fs.stat(thumbnail?.uri);
        formData.append('thumbnail', {
          uri: 'file://' + thumbnailStat.path,
          type: thumbnail?.type,
          name: thumbnail?.name,
        });
      } else {
        formData.append('thumbnail', {
          uri: media[0]?.thumbnail,
          type: 'image/jpeg',
          name: 'thumbnail.jpeg',
        });
      }

      if (media[0]?.uri?.startsWith('content://')) {
        //selecting from mobile
        formData.append('document', {
          uri: media[0].uri,
          type: media[0]?.type,
          name: media[0]?.name,
        });
      } else {
        formData.append('document', {
          uri: media[0].uri,
          type: `application/${media[0]?.type}`,
          name: media[0]?.name,
        });
      }
    }
    try {
      const result = await apiCall?.createNewPost(formData);
      console.log('Successfully created Post', result?.data);
    } catch (error) {
      console.log('Error creating post', error);
    }
  };

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
    } else if (type === 'file') {
      const [res] = await pick({
        type: [
          'application/pdf',
          'application/msword', // .doc
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
          'application/vnd.ms-excel', // .xls
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
          'application/vnd.ms-powerpoint', // .ppt
          'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
          'text/plain', // .txt
          'application/zip', // .zip
        ],
        allowMultiSelection: false,
      });
      // console.log('Res', res);
      setMedia([
        {
          uri: res?.uri,
          type: res?.type,
          name: res?.name,
          mediaType: 'FILE',
        },
      ]);
    }
  };

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
            image={images?.defaultProfilePicture}
            data={metaData}
            setData={setMetaData}
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
        <FileSelectorButtons
          type={options.find(opt => opt.active)?.type}
          onPickFile={pickFiles}
          media={media}
          thumbnail={thumbnail}
          pickFiles={pickFiles}
        />
        <MediaUploader
          media={media}
          thumbnail={thumbnail}
          setMedia={setMedia}
          setThumbnail={setThumbnail}
        />
        {drawer && <Drawer />}
      </ScrollView>
      {!drawer && (
        <PostContentModal
          options={options}
          setOptions={setOptions}
          setMedia={setMedia}
          media={media}
        />
      )}
      <CreateButton title="Create New Post" onPress={handleForm} />
      {metaData?.audience?.active && (
        <Audience
          sheetRef={metaData?.audience?.ref}
          audience={metaData}
          setAudience={setMetaData}
        />
      )}
      {metaData?.location?.active && (
        <Location
          sheetRef={metaData?.location?.ref}
          location={metaData}
          setLocation={setMetaData}
        />
      )}
      {metaData?.tagFriends?.active && (
        <TagFriends
          sheetRef={metaData?.tagFriends?.ref}
          tagFriends={metaData}
          setTagFriends={setMetaData}
        />
      )}
    </SafeAreaView>
  );
};

export default CreatePost;
