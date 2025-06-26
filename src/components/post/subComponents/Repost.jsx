import { useState } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import DocumentPost from './documentPost';
import EventPost from './eventPost';
import MediaPost from './mediaPost';
import MomentPost from './MomentPost';
import MusicPost from './MusicPost';
import PostBottomTab from './postBottomTab';
import UserPostHeader from './userPostHeader';
import YudioPost from './YudioPost';
// import VideoPlayer from './videoPlayer';

const Repost = ({post, modal, actions, setActions, isScrolling}) => {
    // console.log("post", post)
  const [mediaWidth, setMediaWidth] = useState(null);

  const renderPostContent = (post, modalProps) => {
    const postComponents = {
      MEDIA: MediaPost,
      MUSIC: MusicPost,
      YUDIO: YudioPost,
      EVENT: EventPost,
      DOCUMENT: DocumentPost,
      MOMMENTS: MomentPost,
    };

    const PostComponent = postComponents[post.type];
    return (
      <PostComponent
        post={post}
        modal={modalProps}
        actions={actions}
        setActions={setActions}
        isScrolling={isScrolling}
        isRepost={true}
      />
    );
  };

  return (
    <View>
      <LinearGradient style={styles?.content} colors={[colors?.RGB3, colors?.RGB4]}>        
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
    width : width * 0.9,
    height : height * 0.38,
    marginTop: height * 0.02,
    borderRadius : width * 0.04
  },
  contentWrapper : {
    transform : [{scale : 0.7}],
    marginTop : -height * 0.06
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
