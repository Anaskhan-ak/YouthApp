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
  View
} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import LinearGradient from 'react-native-linear-gradient';
import {
  GradientBlueMic,
  GradientRedMic,
  RewriteWithAi,
  UploadThumbnail
} from '../../assets/images/svgs';
import CreateButton from '../../components/buttons/CreateButton';
import Drawer from '../../components/drawer';
import GradientHeader from '../../components/headers/gradientHeader';
import UserInfoHeader from '../../components/headers/userInfoHeader';
import { colors } from '../../utils/colors';
import AudioBars from './audioBars';
import { styles } from './styles';

const CreateYudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [drawer, setDrawer] = useState(false)
  const [yudio, setYudio] = useState()
  const navigation = useNavigation();
  const recordingTimer = useRef(null);


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
            />
            <View style={styles?.inputDescFooter}>
              <TouchableOpacity style={styles?.Ai}>
                <RewriteWithAi />
              </TouchableOpacity>
              <Text style={styles?.character}>350/350</Text>
            </View>
          </View>
          <TouchableOpacity style={styles?.thumbnailButton}>
            <UploadThumbnail />
            <Text style={styles?.uploadThumbnailText}>
              {`Upload your\n thumbnail`}
            </Text>
          </TouchableOpacity>
        </View>
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

          <TouchableOpacity
            style={styles?.mic}
            onPress={toggleRecording}>
            {isRecording ? <GradientRedMic /> : <GradientBlueMic />}
          </TouchableOpacity>
        </View>
        {
          drawer && (<Drawer/>)
        }
      </ScrollView>
      <CreateButton title="Create New Yudio" />
    </SafeAreaView>
  );
};

export default CreateYudio;
