import { StyleSheet, TouchableOpacity, View } from 'react-native';
import YudioPlayer from '../../../../components/audio/YudioPlayer';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';

const YudioPost = ({post, modal}) => {
  return (
    <View>
      <TouchableOpacity
        onLongPress={() => modal?.setModal(prev => ({...prev, isPost: true}))}>
        <View style={styles?.player}>
          <YudioPlayer
            audio={{uri: post?.yudios?.url, waveform: post?.yudios?.waveform}}
          />
        </View>
      </TouchableOpacity>
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
    overflow: 'hidden',
    borderRadius: width * 0.04,
    marginVertical: height * 0.02,
  },
  likes: {
    margin: height * 0.01,
  },
  comments: {
    // backgroundColor : 'red'
  },
});
