import { StyleSheet, View } from 'react-native';
import { height, width } from '../../constant';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import Comments from './subComponents/comments';
import EventPost from './subComponents/eventPost';
import Likes from './subComponents/likes';
import MediaPost from './subComponents/mediaPost';
import MusicPost from './subComponents/MusicPost';
import UserPostHeader from './subComponents/userPostHeader';
import YudioPost from './subComponents/YudioPost';

const Post = ({post}) => {
  return (
    <View style={styles?.container}>
      <UserPostHeader user={post?.user} post={post} />
      <View style={styles?.content}>
        {post?.type === 'MEDIA' && <MediaPost post={post} />}
        {post?.type === 'EVENT' && <EventPost post={post} />}
        {post?.type === 'YUDIO' && <YudioPost post={post} />}
        {post?.type === 'MUSIC' && <MusicPost post={post} />}
      </View>
      <View style={styles?.likes}>
        <Likes post={post} />
      </View>
      <View style={styles?.comments}>
        <Comments post={post} />
      </View>
    </View>
  );
};

export default Post;

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
  },
  mediaImage: {
    width: width * 0.89,
    height: height * 0.38,
    resizeMode: 'contain',
  },
  bottomTab: {
    backgroundColor: colors?.gray11,
    height: height * 0.08,
    width: width * 0.88,
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
