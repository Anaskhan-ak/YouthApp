import { BlurView } from '@react-native-community/blur';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { InactiveDownload } from '../../../../assets/images/svgs';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';

const DocumentPost = ({post, 
  // modal
}) => {
    // console.log("post",post)
  return (
    <View>
      <TouchableOpacity 
      // onLongPress={() => modal?.setModal(prev => ({...prev, isPost : true}))}
      >
        <ImageBackground source={{uri : post?.documents?.thumbnail}} style={styles?.player}>
          <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
          <TouchableOpacity style={styles?.downloadIcon}>
            <InactiveDownload />
          </TouchableOpacity>
          <Image source={{uri : post?.documents?.thumbnail}} style={styles?.thumbnail} />
        </ImageBackground>
      </TouchableOpacity>
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
  downloadIcon: {
    position: 'absolute',
    zIndex: 100,
    right: width * 0.03,
    top: height * 0.012,
  },
});
