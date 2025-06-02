import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
// import YudioPlayer from '../../../components/audio/YudioPlayer';
import { BlurView } from '@react-native-community/blur';
import { InactiveDownload } from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import PostBottomTab from './postBottomTab';

const DocumentPost = ({post}) => {
  return (
    <View>
      <ImageBackground source={post?.thumbnail} style={styles?.player}>
        <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
        <TouchableOpacity style={styles?.downloadIcon}>
            <InactiveDownload/>
        </TouchableOpacity>
        <Image source={post?.thumbnail} style={styles?.thumbnail} />
      </ImageBackground>
      <View style={styles?.reactionsTab}>
        <PostBottomTab post={post} />
      </View>
    </View>
  );
};

export default DocumentPost;

const styles = StyleSheet.create({
  player: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: width * 0.02,
    borderRadius: width * 0.04,
    width: width * 0.89,
    overflow: 'hidden',
  },
  reactionsTab: {
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
    // width: width * 0.89,
    right: height * 0.0045,
    left: height * 0.009,
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
    height: height * 0.2,
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
  subHeading: {
    fontFamily: fonts?.montserratRegular,
    fontSize: width * 0.03,
    color: colors?.text,
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
  downloadIcon : {
    position : 'absolute',
    zIndex : 100,
    right : width * 0.03,
    top : height * 0.012
  }
});
