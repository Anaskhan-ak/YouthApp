import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import PostBottomTab from '../postBottomTab';
import UserPostHeader from '../userPostHeader';
import MediaPost from './mediaPost';
import MomentPost from './momentPost';
// import VideoPlayer from './videoPlayer';

const Repost = ({post, modal, actions, setActions, isScrolling}) => {
  // console.log("post", post)
  const [mediaWidth, setMediaWidth] = useState(null);

  const renderPostContent = (post, modalProps) => {
    // console.log('Post', post);
    const postComponents = {
      MEDIA: MediaPost,
      // MUSIC: MusicPost,
      // YUDIO: YudioPost,
      // EVENT: EventPost,
      // DOCUMENT: DocumentPost,
      MOMMENTS: MomentPost,
    };
    if (
      post?.type === 'MUSIC' ||
      post?.type === 'YUDIO' ||
      post?.type === 'EVENT' ||
      post?.type === 'DOCUMENT' 
    ) {
      return null;
    }

    const PostComponent = postComponents[post.type];
    return (
      <PostComponent
        post={post}
        modal={modalProps}
        isScrolling={isScrolling}
      />
    );
  };

  return (
    <View>
      <LinearGradient
        style={styles?.content}
        colors={[colors?.RGB5, colors?.white]}>
        <View style={styles?.contentWrapper}>
          <UserPostHeader user={post?.SharePost?.user} post={post?.SharePost} />
          {renderPostContent(post?.SharePost, modal)}
        </View>
      </LinearGradient>
      {!modal?.modal?.isPost && (
        <View style={[styles.reactionsTab, {width: mediaWidth}]}>
          <PostBottomTab
            post={post}
            actions={actions}
            setActions={setActions}
          />
        </View>
      )}
    </View>
  );
};

export default Repost;

const styles = StyleSheet.create({
  content: {
    width: width * 0.9,
    // height: height * 0.43,
    marginTop: height * 0.02,
    borderRadius: width * 0.04,
  },
  contentWrapper: {
    transform: [{scale: 0.9}],
    // marginTop: -height * 0.06,
    // overflow : 'hidden',
    padding: width * 0.02,
    marginBottom : height * 0.03
  },
  reactionsTab: {
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
    right: height * 0.0045,
    left: height * 0.01,
    alignSelf: 'center',
  },
});
