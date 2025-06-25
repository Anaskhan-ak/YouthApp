import moment from 'moment';
import { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { images } from '../../../../assets/images';
import { GrayTimeIcon, ReplyArrow } from '../../../../assets/images/svgs';
import { height, Pixels, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';

const RenderItem = ({item, index, reply, setReply, commentObj}) => {
  const [showReplies, setShowReplies] = useState(false);
  return (
    <>
      <View key={index} style={styles?.container}>
        <Image
          style={styles?.image}
          source={
            item?.user?.photo
              ? {uri: item?.user?.photo}
              : images?.defaultProfilePicture
          }
        />
        <View style={styles?.textBox}>
          <Text style={styles?.userName}>
            {item?.user && `${item?.user?.firstName} ${item?.user?.lastName}`}
          </Text>
          <Text style={styles?.commentText}>{item?.content}</Text>
          <View style={styles?.bottom}>
            {!item?.commentId && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={styles?.replyButton}
                  onPress={() => {
                    setReply({
                      userName: `${item?.user?.firstName} ${item?.user?.lastName}`,
                      commentId: item?.id,
                      active: true,
                    });
                  }}>
                  <ReplyArrow />
                  <Text style={styles?.replyText}>Reply</Text>
                </TouchableOpacity>
                {item?.replies?.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setShowReplies(!showReplies)}>
                    <Text style={styles?.repliesText}>
                      {item?.replies?.length} replies
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            <View style={styles?.time}>
              <GrayTimeIcon width={width * 0.035} height={width * 0.035} />
              <Text style={styles?.timeText}>
                {moment(item?.createdAt)
                  .startOf('hour')
                  .fromNow()
                  ?.replace('days', 'd')
                  ?.replace('day', 'd')
                  ?.replace('hours', 'hrs')
                  ?.replace('hour', 'hr')
                  ?.replace('minutes', 'mins')
                  ?.replace('minute', 'min')
                  ?.replace('seconds', 's')
                  ?.replace('second', 's')
                  ?.replace('months', 'mth')
                  ?.replace('month', 'mth')}{' '}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {showReplies && (
        <View style={styles?.repliesContainer}>
          <View style={styles?.repliesWrapper}>
            <FlatList
              data={
                commentObj?.comments?.value?.find(
                  comment => comment?.id === item?.id,
                )?.replies
              }
              renderItem={({item, index}) => {
                return (
                  <RenderItem
                    item={item}
                    index={index}
                    commentObj={commentObj}
                  />
                );
              }}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginHorizontal: width * 0.01,
    marginVertical: height * 0.015,
  },
  image: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.1,
    margin: width * 0.01,
    // flex: 0.2,
  },
  textBox: {
    // flex: 0.8,
    marginHorizontal: width * 0.02,
  },
  userName: {
    fontFamily: fonts?.montserratSemiBold,
    fontSize: Pixels(14),
    color: colors?.text,
  },
  commentText: {
    fontFamily: fonts?.montserratRegular,
    fontSize: Pixels(12),
    color: colors?.textGray,
    marginTop: height * 0.01,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height * 0.01,
    width: width * 0.7,
  },
  replyButton: {
    backgroundColor: colors?.extraLightGrey,
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.01,
    borderRadius: width * 0.01,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // flex : 0.4
  },
  replyText: {
    fontFamily: fonts?.montserratSemiBold,
    fontSize: Pixels(11),
    color: colors?.text,
    marginLeft: width * 0.01,
  },
  repliesText: {
    fontFamily: fonts?.montserratSemiBold,
    fontSize: Pixels(12),
    color: colors?.gray,
    marginLeft: width * 0.02,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.6,
  },
  timeText: {
    fontFamily: fonts?.montserratRegular,
    fontSize: Pixels(12),
    color: colors?.gray,
    marginLeft: width * 0.02,
  },
  repliesContainer: {
    overflow: 'hidden',
    width: width * 0.7,
    marginLeft: width * 0.1,
    borderLeftWidth: width * 0.001,
    borderColor: colors?.gray,
    marginVertical: height * 0.01,
  },
  repliesWrapper: {
    transform: [{scale: 0.9}],
  },
});
