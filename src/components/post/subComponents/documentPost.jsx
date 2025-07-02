import { BlurView } from '@react-native-community/blur';
import {
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import { InactiveDownload } from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import PostBottomTab from './postBottomTab';

const DocumentPost = ({post, modal}) => {
  const requestStoragePermission = async () => {
    const request = async () => {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to storage to download files',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    };

    let granted = await request();

    // Retry once if not granted
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.warn('Permission denied, retrying...');
      granted = await request();
    }

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const handleDownload = async () => {
    const url = post?.documents?.url;

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
        const isGranted = await requestStoragePermission();
        if (!isGranted) {
          throw new Error('Storage permission denied after retry');
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
    }
  };

  return (
    <View style={styles?.container}>
      <TouchableOpacity
        onLongPress={() => modal?.setModal(prev => ({...prev, isPost: true}))}>
        <ImageBackground
          source={{uri: post?.documents?.thumbnail}}
          style={styles?.player}>
          <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
          <TouchableOpacity
            style={styles?.downloadIcon}
            onPress={handleDownload}>
            <InactiveDownload />
          </TouchableOpacity>
          <Image
            source={{uri: post?.documents?.thumbnail}}
            style={styles?.thumbnail}
          />
        </ImageBackground>
      </TouchableOpacity>
      {!modal?.modal?.isPost && (
        <View style={styles?.reactionsTab}>
          <PostBottomTab post={post} />
        </View>
      )}
    </View>
  );
};

export default DocumentPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  player: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: width * 0.02,
    borderRadius: width * 0.04,
    width: width * 0.89,
    height: height * 0.25,
    overflow: 'hidden',
  },
  reactionsTab: {
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
    width: width * 0.89,
    alignSelf: 'center',
  },
  likes: {
    margin: height * 0.01,
  },
  comments: {
    // backgroundColor : 'red'
  },
  thumbnail: {
    width: width * 0.3,
    height: height * 0.2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginLeft: width * 0.02,
  },
  heading: {
    fontFamily: fonts?.montserratExtraBold,
    fontSize: width * 0.037,
    color: colors?.text,
  },
  subHeading: {
    fontFamily: fonts?.montserratRegular,
    fontSize: width * 0.03,
    color: colors?.text,
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
  downloadIcon: {
    position: 'absolute',
    zIndex: 100,
    right: width * 0.03,
    top: height * 0.012,
  },
});
