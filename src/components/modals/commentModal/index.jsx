import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import { images } from '../../../assets/images';
import {
  DropDown,
  GraySolidMicIcon,
  SolidMessageSendIcon,
} from '../../../assets/images/svgs';
import RecordingBars from '../../../components/post/subComponents/comments/components/RecordingBars';
import { toast } from '../../../components/toast';
import { width } from '../../../constant';
import { getDataLocally, getRealPathFromURI } from '../../../helper';
import useUser from '../../../hooks/user';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';
import RenderItem from './components/RenderItem';
import { styles } from './styles';

const CommentModal = ({post, sheetRef, setIsSheetOpen, commentObj}) => {
  // console.log("post", post)
  const user = useUser();
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [reply, setReply] = useState({
    userName: '',
    commentId: '',
    active: false,
  });

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
              //   setActions(prev => ({
              //     ...prev,
              //     comments: {
              //       ...prev?.comments,
              //       count: prev?.comments?.count + 1,
              //       value: [...prev?.comments?.value, response],
              //     },
              //   }));

              //   actions?.comments?.ref?.current?.blur();
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
        commentObj?.setComments(prev => ({
          ...prev,
          count: prev.count + 1,
          value: [...prev.value, response],
        }));

        // actions?.comments?.ref?.current?.blur();
      }
    } catch (error) {
      console.log('Error adding comment', error);
      toast('error', 'Error adding comment');
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
        commentObj?.setComments(prev => ({
          ...prev,
          value: prev.value.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), response],
              };
            }
            return comment;
          }),
        }));
        // actions?.comments?.ref?.current?.blur();
      }
    } catch (error) {
      console.log('Error replying to comment', error);
      toast('error', 'Error replying to comment');
    }
  };

  return (
    <BottomSheet
      enablePanDownToClose={true}
      snapPoints={['60%', '90%']} // Must have snapPoints!
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      ref={sheetRef}
      onClose={() => {
        sheetRef?.current?.close();
        setIsSheetOpen(false);
      }}>
      <BottomSheetView style={styles.contentContainer}>
        {/* header */}
        <View style={styles?.header}>
          <Text style={styles?.commentCount}>
            {commentObj?.comments?.count} comments
          </Text>
          <TouchableOpacity style={styles?.sortButton}>
            <Text style={styles?.sortText}>Newest</Text>
            <DropDown />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={commentObj?.comments?.value?.slice(0, 2)}
            renderItem={({item, index}) => (
              <RenderItem
                item={item}
                index={index}
                reply={reply}
                setReply={setReply}
                commentObj={commentObj}
              />
            )}
            keyExtractor={(item, index) =>
              item?.id?.toString() || index.toString()
            }
            contentContainerStyle={{paddingBottom: 100}} // Give space below list
            showsVerticalScrollIndicator={false}
          />
        </View>
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
          <Image
            source={
              user?.photo ? {uri: user?.photo} : images?.defaultProfilePicture
            }
            style={styles?.image}
          />
          {isRecording ? (
            <View style={styles?.recordingBars}>
              <RecordingBars isRecording={isRecording} />
            </View>
          ) : (
            <TextInput
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
              <SolidMessageSendIcon
                width={width * 0.04}
                height={width * 0.04}
              />
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default CommentModal;
