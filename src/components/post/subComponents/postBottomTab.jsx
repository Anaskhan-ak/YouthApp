import { BlurView } from '@react-native-community/blur';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActiveComment,
  ActiveIOSShare,
  ActiveLike,
  ActiveRepost,
  ActiveSave,
  InactiveComment,
  InactiveIOSShare,
  InactiveLike,
  InactiveRepost,
  InactiveSave
} from '../../../assets/images/svgs';
import { toast } from '../../../components/toast';
import { height, width } from '../../../constant';
import { getDataLocally } from '../../../helper';
import useUser from '../../../hooks/user';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const PostBottomTab = ({post, actions, setActions}) => {
  const [follow, setFollow] = useState(false)
  const user = useUser();
  const [icons, setIcons] = useState([
    {
      type: 'like',
      id: '',
      active: actions?.likes?.value?.some(r => r?.postId === post?.id),
      count: actions?.likes?.count,
      activeIcon: <ActiveLike width={width * 0.055} height={width * 0.055} />,
      inactiveIcon: (
        <InactiveLike width={width * 0.055} height={width * 0.055} />
      ),
    },
    {
      type: 'comment',
      active: false,
      count: actions?.comments?.count,
      activeIcon: (
        <ActiveComment width={width * 0.055} height={width * 0.055} />
      ),
      inactiveIcon: (
        <InactiveComment width={width * 0.055} height={width * 0.055} />
      ),
    },
    {
      type: 'save',
      active: false,
      count: 0,
      activeIcon: <ActiveSave width={width * 0.055} height={width * 0.055} />,
      inactiveIcon: (
        <InactiveSave width={width * 0.055} height={width * 0.055} />
      ),
    },
    {
      type: 'repost',
      active: false,
      count: 0,
      activeIcon: <ActiveRepost width={width * 0.055} height={width * 0.055} />,
      inactiveIcon: (
        <InactiveRepost width={width * 0.055} height={width * 0.055} />
      ),
    },
    {
      type: 'share',
      active: false,
      count: 0,
      activeIcon: <ActiveIOSShare width={width * 0.055} height={width * 0.055} />,
      inactiveIcon: (
        <InactiveIOSShare width={width * 0.055} height={width * 0.055} />
      ),
    },
  ]);
  useEffect(() => {
    if (user?.id) {
      setIcons(prev =>
        prev?.map(icon =>
          icon?.type === 'like'
            ? {
                ...icon,
                id: actions?.likes?.value?.find(r => r?.userId === user?.id)
                  ?.id,
              }
            : icon,
        ),
      );
    }
  }, [user?.id]);

  useEffect(() => {
    setIcons(prev =>
      prev.map(icon =>
        icon.type === 'comment'
          ? {...icon, count: actions?.comments?.count}
          : icon,
      ),
    );
  }, [actions?.comments?.count]);

  useEffect(()=>{
    const getFollowing = async()=>{
      const userDetails = await getDataLocally()
      try {
        const response = await apiCall?.getFollower(userDetails?.id)
        if (response) {
          // console.log('Following fetched successfully', response)
          setFollow(response?.some(f => f?.followingId === post?.userId))
        }
      } catch (error) {
        console.log("Error fetching following", error)
      }
    }
    getFollowing()
  },[])

  const handlePress = async icon => {
    const userDetails = await getDataLocally();
    switch (icon?.type) {
      case 'like':
        try {
          const isLiked = icon?.active;
          const body = isLiked
            ? {id: icon.id, status: false}
            : {
                userId: userDetails?.id,
                type: 'LIKE',
                postId: post?.id,
                status: true,
              };

          const response = await apiCall?.likePost(body);
          console.log('Post liked successfully', response);
          setIcons(prev =>
            prev.map(i => {
              if (i.type !== 'like') return i;

              return {
                ...i,
                active: !isLiked,
                id: isLiked ? undefined : response.id,
                count: isLiked ? i.count - 1 : i.count + 1,
              };
            }),
          );
          setActions(prev => ({
            ...prev,
            likes: {
              ...prev?.likes,
              count: isLiked ? prev?.likes?.count + 1 : prev?.likes?.count - 1,
              value: isLiked
                ? prev?.likes?.value?.filter(res => res?.id !== icon.id) // when unliking
                : [...prev?.likes?.value, response], // when liking
            },
          }));
        } catch (error) {
          console.error('Like error:', error);
          toast('error', 'Error processing like');
        }
        break;
      case 'comment':
        actions?.comments?.ref?.current?.focus();
      case 'save':
        // const albumIds?.find()
      default:
        break;
    }
  };

  const handleFollow = async () => {
    const userDetails = await getDataLocally();
    if (post?.userId === userDetails?.id) {
      toast('error', 'You cant follow yourself!');
    } else {
      try {
        const body = {
          followerId: userDetails?.id,
          followingId: post?.userId,
        };
        const response = await apiCall?.follow(body);
        if (response) {
          console.log('Followed successfully', response);
          setFollow(true)
        }
      } catch (error) {
        console.log('Error following', error);
        toast('error', 'Error following');
        setFollow(false)
      }
    }
  };
  return (
    <View style={styles?.container}>
      <LinearGradient
        colors={[colors?.RGB3, colors?.RGB4]}
        style={styles?.wrapper}>
        <BlurView style={styles.absolute} blurType="light" blurAmount={20} />
        {icons?.map((icon, index) => {
          return (
            <View key={index} style={styles?.iconContainer}>
              <TouchableOpacity
                style={styles?.iconButton}
                onPress={() => handlePress(icon)}>
                {icon?.active ? icon?.activeIcon : icon?.inactiveIcon}
              </TouchableOpacity>
              <Text style={styles?.iconText}>{icon?.count}</Text>
            </View>
          );
        })}
        {(post?.type === 'MEDIA' ||
          post?.type === 'MUSIC' ||
          post?.type === 'DOCUMENT'||
          post?.type === 'MOMMENTS'
        ) && (
          <TouchableOpacity style={styles?.pinkButton} onPress={handleFollow}>
            <Text style={styles?.pinkButtonText}>{follow ? `Followed` : `Follow`}</Text>
          </TouchableOpacity>
        )}
        {post?.type === 'EVENT' && (
          <TouchableOpacity style={styles?.pinkButton}>
            <Text style={styles?.pinkButtonText}>Attend</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
};

export default PostBottomTab;

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: Platform?.OS === 'android' && width * 0.02,
    borderBottomLeftRadius: width * 0.04,
    borderBottomRightRadius: width * 0.04,
    overflow: 'hidden',
    height: Platform?.OS === 'ios' && width * 0.12,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical : height * 0.003
  },
  iconButton: {
    padding: width * 0.01,
  },
  iconText: {
    fontFamily: fonts?.montserratRegular,
    fontSize: width * 0.03,
    color: colors?.white,
  },
  pinkButton: {
    backgroundColor: colors?.pink,
    borderRadius: width * 0.02,
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.04,
  },
  pinkButtonText: {
    color: colors?.white,
    fontFamily: fonts?.montserratSemiBold,
    fontSize: width * 0.035,
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
});
