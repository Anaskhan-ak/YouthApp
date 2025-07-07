import moment from 'moment';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import Attendees from '../subComponents/Attendees';
import PostBottomTab from '../subComponents/postBottomTab';

const EventPost = ({post, modal, actions, setActions}) => {
  // console.log("post",post);

  return (
    <View>
      <TouchableOpacity
        onLongPress={() => modal?.setModal(prev => ({...prev, isPost: true}))}>
        <View style={styles.mediaContainer}>
          <Image
            source={{uri: post?.event?.thumbnail}}
            style={styles.mediaImage}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>

      <View style={styles?.reactionsTab}>
        <View style={styles?.bottomTab}>
          <View style={styles?.eventTextConatiner}>
            <Text style={styles?.eventLocation}>{`${
              post?.event?.eventDay
            } ${moment(post?.event?.eventTime)?.format('hh:mm')} ${
              post?.event?.locations
            }`}</Text>
            <Text style={styles?.eventCaption}>
              {post?.caption?.length > 18
                ? `${post?.caption?.slice(0, 18)}...`
                : post?.caption}
            </Text>
          </View>
          <View style={styles?.eventElements}>
            <View style={styles?.attendees}>
              <Attendees post={post} />
            </View>
            <View style={styles?.eventHost}>
              <Image
                source={{uri: post?.user?.photo}}
                style={styles?.hostImage}
              />
              <Text
                style={
                  styles?.hostName
                }>{`${post?.user?.firstName} ${post?.user?.lastName} (Host)`}</Text>
            </View>
          </View>
        </View>
        {!modal?.modal?.isPost && (
          <PostBottomTab
            post={post}
            actions={actions}
            setActions={setActions}
          />
        )}
      </View>
    </View>
  );
};

export default EventPost;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors?.white,
    padding: width * 0.02,
    margin: width * 0.02,
    borderRadius: width * 0.04,
  },
  content: {
    // backgroundColor : 'yellow'
  },
  mediaContainer: {
    backgroundColor: colors?.black,
    marginHorizontal: height * 0.01,
    borderRadius: width * 0.04,
    marginTop: height * 0.015,
    width: width * 0.89,
    overflow: 'hidden',
  },
  mediaImage: {
    width: width * 0.89,
    height: height * 0.38,
    resizeMode: 'contain',
  },
  bottomTab: {
    backgroundColor: colors?.gray11,
    height: height * 0.08,
    width: width * 0.89,
    borderTopLeftRadius: width * 0.03,
    borderTopRightRadius: width * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reactionsTab: {
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
    // width: width * 0.89,
    right: height * 0.0045,
    left: height * 0.01,
    alignSelf: 'center',
  },
  likes: {
    margin: height * 0.01,
  },
  comments: {
    // backgroundColor : 'red'
  },
  eventTextConatiner: {
    marginLeft: width * 0.02,
  },
  eventLocation: {
    fontFamily: fonts?.montserratSemiBold,
    fontSize: width * 0.03,
    color: colors?.text,
  },
  eventCaption: {
    fontFamily: fonts?.montserratExtraBold,
    fontSize: width * 0.03,
    color: colors?.text,
  },
  eventHost: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: width * 0.01,
  },
  hostImage: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.08,
    borderWidth: width * 0.005,
    borderColor: colors?.RGB2,
  },
  hostName: {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.026,
    color: colors?.text,
    marginLeft: width * 0.01,
  },
  eventElements: {
    bottom: height * 0.03,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  attendees: {
    marginBottom: -height * 0.01,
  },
});
