import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TagFriends } from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import PostBottomTab from '../subComponents/postBottomTab';
import PostVideo from './videoPlayer';
// import VideoPlayer from './videoPlayer';

const MomentPost = ({post, modal, actions, setActions, isScrolling}) => {
  const [showTags, setShowTags] = useState(false);
  const [mediaLayout, setMediaLayout] = useState(null);
  const [tagPositions, setTagPositions] = useState([]);

  const handleMediaLayout = event => {
    const {width, height} = event.nativeEvent.layout;
    setMediaLayout({width, height});

    // Generate tag positions if not already generated
    if (post?.Tag?.length && tagPositions.length === 0) {
      const newPositions = post.Tag.map(() => {
        const padding = 40; // safe zone from edges and top bar
        return {
          top: Math.random() * (height - padding * 2) + padding,
          left: Math.random() * (width - 100), // avoid horizontal overflow
        };
      });
      setTagPositions(newPositions);
    }
  };

  const Tags = () => {
    return (
      <>
        {post?.Tag?.map((tag, index) => {
          const pos = tagPositions[index];
          if (!pos) return null;

          return (
            <View
              style={[
                styles?.tagContainer,
                {
                  top: pos.top,
                  left: pos.left,
                },
              ]}>
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>
                  {`@${tag?.user?.firstName} ${tag?.user?.lastName}`}
                </Text>
              </View>
              <View style={styles?.tagPointer} />
            </View>
          );
        })}
      </>
    );
  };

  return (
    <View>
      <TouchableOpacity
        onLongPress={() => modal?.setModal(prev => ({...prev, isPost: true}))}>
        <View onLayout={handleMediaLayout} style={styles.mediaContainer}>
          <View style={styles.mediaElements}>
            <TouchableOpacity onPress={() => setShowTags(!showTags)}>
              <TagFriends />
            </TouchableOpacity>
          </View>
          {/* Show tags only after layout is measured */}
          {showTags && mediaLayout && <Tags />}
          <PostVideo url={post?.Momments?.url} isScrolling={isScrolling} isMoment={true}/>
        </View>
      </TouchableOpacity>
      {!modal?.modal?.isPost && (
        <View
          style={[styles.reactionsTab, {width: mediaLayout?.width || '100%'}]}>
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

export default MomentPost;

const styles = StyleSheet.create({
  mediaContainer: {
    backgroundColor: colors?.black,
    marginHorizontal: height * 0.01,
    borderRadius: width * 0.04,
    marginTop: height * 0.015,
    overflow: 'hidden',
  },
  mediaElements: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.03,
    position: 'absolute',
    zIndex: 10,
    width: width * 0.82,
    // backgroundColor : 'red',
    marginTop: height * 0.01,
    padding: width * 0.01,
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
  reactionsTab: {
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
    // right: height * 0.01,
    // left: height * 0.01,
    alignSelf: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 20,
    // top: 40,
  },
  tag: {
    backgroundColor: colors?.black,
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.02,
    borderRadius: width * 0.2,
    margin: width * 0.02,
  },
  tagText: {
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.025,
    color: colors?.white,
  },
  tagPointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: height * 0.005,
    borderBottomWidth: height * 0.005,
    borderLeftWidth: width * 0.03,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: colors?.black,
    left: -width * 0.025,
  },
});
