import moment from 'moment';
import { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import LinearGradient from 'react-native-linear-gradient';
import { useSharedValue } from 'react-native-reanimated';
import { images } from '../../../assets/images';
import {
  ActiveLike,
  GraySolidMicIcon,
  InactiveGrayCommentIcon,
  SolidMessageSendIcon,
} from '../../../assets/images/svgs';
import YudioPlayer from '../../../components/audio/YudioPlayer';
import { toast } from '../../../components/toast';
import { height, Pixels, width } from '../../../constant';
import { getDataLocally } from '../../../helper';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const audioRecorderPlayer = new AudioRecorderPlayer();

const audioSet = {
  AudioEncoderAndroid: 'aac',
  AudioSourceAndroid: 'mic',
  OutputFormatAndroid: 'aac_adts',
  AVEncoderAudioQualityKeyIOS: 'high',
  AVNumberOfChannelsKeyIOS: 2,
  AVFormatIDKeyIOS: 'aac',
};

const Comments = ({post, actions, setActions}) => {
  const [showAll, setShowAll] = useState(false);
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recordingTimer = useRef(null);
  const [waveform, setWaveform] = useState([]);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [temp, setTemp] = useState([]);
  const tempRef = useRef({
    isPlaying: false,
    meter: [],
  });
  const animatedWidth = useSharedValue(0);
  const recordSubscription = useRef(null);
  const [metering, setMetering] = useState([]);

  const getRealPathFromURI = async uri => {
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

  const fetchAudioMetadata = async audio => {
    try {
      const fileUri = await getRealPathFromURI(audio); // Resolve content URI to actual file path
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
      // console.log('audioMetaDataPayload', audioMetaDataPayload);
      return audioMetaDataPayload;
    } catch (error) {
      console.error('Error fetching audio metadata:', error);
    }
  };

  // 🎧 This triggers waveform visual updates
  const playerForVisuals = async () => {
    await audioRecorderPlayer.startRecorder(undefined, audioSet, true);
    tempRef.current.isPlaying = true;

    recordSubscription.current = audioRecorderPlayer.addRecordBackListener(
      e => {
        console.log('Metering:', e.currentMetering); // Debug log
        if (tempRef.current.isPlaying && e.currentMetering != null) {
          let temp1 = [30 + e.currentMetering, ...tempRef.current.meter];
          if (temp1.length > 40) temp1 = temp1.slice(0, 20);
          tempRef.current.meter = temp1;
          setMetering([...temp1]);
        }
      },
    );
  };

  const toggleRecording = async () => {
    if (isRecording) {
      try {
        setIsRecording(false);
        const audioFile = await AudioRecord.stop();
        console.log('Audio file saved at:', audioFile);
        setAudio(audioFile)
        const audioWaves = await fetchAudioMetadata(audioFile)
        console.log("audiowaves", audioWaves)
        setWaveform(audioWaves)
        tempRef.current.isPlaying = false;
        if (recordSubscription.current) {
          recordSubscription.current.remove();
          recordSubscription.current = null;
        }

        await audioRecorderPlayer.stopRecorder();
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    } else {
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
        playerForVisuals();
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    }
  };

  const handleComment = async () => {
    const userDetails = await getDataLocally();
    try {
      const body = {
        userId: userDetails?.id,
        postId: post?.id,
        comment: text,
      };
      const response = await apiCall?.addComment(body);
      if (response) {
        console.log('Comment added successfully', response);
        setText('');
        setActions(prev => ({
          ...prev,
          comments: {
            ...prev?.comments,
            count: prev?.comments?.count + 1,
            value: [...prev?.comments?.value, response],
          },
        }));

        actions?.comments?.ref?.current?.blur();
      }
    } catch (error) {
      console.log('Error adding comment', error);
      toast('error', 'Error adding comment');
    }
  };


  return (
    <View style={styles?.container}>
      <TouchableOpacity onPress={() => setShowAll(!showAll)}>
        <Text style={styles?.showAllText}>
          {showAll
            ? 'Show less'
            : actions?.comments?.value?.length === 0
            ? 'No comments yet'
            : `View all ${actions?.comments?.value?.length} comments`}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={
          showAll
            ? actions?.comments?.value
            : post?.comments?.value?.slice(0, 1)
        }
        renderItem={({item, index}) => {
          // console.log('Item', item);
          return (
            <View key={index} style={styles?.commentBox}>
              <View style={styles?.header}>
                <LinearGradient
                  colors={[colors?.RGB1, colors?.RGB2]}
                  style={styles?.gradientBorder}>
                  <Image
                    source={
                      item?.photo
                        ? {uri: item?.user?.photo}
                        : images?.defaultProfilePicture
                    }
                    style={styles?.image}
                  />
                </LinearGradient>
                <View style={styles?.textContainer}>
                  <Text
                    style={
                      styles?.name
                    }>{`${item?.user?.firstName} ${item?.user?.lastName}`}</Text>
                  <Text style={styles?.time}>
                    {moment(item?.createdAt).startOf('hour').fromNow()}
                  </Text>
                </View>
                <View style={styles?.iconContainer}>
                  <TouchableOpacity>
                    <ActiveLike />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <InactiveGrayCommentIcon />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles?.commentText}>{item?.content}</Text>
            </View>
          );
        }}
      />
      {/* comment input */}
      <View style={styles?.inputContainer}>
        <Image source={images?.onboarding1} style={styles?.image} />
        <TextInput
          ref={actions?.comments?.ref}
          placeholder="Write your comment"
          placeholderTextColor={colors?.text}
          style={styles?.input}
          value={text}
          onChangeText={setText}
        />
        <View style={styles?.iconContainer}>
          <TouchableOpacity style={styles?.button} onPress={toggleRecording}>
            <GraySolidMicIcon width={width * 0.04} height={width * 0.04} />
          </TouchableOpacity>
          <TouchableOpacity style={styles?.button} onPress={handleComment}>
            <SolidMessageSendIcon width={width * 0.04} height={width * 0.04} />
          </TouchableOpacity>
        </View>
      </View>
      {metering.map((value, index) => (
        <View
          key={index}
          style={{
            width: 4,
            marginHorizontal: 1,
            height: value,
            backgroundColor: '#4f46e5',
          }}
        />
      ))}
      {waveform?.length > 0 && (
        <View style={styles?.yudioPlayerContainer}>
          <YudioPlayer
            audio={{
              uri: audio,
              waveform: waveform,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  showAllText: {
    fontFamily: fonts?.montserratMedium,
    fontSize: Pixels(8),
    color: colors?.text,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentBox: {
    borderWidth: width * 0.002,
    borderColor: colors?.gray11,
    borderRadius: width * 0.02,
    padding: width * 0.02,
    marginVertical: height * 0.005,
  },
  gradientBorder: {
    width: width * 0.06,
    height: width * 0.06,
    borderRadius: width * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: width * 0.07,
  },
  textContainer: {
    flex: 0.65,
  },
  name: {
    fontFamily: fonts?.montserratBold,
    fontSize: Pixels(10),
    color: colors?.text,
  },
  time: {
    fontFamily: fonts?.montserratMedium,
    fontSize: Pixels(9),
    color: colors?.textGray,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.3,
    justifyContent: 'space-evenly',
    right: -width * 0.03,
  },
  commentText: {
    fontFamily: fonts?.montserratMedium,
    fontSize: Pixels(11),
    color: colors?.text,
    marginLeft: width * 0.075,
    marginTop: height * 0.01,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: width * 0.002,
    borderColor: colors?.gray11,
    borderRadius: width * 0.065,
    paddingHorizontal: width * 0.01,
    marginVertical: height * 0.005,
  },
  input: {
    flex: 0.65,
    color: colors?.text,
  },
  button: {
    padding: width * 0.01,
    // marginHorizontal: width * 0.005,
  },
  yudioPlayerContainer: {
    marginVertical: height * 0.02,
  },
});
