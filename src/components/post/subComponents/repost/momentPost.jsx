import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import PostVideo from './../videoPlayer';
// import VideoPlayer from './videoPlayer';

const MomentPost = ({post, modal, isScrolling}) => {
    // console.log("post", post)
  const [mediaLayout, setMediaLayout] = useState(null);

  const handleMediaLayout = event => {
    const {width, height} = event.nativeEvent.layout;
    setMediaLayout({width, height});
  };

  return (
    <View>
      <TouchableOpacity
        onLongPress={() => modal?.setModal(prev => ({...prev, isPost: true}))}>
        <View onLayout={handleMediaLayout} style={styles.mediaContainer}>
          <PostVideo url={post?.Momments?.url} isScrolling={isScrolling} isMoment={true} isRepost={true}/>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MomentPost;

const styles = StyleSheet.create({
  mediaContainer: {
    backgroundColor: colors?.black,
    marginHorizontal: height * 0.01,
    borderRadius: width * 0.04,
    marginTop: height * 0.015,
    overflow: 'hidden',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
    top: height * 0.32,
    width: width * 0.82,
    alignSelf: 'center',
  },
  dot: {
    height: width * 0.027,
    borderRadius: width * 0.027,
    marginHorizontal: width * 0.01,
  },
});
