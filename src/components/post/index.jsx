import { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { TagFriends } from '../../assets/images/svgs';
import { height, width } from '../../constant';
import { colors } from '../../utils/colors';
import CircleCounter from './subComponents/CircleCounter';
import Comments from './subComponents/comments';
import Likes from './subComponents/likes';
import PostBottomTab from './subComponents/postBottomTab';
import UserPostHeader from './subComponents/userPostHeader';

const Post = ({post}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;
  return (
    <View style={styles?.container}>
      <UserPostHeader user={post?.user} post={post}/>
      <View style={styles?.content}>
        {post?.type === 'MEDIA' && (
          <View>
            <FlatList
              data={post?.media}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => (
                <View style={styles.mediaContainer}>
                  <View style={styles.mediaElements}>
                    <TouchableOpacity>
                      <TagFriends />
                    </TouchableOpacity>
                    <CircleCounter
                      segments={post?.media?.length}
                      filled={index + 1}
                      centerText={index + 1}
                      activeColor={colors?.white}
                      inactiveColor={colors?.gray}
                      centerTextColor={colors?.white}
                    />
                  </View>
                  <Image
                    source={item}
                    style={styles.mediaImage}
                    resizeMode="contain"
                  />
                </View>
              )}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              scrollEventThrottle={16}
            />
            <View style={styles.pagination}>
              {post?.media?.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        activeIndex === index ? colors.RGB2 : colors.white,
                      width:
                        activeIndex === index ? width * 0.06 : width * 0.027,
                    },
                  ]}
                />
              ))}
            </View>
          </View>
        )}
        <View style={styles?.bottomTab}>
          <PostBottomTab post={post} />
        </View>
      </View>
      <View style={styles?.likes}>
        <Likes post={post} />
      </View>
      <View style={styles?.comments}>
        <Comments post={post}/>
      </View>
    </View>
  );
};

export default Post;

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
  mediaContainer: {
    backgroundColor: colors?.black,
    marginHorizontal: height * 0.01,
    borderRadius: width * 0.04,
    marginTop: height * 0.015,
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
    width: width * 0.89,
    height: height * 0.38,
    resizeMode: 'contain',
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
  bottomTab: {
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
  comments : {
    // backgroundColor : 'red'
  }
});
