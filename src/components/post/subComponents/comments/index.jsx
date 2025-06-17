import { useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import RNFS from 'react-native-fs';
import { images } from '../../../../assets/images';
import {
  GraySolidMicIcon,
  SolidMessageSendIcon,
} from '../../../../assets/images/svgs';
import { toast } from '../../../../components/toast';
import { width } from '../../../../constant';
import { getDataLocally } from '../../../../helper';
import useUser from '../../../../hooks/user';
import { apiCall } from '../../../../services/apiCall';
import { colors } from '../../../../utils/colors';
import CommentBox from './components/commentBox';
import RecordingBars from './components/RecordingBars';
import { styles } from './styles';

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
            <CommentBox
              item={item}
              index={index}
              actions={actions}
              setActions={setActions}
              reply={reply}
              setReply={setReply}
            />
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
