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
import { height, width } from '../../../constant';
import { getDataLocally } from '../../../helper';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const PostModal = ({post, modal, setModal}) => {
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    const getFollowing = async () => {
      const userDetails = await getDataLocally();
      try {
        const response = await apiCall?.getFollower(userDetails?.id);
        if (response) {
          setFollowing(response?.some(f => f?.followingId === post?.userId));
        }
      } catch (error) {
        console.log('Error fetching following', error);
      }
    };
    getFollowing();
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

  const actions = [
    {
      type: 'follow',
      title: following
        ? `Following ${post?.user?.firstName} ${post?.user?.lastName}`
        : `Follow ${post?.user?.firstName} ${post?.user?.lastName}`,
      icon: <OutlineFollowIcon />,
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
  },
  button: {
    margin: height * 0.001,
    padding: width * 0.03,
    backgroundColor: `${colors?.white}CC`,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.87,
  },
  text: {
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.038,
    color: colors?.gray13,
  },
});
