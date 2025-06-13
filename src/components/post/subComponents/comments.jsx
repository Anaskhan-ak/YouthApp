import moment from 'moment';
import { useState } from 'react';
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
import RNFS from 'react-native-fs';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../assets/images';
import {
  GraySolidMicIcon,
  InactiveGrayCommentIcon,
  InactiveGrayLike,
  SolidMessageSendIcon,
} from '../../../assets/images/svgs';
import YudioPlayer from '../../../components/audio/YudioPlayer';
import { toast } from '../../../components/toast';
import { height, Pixels, width } from '../../../constant';
import { getDataLocally } from '../../../helper';
import useUser from '../../../hooks/user';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import RecordingBars from './RecordingBars';

const Comments = ({post, actions, setActions}) => {
  const [showAll, setShowAll] = useState(false);
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState({
    userName: '',
    commentId: '',
    active: false,
  });
  const user = useUser();

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

  const toggleRecording = async () => {
    const userDetails = await getDataLocally();
    if (isRecording) {
      try {
        setIsRecording(false);
        const audioFile = await AudioRecord.stop();
        // console.log('Audio file', audioFile);
        if (audioFile) {
          const formData = new FormData();
          try {
            formData?.append('userId', userDetails?.id);
            formData?.append('postId', post?.id);
            formData?.append('type', 'audio');
            const fileUri = await getRealPathFromURI(audioFile); // Resolve content URI to actual file path
            if (!fileUri) {
              console.error('Invalid file URI');
              return;
            }
            // console.log("FileUri", fileUri)
            formData.append('audio', {
              uri: `file://${fileUri}`, // Use the resolved file URI
              type: 'audio/wav',
              name: 'audio-file.wav',
            });
            // console.log("formData", formData)
            const response = await apiCall?.addAudioComment(formData);
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
        }
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

  // console.log("actions?.comments?.value", actions?.comments?.value)
  const LikeAComment = async commentId => {
    const userDetails = await getDataLocally();
    const body = {
      userId: userDetails?.id,
      commentId: commentId,
      type: 'LIKE',
    };
    console.log('Body', body);
    try {
      const response = await apiCall?.likeAComment(body);
      if (response) {
        console.log('LIked the comment successfully', response);
      }
    } catch (error) {
      console.log('Error liking the comment', error);
      toast('error', 'Error liking the comment');
    }
  };

  const CommentReply = async commentId => {
    const userDetails = await getDataLocally();
    const body = {
      userId: userDetails?.id,
      commentId: commentId,
      comment: text,
    };
    try {
      const response = await apiCall?.commentReply(body);
      if (response) {
        console.log('Successfully replied to comment', response);
        setReply({
          userName: '',
          commentId: '',
          active: false,
        });
        setText('');
        setActions(prev => ({
          ...prev,
          comments: {
            ...prev.comments,
            value: prev.comments.value.map(comment => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: [...comment.replies, response],
                };
              }
              return comment;
            }),
          },
        }));
        actions?.comments?.ref?.current?.blur();
      }
    } catch (error) {
      console.log('Error replying to comment', error);
      toast('error', 'Error replying to comment');
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
                  <TouchableOpacity onPress={() => LikeAComment(item?.id)}>
                    {/* {item?.reactions?.some(r => r?.) */}
                    <InactiveGrayLike />
                    {/* } */}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setReply({
                        userName: `${item?.user?.firstName} ${item?.user?.lastName}`,
                        commentId: item?.id,
                        active: true,
                      });
                      actions?.comments?.ref?.current?.focus();
                    }}>
                    <InactiveGrayCommentIcon />
                  </TouchableOpacity>
                </View>
              </View>
              {item?.waveform?.length > 0 ? (
                <View style={styles?.yudioPlayer}>
                  <View style={styles?.yudioWrapper}>
                    <YudioPlayer
                      audio={{
                        uri: item?.url,
                        waveform: item?.waveform,
                      }}
                      bg={false}
                    />
                  </View>
                </View>
              ) : (
                <Text style={styles?.commentText}>{item?.content}</Text>
              )}
              {
                item?.replies?.length > 0 && (
                  <FlatList data={item?.replies} renderItem={({item})=><Text>{item?.content}</Text>}/>
                )
              }
            </View>
          );
        }}
      />
      {reply?.active && (
        <View style={styles?.replyTitle}>
          <Text style={styles?.replyName}>Replying to {reply?.userName}</Text>
          <TouchableOpacity
            style={styles?.cancelReply}
            onPress={() => setReply(prev => ({...prev, active: false}))}>
            <Text style={styles?.cancelReplyText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* comment input */}
      <View style={styles?.inputContainer}>
        <Image source={images?.onboarding1} style={styles?.image} />
        {isRecording ? (
          <View style={styles?.recordingBars}>
            <RecordingBars isRecording={isRecording} />
          </View>
        ) : (
          <TextInput
            ref={actions?.comments?.ref}
            placeholder="Write your comment"
            placeholderTextColor={colors?.text}
            style={styles?.input}
            value={text}
            onChangeText={setText}
          />
        )}
        <View style={styles?.iconContainer}>
          <TouchableOpacity style={styles?.button} onPress={toggleRecording}>
            <GraySolidMicIcon width={width * 0.04} height={width * 0.04} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles?.button}
            onPress={
              reply?.active
                ? () => CommentReply(reply?.commentId)
                : handleComment
            }>
            <SolidMessageSendIcon width={width * 0.04} height={width * 0.04} />
          </TouchableOpacity>
        </View>
      </View>
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
  recordingBars: {
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.01,
  },
  yudioPlayer: {
    width: width * 0.8,
    height: height * 0.08,
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  yudioWrapper: {
    transform: [{scale: 0.7}],
    marginLeft: -width * 0.05,
  },
  replyTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  replyName: {
    fontFamily: fonts?.montserratSemiBold,
    color: colors?.textGray,
    fontSize: Pixels(10),
  },
  cancelReply: {
    backgroundColor: colors?.gray,
    paddingHorizontal: width * 0.01,
    borderRadius: width * 0.01,
    marginLeft: width * 0.02,
  },
  cancelReplyText: {
    fontFamily: fonts?.montserratSemiBold,
    color: colors?.pink,
    fontSize: Pixels(10),
  },
});
