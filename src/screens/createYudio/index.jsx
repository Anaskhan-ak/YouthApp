import { pick } from '@react-native-documents/picker';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import LinearGradient from 'react-native-linear-gradient';
import {
  Cross,
  GradientBlueMic,
  GradientRedMic,
  GradientRedTick,
  RewriteWithAi,
  UploadThumbnail,
} from '../../assets/images/svgs';
import YudioPlayer from '../../components/audio/YudioPlayer';
import CreateButton from '../../components/buttons/CreateButton';
import Drawer from '../../components/drawer';
import GradientHeader from '../../components/headers/gradientHeader';
import UserInfoHeader from '../../components/headers/userInfoHeader';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import AudioBars from './audioBars';
import RecordedAudioPlayer from './recordedAudioPlayer';
import { styles } from './styles';

const CreateYudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [waveform, setWaveform] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [yudio, setYudio] = useState();

  const navigation = useNavigation();
  const recordingTimer = useRef(null);

  const handleForm = () => {
    console.log('Title', title);
    console.log('Description', description);
    console.log('Thumbnail', thumbnail?.uri);
    console.log('Yudio', yudio);
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
        const audioFile = await AudioRecord.stop();
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

  const getRealPathFromURI = async (uri) => {
    if (uri.startsWith('content://')) {
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
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        console.log('Permission denied');
        return false;
      }
    }
    return true;
  };
  

  const fetchAudioMetadata = async () => {
    try {
      // const hasPermission = await requestStoragePermission();
      // if (!hasPermission) {
      //   console.error('Permission denied for accessing storage');
      //   return;
      // }

      const fileUri = await getRealPathFromURI(yudio); // Resolve content URI to actual file path
      if (!fileUri) {
        console.error('Invalid file URI');
        return;
      }

      const formData = new FormData();
      formData.append('audio',{
        uri: fileUri, // Use the resolved file URI
        type: 'audio/mpeg',
        name: thumbnail?.name || 'audio-file.wav',
      });

     
      const audioMetaDataPayload = await apiCall?.generateWaveforms(formData)
      console.log('audioMetaDataPayload', audioMetaDataPayload)
      setWaveform(audioMetaDataPayload.data?.yudioWaveform);
    } catch (error) {
      console.error('Error fetching audio metadata:', error);
    }
  };


  return (
    <SafeAreaView style={styles?.container}>
      <GradientHeader
        title="New Yudio"
        backPress={() => navigation?.goBack}
        advancedButtonPress={() => setDrawer(!drawer)}
      />
      <ScrollView style={styles?.content}>
        <UserInfoHeader
          userName={'Sannya Wasim'}
          image={require('../../assets/images/SignupImage.jpeg')}
        />
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
                <RewriteWithAi />
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
        {yudio ? (
          <View style={styles?.recordedPlayerContainer}>
            <TouchableOpacity
              style={styles?.crossButton}
              onPress={() => setYudio('')}>
              <Cross />
            </TouchableOpacity>
            <Image
              style={styles?.yudioImage}
              source={require('../../assets/images/SignupImage.jpeg')}
            />
            <Text style={styles?.recordedPlayerHeading}>
              What’s going on with Gaza
            </Text>
            <Text style={styles?.recordedPlayerName}>Sannya Wasim</Text>
            <View style={styles?.recordedPlayer}>
              <RecordedAudioPlayer audioURL={yudio} />
              <TouchableOpacity onPress={fetchAudioMetadata} style={styles?.redTickButton}>
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
                    source={require('../../assets/images/SignupImage.jpeg')}
                  />
                </LinearGradient>
              </View>
            )}

            <TouchableOpacity style={styles?.mic} onPress={toggleRecording}>
              {isRecording ? <GradientRedMic /> : <GradientBlueMic />}
            </TouchableOpacity>
          </View>
        )}
        {waveform && <YudioPlayer audioUrl={yudio} />}
        {drawer && <Drawer />}
      </ScrollView>
      <CreateButton title="Create New Yudio" onPress={handleForm} />
    </SafeAreaView>
  );
};

export default CreateYudio;
