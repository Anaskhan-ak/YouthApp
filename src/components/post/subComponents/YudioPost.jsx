import { StyleSheet, View } from 'react-native';
// import YudioPlayer from '../../../components/audio/YudioPlayer';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import PostBottomTab from '../subComponents/postBottomTab';

const YudioPost = ({post}) => {
  return (
    <View>
      <View style={styles?.player}>
        {/* <YudioPlayer
          audio={{uri : post?.yudio?.url}}
        /> */}
      </View>
      <View style={styles?.reactionsTab}>
        <PostBottomTab post={post} />
      </View>
    </View>
  );
};

export default YudioPost;

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
  player : {
    backgroundColor : colors?.gray11
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
});
