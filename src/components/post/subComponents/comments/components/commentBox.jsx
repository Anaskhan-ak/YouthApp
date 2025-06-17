import moment from 'moment';
import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../../../assets/images';
import {
    InactiveGrayCommentIcon,
    InactiveGrayLike,
} from '../../../../../assets/images/svgs';
import YudioPlayer from '../../../../../components/audio/YudioPlayer';
import { toast } from '../../../../../components/toast';
import { getDataLocally } from '../../../../../helper';
import { apiCall } from '../../../../../services/apiCall';
import { colors } from '../../../../../utils/colors';
import { styles } from '../styles';

const CommentBox = ({item, index, actions, setActions, reply, setReply}) => {
  const [showAll, setShowAll] = useState(false);
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
      {item?.replies?.length > 0 && (
        <>
          <TouchableOpacity onPress={() => setShowAll(!showAll)}>
            <Text style={styles?.showAllText}>
              {showAll
                ? 'Show less'
                : actions?.comments?.value?.length === 0
                ? 'No replies yet'
                : `View all ${
                    actions?.comments?.value?.find(
                      comment => comment?.id === item?.id,
                    )?.replies?.length
                  } replies`}
            </Text>
          </TouchableOpacity>
          <View style={styles?.repliesContainer}>
            <View style={styles?.repliesWrapper}>
              <FlatList
                data={
                  showAll
                    ? actions?.comments?.value?.find(
                        comment => comment?.id === item?.id,
                      )?.replies
                    : actions?.comments?.value
                        ?.find(comment => comment?.id === item?.id)
                        ?.replies?.slice(0, 1)
                }
                renderItem={({item, index}) => (
                  <CommentBox
                    item={item}
                    index={index}
                    actions={actions}
                    setActions={setActions}
                    reply={reply}
                    setReply={setReply}
                  />
                )}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CommentBox;
