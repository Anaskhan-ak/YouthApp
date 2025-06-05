import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import PostBottomTab from '../subComponents/postBottomTab';

const YudioPost = ({post, modal}) => {
  return (
    <View>
      <TouchableOpacity
        onLongPress={() => modal?.setModal(prev => ({...prev, isPost: true}))}>
        <View style={styles?.player}>
          
            {/* <YudioPlayer audio={{uri: post?.yudios?.url, wavform: post?.yudios?.waveform}} /> */}
          
        </View>
      </TouchableOpacity>
      {!modal?.modal?.isPost && (
        <View style={styles?.reactionsTab}>
          <PostBottomTab post={post} />
        </View>
      )}
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
  player: {
    backgroundColor: colors?.gray11,
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
