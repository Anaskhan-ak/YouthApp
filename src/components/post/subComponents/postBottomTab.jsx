import { BlurView } from '@react-native-community/blur';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ActiveComment, ActiveLike, ActiveRepost, ActiveSave, ActiveShare, InactiveComment, InactiveLike, InactiveRepost, InactiveSave, InactiveShare } from '../../../assets/images/svgs';
import { width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const PostBottomTab = ({post}) => {
  const [icons, setIcons] = useState([
    {
      type: 'like',
      active: false,
      count: 0,
      activeIcon: <ActiveLike width={width * 0.065} height={width * 0.065}/>,
      inactiveIcon: <InactiveLike width={width * 0.065} height={width * 0.065}/>,
    },
    {
      type: 'comment',
      active: false,
      count: 0,
      activeIcon: <ActiveComment width={width * 0.065} height={width * 0.065}/>,
      inactiveIcon: <InactiveComment width={width * 0.065} height={width * 0.065}/>,
    },
    {
      type: 'save',
      active: false,
      count: 0,
      activeIcon: <ActiveSave width={width * 0.065} height={width * 0.065}/>,
      inactiveIcon: <InactiveSave width={width * 0.065} height={width * 0.065}/>,
    },
    {
      type: 'repost',
      active: false,
      count: 0,
      activeIcon: <ActiveRepost width={width * 0.065} height={width * 0.065}/>,
      inactiveIcon: <InactiveRepost width={width * 0.065} height={width * 0.065}/>,
    },
    {
      type: 'share',
      active: false,
      count: 0,
      activeIcon: <ActiveShare width={width * 0.065} height={width * 0.065}/>,
      inactiveIcon: <InactiveShare width={width * 0.065} height={width * 0.065}/>,
    },
  ]);
  return (
    <View style={styles?.container}>
      <LinearGradient colors={[colors?.RGB3, colors?.RGB4]} style={styles?.wrapper}>
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={20}
        />
        {icons?.map((icon, index) => {
          return (
            <View key={index} style={styles?.iconContainer}>
              <TouchableOpacity style={styles?.iconButton}>
                {icon?.active ? icon?.activeIcon : icon?.inactiveIcon}
              </TouchableOpacity>
              <Text style={styles?.iconText}>{icon?.count}</Text>
            </View>
          );
        })}
        {post?.type === 'MEDIA' && (
          <TouchableOpacity style={styles?.pinkButton}>
            <Text style={styles?.pinkButtonText}>Follow</Text>
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
    padding: width * 0.02,
    borderBottomLeftRadius: width * 0.04,
    borderBottomRightRadius: width * 0.04,
    overflow: 'hidden',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
