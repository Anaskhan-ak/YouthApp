import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, View } from 'react-native';
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
import PostModal from '../../components/modals/postModal';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import Gallery from './components/gallery';
import { styles } from './styles';

const CreatePost = () => {
  const [drawer, setDrawer] = useState(false);
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState([]);
  const [chars, setChars] = useState(0);
  const maxChars = 4000;
  const navigation = useNavigation();

  const handleForm = async () => {
    // console.log('Title', title);
    // console.log('Description', description);
    // console.log('Thumbnail', thumbnail?.uri);
    // console.log('Yudio', yudio);
    // console.log('Waveform', waveform);

    const formData = new FormData();
    formData.append('type', 'YUDIO');
    // formDataParam.append('isPublic', true);
    formData.append('caption', description);
    formData.append('title', title);
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
      uri: thumbnail?.uri,
      type: 'image/jpeg',
      name: `${Date.now()}.jpg`,
    });

    // Handle audio
    if (yudio) {
      formData.append('audio', {
        uri: `file://${yudio}`,
        type: 'audio/wav',
        name: `recording-${Date.now()}.wav`,
      });
    } else {
      console.error('Audio source is missing for YUDIO');
    }
    // console.log('Form Data', formData);
    try {
      const result = await apiCall?.createNewPost(formData);
      console.log('Successfully created Yudio', result?.yudios);
      if (result) {
        navigation.navigate('Yudios', {yudio: result?.yudios});
      }
    } catch (error) {
      console.log('Error creating yudio', error);
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
          maxChars={maxChars}
          postType={'post'}
        />
        {media &&
          (media?.some(m => m?.type === 'video/mp4') ||
            media?.some(m => m.type === 'image/jpeg')) && (
            <FlatList
              data={media}
              renderItem={({item}) => (
                <Image source={{uri: item?.uri}} style={styles.mediaImage} />
              )}
              numColumns={4}
              keyExtractor={(item, index) => index.toString()}
              // contentContainerStyle={{alignItems: 'center'}}
            />
          )}
        {drawer && <Drawer />}
      </ScrollView>
      {!drawer && (
        <PostModal
          options={options}
          setOptions={setOptions}
          content={
            options?.find(opt => opt?.type === 'gallery').active && (
              <Gallery media={media} setMedia={setMedia} />
            )
          }
        />
      )}
      <CreateButton title="Create New Post" onPress={handleForm} />
    </SafeAreaView>
  );
};

export default CreatePost;
