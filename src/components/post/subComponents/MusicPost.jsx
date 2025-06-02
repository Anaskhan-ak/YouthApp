import { Image, StyleSheet, Text, View } from 'react-native';
// import YudioPlayer from '../../../components/audio/YudioPlayer';
import LinearGradient from 'react-native-linear-gradient';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import PostBottomTab from '../subComponents/postBottomTab';
import MusicPlayer from './musicPlayer';

const MusicPost = ({post}) => {
  return (
    <View>
      <LinearGradient
        colors={[colors?.RGB4, colors?.RGB3]}
        style={styles?.player}>
        <Image source={post?.thumbnail} style={styles?.thumbnail} />
        <View style={styles?.content}>
          <Text style={styles?.heading}>Don't You Worry</Text>
          <Text style={styles?.subHeading}>ELEVATION.2022</Text>
          <View>
            <MusicPlayer/>
          </View>
        </View>
      </LinearGradient>
      <View style={styles?.reactionsTab}>
        <PostBottomTab post={post} />
      </View>
    </View>
  );
};

export default MusicPost;

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
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: width * 0.02,
    height: height * 0.18,
    margin: width * 0.02,
    borderRadius: width * 0.015,
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
  thumbnail: {
    width: width * 0.3,
    height: height * 0.11,
    borderRadius: width * 0.015,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginLeft: width * 0.02,
  },
  heading: {
    fontFamily: fonts?.montserratExtraBold,
    fontSize: width * 0.037,
    color: colors?.text,
  },
  subHeading : {
    fontFamily: fonts?.montserratRegular,
    fontSize: width * 0.03,
    color: colors?.text,
  }
});
