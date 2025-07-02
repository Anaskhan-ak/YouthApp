import { pick } from '@react-native-documents/picker';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import RNFS from 'react-native-fs';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import {
  Cross,
  GradientBlueMic,
  GradientRedMic,
  GradientRedTick,
  Sparkles,
  UploadThumbnail,
} from '../../assets/images/svgs';
import YudioPlayer from '../../components/audio/YudioPlayer';
import CreateButton from '../../components/buttons/CreateButton';
import Drawer from '../../components/drawer';
import GradientHeader from '../../components/headers/gradientHeader';
import UserInfoHeader from '../../components/headers/userInfoHeader';
import Audience from '../../components/sheets/audience';
import Location from '../../components/sheets/location';
import TagFriends from '../../components/sheets/tagFriends';
import { toast } from '../../components/toast';
import useUser from '../../hooks/user';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import AudioBars from './components/audioBars';
import RecordedAudioPlayer from './components/recordedAudioPlayer';
import { styles } from './styles';

const CreateYudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [waveform, setWaveform] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [yudio, setYudio] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const recordingTimer = useRef(null);
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
  const user = useUser();

  const handleForm = async () => {
    if (!user?.id) {
      toast('error', 'User not found. Please log in again.');
      return;
    }
 
    const formData = new FormData();
    formData.append('type', 'YUDIO');
    formData.append('caption', description);
    formData.append('title', title);
    formData.append('location', 'Pakistan');
    formData.append('audience', metaData?.audience?.value);
    formData.append('isPublic', 'true');
    formData.append('userId', user?.id);
    if (
      metaData?.tagFriends?.value &&
      metaData?.tagFriends?.value?.filter(
        item => item !== undefined && item !== '',
      ).length > 0
    ) {
      formData.append(
        'Tag',
        JSON.stringify(
          metaData?.tagFriends?.value?.filter(
            item => item !== undefined && item !== '',
          ),
        ),
      );
    }
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
    try {
      setLoading(true);
      const result = await apiCall?.createNewPost(formData);
        navigation.navigate('Yudios', {yudio: result?.yudios});
    } catch (error) {
      console.log('Error creating yudio', error);
      toast('error', 'Error creating yudio');
    } finally {
      setLoading(false);
    }
  };

  const uploadThumbnail = async () => {
    try {
      const [pickResult] = await pick();
      setThumbnail(pickResult);
      // console.log('Picked Result', pickResult?.uri);
    } catch (err) {
      // see error handling
      console.log('Error picking document', err);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      try {
        if (recordingTimer.current !== null) {
          clearTimeout(recordingTimer.current); // Clear the timer when recording is stopped
        }
        setIsRecording(false);
        const audioFile = await AudioRecord?.stop();
        setYudio(audioFile);
        console.log('Recorded file:', audioFile);
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    } else {
      // Start recording
      try {
        setIsRecording(true);
        AudioRecord.init({
          sampleRate: 16000,
          channels: 1,
          bitsPerSample: 16,
          audioSource: 6,
          wavFile: `recording-${Date.now()}.wav`,
        });
        AudioRecord.start();
        // Set a timer to stop recording after 10 minutes
        recordingTimer.current = setTimeout(() => {
          console.log('Recording time limit reached, stopping recording...');
          toggleRecording(); // Stop recording automatically after 10 minutes
        }, 10 * 60 * 1000); // 10 minutes in milliseconds
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    }
  };

  useEffect(() => {
    async function askPermissionForAudioRecording() {
      if (Platform.OS === 'android') {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ];
        const granted = await PermissionsAndroid.requestMultiple(permissions);
        const allGranted = Object.values(granted).every(
          permission => permission === PermissionsAndroid.RESULTS.GRANTED,
        );
      }
    }
    askPermissionForAudioRecording();
  }, []);

  const getRealPathFromURI = async uri => {
    if (uri?.startsWith('content://')) {
      try {
        if (Platform.OS === 'ios') {
          const realPath = await RNFS.copyAssetsFileIOS(
            uri,
            RNFS.CachesDirectoryPath,
            0,
            0,
          ); // Only for iOS
          return realPath;
        } else {
          return uri;
        }
      } catch (err) {
        console.error('Error resolving content URI:', err);
        return null;
      }
    }
    return uri; // Return the uri as-is for file URLs
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS doesn't require this permission
  };

  useEffect(() => {
    const checkPermission = async () => {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        console.log('Permission denied');
      } else {
        console.log('Permission granted');
        // You can call fetchAudioMetadata here if needed
      }
    };

    checkPermission();
  }, []);

  const fetchAudioMetadata = async () => {
    try {
      const fileUri = await getRealPathFromURI(yudio); // Resolve content URI to actual file path
      if (!fileUri) {
        console.error('Invalid file URI');
        return;
      }
      const formData = new FormData();
      formData.append('audio', {
        uri: `file://${fileUri}`, // Use the resolved file URI
        type: 'audio/mpeg',
        name: 'audio-file.wav',
      });

      const audioMetaDataPayload = await apiCall?.generateWaveforms(formData);
      console.log('audioMetaDataPayload', audioMetaDataPayload);
      setWaveform(audioMetaDataPayload);
    } catch (error) {
      console.error('Error fetching audio metadata:', error);
    }
  };

  return (
    <SafeAreaView style={styles?.container}>
      <GradientHeader
        title="New Yudio"
        backPress={() => navigation?.goBack()}
        advancedButtonPress={() => setDrawer(!drawer)}
      />
      <ScrollView style={styles?.content}>
        <View style={styles?.userInfoHeader}>
          <UserInfoHeader
            userName={user?.name}
            image={user?.photo}
            data={metaData}
            setData={setMetaData}
          />
        </View>
        <TextInput
          style={styles?.inputTitle}
          placeholder="Your Yudio title"
          placeholderTextColor={colors?.gray}
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles?.inputThumbContainer}>
          <View style={styles?.inputDescContainer}>
            <TextInput
              style={styles?.inputDesc}
              placeholder="Say something about this..."
              placeholderTextColor={colors?.gray}
              editable
              multiline
              numberOfLines={5}
              scrollEnabled={true}
              value={description}
              onChangeText={setDescription}
            />
            <View style={styles?.inputDescFooter}>
              <TouchableOpacity style={styles?.Ai}>
                <Sparkles width={10} height={10} />
                <Text style={styles?.AiText}>Rewrite with AI</Text>
              </TouchableOpacity>
              <Text style={styles?.character}>350/350</Text>
            </View>
          </View>
          {thumbnail ? (
            <TouchableOpacity
              // style={styles?.thumbnailButton}
              onPress={uploadThumbnail}>
              <Image
                source={{uri: thumbnail?.uri}}
                style={styles?.thumbnailImage}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles?.thumbnailButton}
              onPress={uploadThumbnail}>
              <UploadThumbnail />
              <Text style={styles?.uploadThumbnailText}>
                {`Upload your\n thumbnail`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {waveform?.length > 0 ? (
          <View style={styles?.yudioPlayerContainer}>
            <YudioPlayer
              audio={{
                uri: yudio,
                waveform: waveform,
              }}
            />
          </View>
        ) : yudio ? (
          <View style={styles?.recordedPlayerContainer}>
            <TouchableOpacity
              style={styles?.crossButton}
              onPress={() => setYudio('')}>
              <Cross />
            </TouchableOpacity>
            <Image
              style={styles?.yudioImage}
              source={
                user?.photo ? {uri: user?.photo} : images?.defaultProfilePicture
              }
            />
            <Text style={styles?.recordedPlayerHeading}>{title}</Text>
            <Text style={styles?.recordedPlayerName}>Sannya Wasim</Text>
            <View style={styles?.recordedPlayer}>
              <RecordedAudioPlayer audioURL={yudio} />
              <TouchableOpacity
                onPress={fetchAudioMetadata}
                style={styles?.redTickButton}>
                <GradientRedTick />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles?.yudioContainer}>
            {isRecording ? (
              <AudioBars isRecording={true} />
            ) : (
              <View style={styles?.dottedBorder}>
                <LinearGradient
                  colors={[colors?.RGB1, colors?.RGB2]}
                  style={styles?.yudioGradientImageBorder}>
                  <Image
                    style={styles?.yudioImage}
                    source={
                      user?.photo
                        ? {uri: user?.photo}
                        : images?.defaultProfilePicture
                    }
                  />
                </LinearGradient>
              </View>
            )}

            <TouchableOpacity style={styles?.mic} onPress={toggleRecording}>
              {isRecording ? <GradientRedMic /> : <GradientBlueMic />}
            </TouchableOpacity>
          </View>
        )}
        {drawer && <Drawer />}
      </ScrollView>
      <CreateButton
        title="Create New Yudio"
        loader={
          loading ? (
            <ActivityIndicator size={'small'} color={colors?.RGB1} />
          ) : null
        }
        onPress={handleForm}
        disabled={waveform?.length > 0 && yudio ? false : true}
      />
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

export default CreateYudio;
