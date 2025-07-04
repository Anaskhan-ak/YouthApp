import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import YudioPlayer from '../../../components/audio/YudioPlayer';
import LinearGradient from 'react-native-linear-gradient';
import {height, width} from '../../../constant';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import PostBottomTab from '../subComponents/postBottomTab';
import MusicPlayer from './musicPlayer';

const MusicPost = ({post, modal}) => {
  return (
    <View style={styles?.container}>
      <TouchableOpacity
        onLongPress={() => modal?.setModal(prev => ({...prev, isPost: true}))}>
        <LinearGradient
          colors={[colors?.RGB4, colors?.RGB3]}
          style={styles?.player}>
          <Image
            source={{uri: post?.Music?.thumbnail}}
            style={styles?.thumbnail}
          />
          <View style={styles?.content}>
            <Text style={styles?.heading}>Don't You Worry</Text>
            <Text style={styles?.subHeading}>ELEVATION.2022</Text>
            <View>
              <MusicPlayer audioURL={post?.Music?.url} />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      {!modal?.modal?.isPost && (
        <View style={styles?.reactionsTab}>
          <PostBottomTab post={post} />
        </View>
      )}
    </View>
  );
};

export default MusicPost;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor : "red",
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.02,
  },
  player: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: Platform?.OS === 'android' && width * 0.02,
    height: height * 0.23,
    // margin: width * 0.02,
    borderRadius: width * 0.04,
    width: width * 0.89,
  },
  reactionsTab: {
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
    width: width * 0.89,
    // right: height * 0.0045,
    // left: height * 0.01,
    alignSelf: 'center',
  },
  likes: {
    margin: height * 0.01,
  },
  thumbnail: {
    width: width * 0.3,
    height: height * 0.15,
    borderRadius: width * 0.015,
    margin: Platform?.OS === 'ios' && width * 0.02,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginLeft: width * 0.02,
    marginTop: height * 0.01,
  },
  heading: {
    fontFamily: fonts?.montserratExtraBold,
    fontSize: width * 0.037,
    color: colors?.text,
  },
  subHeading: {
    fontFamily: fonts?.montserratRegular,
    fontSize: width * 0.03,
    color: colors?.text,
  },
});
