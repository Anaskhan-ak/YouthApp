import { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';
import CircleCounter from '../../subComponents/CircleCounter';
import PostVideo from './../videoPlayer';
// import VideoPlayer from './videoPlayer';

const MediaPost = ({post, 
  // modal,
   isScrolling}) => {
    // console.log('Post', post);
  const [activeIndex, setActiveIndex] = useState(0);
   const [mediaLayout, setMediaLayout] = useState(null);

  const handleMediaLayout = event => {
    const {width, height} = event.nativeEvent.layout;
    setMediaLayout({width, height});
  };
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({item, index}) => {
    const isVideo =
      item?.split('.')?.pop() === 'MOV' ||
      item?.split('.')?.pop() === 'mp4' ||
      item?.split('.')?.pop() === 'm3u8';
    return (
      <TouchableOpacity
        // onLongPress={() => modal?.setModal(prev => ({...prev, isPost: true}))}
        >
        <View
          onLayout={handleMediaLayout}
          style={[
            styles.mediaContainer,
            // !modal?.modal?.isPost && {borderRadius: width * 0.04},
          ]}>
          {!isVideo && (
            <View style={styles.mediaElements}>
              {post?.media?.url?.length > 1 && (
                <CircleCounter
                  segments={post?.media?.length}
                  filled={index + 1}
                  centerText={index + 1}
                  activeColor={colors?.white}
                  inactiveColor={colors?.gray}
                  centerTextColor={colors?.white}
                />
              )}
            </View>
          )}

          {isVideo ? (
            <PostVideo url={item} isScrolling={isScrolling} />
          ) : (
            <Image
              source={{uri: item}}
              style={[
                styles.mediaImage,
                // modal?.modal?.isPost && {
                //   borderWidth: 3,
                //   borderColor: colors?.white,
                // },
              ]}
              resizeMode="cover"
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={post?.media?.url}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />
      {post?.media?.url?.length > 1 && (
        <View style={styles.pagination}>
          {post?.media?.url?.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    activeIndex === index ? colors.RGB2 : colors.white,
                  width: activeIndex === index ? width * 0.06 : width * 0.027,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default MediaPost;

const styles = StyleSheet.create({
  mediaContainer: {
    backgroundColor: colors?.black,
    // marginHorizontal: height * 0.01,
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
  mediaImage: {
    width: width * 0.85,
    height: height * 0.28,
    resizeMode: 'cover',
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
    right: height * 0.0045,
    left: height * 0.01,
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
