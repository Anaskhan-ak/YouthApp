import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import YudioPlayer from '../../../components/audio/YudioPlayer';
import LinearGradient from 'react-native-linear-gradient';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';
import MusicPlayer from './../musicPlayer';

const MusicPost = ({post,
  //  modal
  }) => {
  return (
    <View>
      <TouchableOpacity
        // onLongPress={() => modal?.setModal(prev => ({...prev, isPost: true}))}
        >
        <LinearGradient
          colors={[colors?.RGB4, colors?.RGB3]}
          style={styles?.player}>
          <Image source={post?.thumbnail} style={styles?.thumbnail} />
          <View style={styles?.content}>
            <Text style={styles?.heading}>Don't You Worry</Text>
            <Text style={styles?.subHeading}>ELEVATION.2022</Text>
            <View>
              <MusicPlayer />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
     
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
  player: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: width * 0.02,
    height: height * 0.2,
    margin: width * 0.02,
    borderRadius: width * 0.04,
    width: width * 0.89,
  },
  thumbnail: {
    width: width * 0.3,
    height: height * 0.13,
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
  subHeading: {
    fontFamily: fonts?.montserratRegular,
    fontSize: width * 0.03,
    color: colors?.text,
  },
});
