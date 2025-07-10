import { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import {
  OutlineBlockIcon,
  OutlineCloudDOwnloadIcon,
  OutlineFollowIcon,
  OutlineHeartbreakIcon,
  OutlineHeartIcon,
} from '../../../assets/images/svgs';
import { toast } from '../../../components/toast';
import { height, Pixels, width } from '../../../constant';
import useUser from '../../../hooks/user';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const PostModal = ({post, modal, setModal}) => {
  const [following, setFollowing] = useState([]);
  const user = useUser();
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const page = 1;
        const limit = 20;
        const response = await apiCall?.getFollowing(page, limit);
        if (response) {
          console.log('Following fetched successfully', response?.results);
          setFollowing(response?.results);
        }
      } catch (error) {
        console.log('Error fetching following', error);
      }
    };
    getFollowing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = async () => {
    const url = post?.media?.url[0];

    // Get file extension from URL or default to png
    const fileExt = url.split('.').pop() || 'png';
    const fileName = `DownloadImage_${Date.now()}.${fileExt}`;

    // For Android, we'll use Download directory
    // For iOS, we'll use DocumentDirectory
    const downloadDir = Platform.select({
      ios: RNFS.DocumentDirectoryPath,
      android: RNFS.DownloadDirectoryPath,
    });

    const path = `${downloadDir}/${fileName}`;

    try {
      // On Android, request permission first
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to storage to download files',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error('Storage permission denied');
        }
      }

      const options = {
        fromUrl: url,
        toFile: path,
        background: true, // Enable background download (iOS only)
        begin: res => {
          console.log('Download started', res);
        },
        progress: res => {
          const progress = (res.bytesWritten / res.contentLength) * 100;
          console.log(`Download progress: ${progress.toFixed(2)}%`);
        },
      };

      const download = RNFS.downloadFile(options);

      await download.promise;
      console.log('Media downloaded successfully!', path);
      toast('success', 'Media downloaded successfully!');

      // On Android, scan the file to make it visible in gallery/downloads
      if (Platform.OS === 'android') {
        try {
          await RNFS.scanFile(path);
          console.log('File scanned successfully');
        } catch (scanError) {
          console.log('File scan error:', scanError);
        }
      }
    } catch (error) {
      console.log('Download failed:', error);
      toast('error', 'Failed to download media', error);
    } finally {
      setModal(prev => ({...prev, visible: false}));
    }
  };

  const handleFollow = async () => {
    try {
      const body = {
        followerId: post?.userId,
        followingId: user?.id,
      };
      const isAlreadyFollowing = following?.find(
        f => f.id === post?.userId,
      )?.isFollowing;
      if (isAlreadyFollowing) {
        const response = await apiCall?.unfollow(body);
        console.log('Unfollowed successfully',response);
        setFollowing(prev =>
          prev?.map(follow => ({...follow, isFollowing: false})),
        );
      } else {
        const response = await apiCall?.follow(body);
        console.log('Followed successfully',response);
        setFollowing(prev =>
          prev?.map(follow => ({...follow, isFollowing: true})),
        );
      }
    } catch (error) {
      console.log('Error following/unfollwoing', error);
    }
  };


  const actions = [
    {
      type: 'follow',
      title: following?.find(f => f.id === post?.userId)?.isFollowing
        ? `Following ${post?.user?.firstName} ${post?.user?.lastName}`
        : `Follow ${post?.user?.firstName} ${post?.user?.lastName}`,
      icon: <OutlineFollowIcon />,
      func: handleFollow,
    },
    {
      type: 'block',
      title: `Block ${post?.user?.firstName} ${post?.user?.lastName}`,
      icon: <OutlineBlockIcon />,
    },
    {
      type: 'love',
      title: 'Love it, show me more',
      icon: <OutlineHeartIcon />,
    },
    {
      type: 'limit',
      title: "Don't show me similar content",
      icon: <OutlineHeartbreakIcon />,
    },
    {
      type: 'download',
      title: 'Download Media',
      icon: <OutlineCloudDOwnloadIcon />,
      func: handleDownload,
    },
  ];
  return (
    <View style={styles?.container}>
      {actions?.map((action, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={action?.func}
            style={[
              styles?.button,
              index === 0 && {
                borderTopLeftRadius: width * 0.03,
                borderTopRightRadius: width * 0.03,
              },
              index === actions?.length - 1 && {
                borderBottomLeftRadius: width * 0.03,
                borderBottomRightRadius: width * 0.03,
              },
              {
                width: modal?.modal?.isPost ? width * 0.87 : width * 0.7,
              },
            ]}>
            <Text style={styles?.text}>{action?.title}</Text>
            {action?.icon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default PostModal;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // transform : [{scale : 0.8}],
    margin: width * 0.02,
  },
  button: {
    margin: height * 0.001,
    padding: width * 0.03,
    backgroundColor: `${colors?.white}CC`,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: fonts?.montserratMedium,
    fontSize: Pixels(12),
    color: colors?.gray13,
  },
});
