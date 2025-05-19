import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import {
  BlackMultipleSelection,
  FileIcon,
  WhiteCameraIcon,
} from '../../../assets/images/svgs';
import GradientHeader from '../../../components/headers/gradientHeader';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const Gallery = ({media, setMedia}) => {
  const navigation = useNavigation();
  const [galleryImages, setGalleryImages] = useState([]);
  const [openCamera, setOpenCamera] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const device = useCameraDevice('front');
  const cameraRef = useRef();
  useEffect(() => {
    async function fetchPhotos() {
      try {
        const result = await CameraRoll.getPhotos({
          first: 32, // Fetch only 32 photos
          assetType: 'All', // Fetch all types of assets
        });
        // console.log('result', result)
        // Map the photos list and set them in the state
        setGalleryImages([
          {type: 'custom'},
          ...result.edges.map(edge => ({...edge, isSelected: false})),
        ]);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    }

    fetchPhotos();
  }, []);

  const HeaderComponent = () => {
    return (
      <View style={styles?.headerContainer}>
        <Text style={styles?.headerText}>Gallery</Text>
        <BlackMultipleSelection />
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={index === 0 && styles?.button}
        onPress={() => {
          if (index === 0) {
            setOpenCamera(true);
          } else {
            setMedia({
              uri: item?.node?.image?.uri,
              name: `${item?.node?.id}.${item?.node?.type?.split('/')?.pop()}`,
              type: item?.node?.type,
            });
          }
        }}>
        {index === 0 ? (
          <WhiteCameraIcon />
        ) : (
          <>
            <View
              style={[
                styles.selectToggle,
                media?.uri === item?.node?.image?.uri && {
                  backgroundColor: colors?.RGB1,
                },
              ]}
            />
            <Image source={{uri: item.node.image.uri}} style={styles?.image} />
          </>
        )}
      </TouchableOpacity>
    );
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'mixed',
      includeBase64: false,
      selectionLimit: 1,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } else if (response.assets?.length) {
        const newMedia = response?.assets?.map(asset => ({
          uri: asset.uri,
          type: asset.type,
          isSelected: true,
        }));
        setMedia(newMedia);
      }
    });
  };

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePhoto();
    setMedia({
      uri: `file://${photo?.path}`,
      type: 'image/jpeg',
      name : 'image.jpeg'
    });
  };

  const takeVideo = () => {
    setIsRecording(true);
    cameraRef.current?.startRecording({
      onRecordingFinished: video => {
        setMedia(
          {
            uri: `file://${video?.path}`,
            type: 'video/mp4',
            name : 'video.mp4'
          }
        );
        console.log(video.path);
        setIsRecording(false);
      },
      onRecordingError: error => console.error(error),
    });
  };

  const stopVideo = async () => {
    await cameraRef.current?.stopRecording();
    setIsRecording(false);
  };

  const FooterComponent = () => (
    <TouchableOpacity style={styles.footerButton} onPress={openImagePicker}>
      <FileIcon />
      <Text style={styles?.footerText}>Fetch more from gallery</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles?.container}>
      {openCamera ? (
        <GradientHeader backPress={() => setOpenCamera(false)} />
      ) : (
        <GradientHeader
          title="New Story"
          backPress={() => navigation?.goBack()}
        />
      )}
      {openCamera ? (
        <>
          <Camera
            ref={cameraRef}
            device={device}
            style={styles?.camera}
            isActive={true}
            photo={true}
            audio={true}
            video={true}
          />
          <TouchableOpacity
            onPress={takePhoto}
            style={[
              styles?.cameraButton,
              {backgroundColor: isRecording ? colors?.RGB1 : colors?.pink},
            ]}
            onLongPress={takeVideo}
            onPressOut={stopVideo}
          />
        </>
      ) : (
        <FlatList
          data={galleryImages}
          renderItem={renderItem}
          ListHeaderComponent={<HeaderComponent />}
          ListFooterComponent={<FooterComponent />}
          style={styles?.list}
          contentContainerStyle={styles?.listContent}
          numColumns={3}
        />
      )}
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  container: {flex: 1},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  headerText: {
    fontSize: width * 0.045,
    fontFamily: fonts?.montserratBold,
  },
  image: {
    width: width * 0.3,
    height: height * 0.18,
    borderRadius: width * 0.01,
    margin: width * 0.01,
  },
  list: {
    padding: width * 0.03,
  },
  listContent: {
    // marginTop : height * 0.01
    paddingBottom: height * 0.13,
  },
  button: {
    width: width * 0.3,
    height: height * 0.18,
    borderRadius: width * 0.01,
    margin: width * 0.01,
    backgroundColor: colors?.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButton: {
    backgroundColor: colors?.gray,
    borderRadius: width * 0.01,
    padding: width * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: width * 0.03,
  },
  footerText: {
    color: colors?.text,
    fontFamily: fonts?.montserratSemiBold,
    marginLeft: width * 0.02,
  },
  selectToggle: {
    width: width * 0.03,
    height: width * 0.03,
    borderRadius: width * 0.03,
    position: 'absolute',
    zIndex: 10,
    top: width * 0.02,
    right: width * 0.02,
    backgroundColor: colors?.white,
  },
  camera: {
    width: width * 0.95,
    height: height * 0.78,
    alignSelf: 'center',
    marginTop: height * 0.02,
    borderRadius: width * 0.02,
  },
  cameraButton: {
    width: width * 0.15,
    height: width * 0.15,
    borderWidth: width * 0.01,
    borderColor: colors?.white,
    borderRadius: width * 0.15,
    position: 'absolute',
    zIndex: 10,
    bottom: height * 0.15,
    alignSelf: 'center',
  },
});
