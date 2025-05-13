import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { FileIcon, PlayIcon } from '../../../assets/images/svgs';
import EmptyComponent from '../../../components/empty';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const Gallery = ({media, setMedia}) => {
  const [galleryImages, setGalleryImages] = useState([]);
  useEffect(() => {
    async function fetchPhotos() {
      // if (Platform.OS === 'android') {
      //   const permissions = [
      //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      //     PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      //     PermissionsAndroid.PERMISSIONS.CAMERA,
      //   ];

      //   if (Platform.Version >= 33) {
      //     permissions.push(
      //       PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      //       PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      //     );
      //   }

      //   const granted = await PermissionsAndroid.requestMultiple(permissions);

      //   const allGranted = Object.values(granted).every(
      //     permission => permission === PermissionsAndroid.RESULTS.GRANTED,
      //   );

      //   if (!allGranted) {
      //     console.warn('Permissions denied');
      //     return;
      //   }
      // }

      try {
        const result = await CameraRoll.getPhotos({
          first: 32, // Fetch only 32 photos
          assetType: 'All', // Fetch all types of assets
        });

        // Map the photos list and set them in the state
        setGalleryImages(
          result.edges.map(edge => ({...edge, isSelected: false})),
        );
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    }

    fetchPhotos();
  }, []);

  const openImagePicker = () => {
    const options = {
      mediaType: 'mixed',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setMedia(imageUri);
      }
    });
  };

  const toggleSelectPhoto = (id, type) => {
    setGalleryImages(prevState =>
      prevState.map(photo => {
        if (photo.node.id === id) {
          const isSelected = !photo.isSelected;
          const uri = photo.node.image.uri;

          setMedia(prev => {
            if (isSelected) {
              return [...prev, {uri, type, isSelected: true}];
            } else {
              return prev.filter(media => media.uri !== uri);
            }
          });

          return {
            ...photo,
            isSelected,
          };
        }
        return photo;
      }),
    );
  };

  const renderItem = ({item, index}) => {
    const selectedIndex = media.findIndex((arrItem, i) => {
      return arrItem?.uri === item?.node?.image?.uri;
    });
    return (
      <View style={styles.imageContainer}>
        {item.node.type.includes('video') && (
          <LinearGradient
            colors={[colors?.RGB1, colors?.RGB2]}
            style={[styles?.icon, {left: width * 0.02}]}>
            <PlayIcon width={width * 0.02} height={width * 0.02} />
          </LinearGradient>
        )}
        <TouchableOpacity
          onPress={() => toggleSelectPhoto(item.node.id, item.node.type)}>
          {item?.isSelected && (
            <View
              style={[
                styles?.icon,
                {backgroundColor: colors?.red, right: width * 0.02},
              ]}>
              <Text style={styles?.selectedText}>{selectedIndex + 1}</Text>
            </View>
          )}
          <Image
            source={{uri: item.node.image.uri}}
            style={styles.image} // You already have this style defined
          />
        </TouchableOpacity>
      </View>
    );
  };

  const FooterComponent = () => (
    <TouchableOpacity style={styles.footerButton} onPress={openImagePicker}>
      <FileIcon />
      <Text style={styles?.footerText}>Fetch more from gallery</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={galleryImages}
      renderItem={renderItem}
      numColumns={4}
      keyExtractor={item => item.node.id}
      ListEmptyComponent={<EmptyComponent text="Fetching images..." />}
      ListFooterComponent={<FooterComponent />}
      contentContainerStyle={styles?.listContainer}
      style={styles?.list}
    />
  );
};

export default Gallery;

const styles = StyleSheet.create({
  list: {
    height: height * 0.3,
  },
  listContainer: {
    paddingBottom: height * 0.1,
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
  image: {
    width: width * 0.24,
    height: width * 0.24,
    margin: width * 0.005,
  },
  icon: {
    width: width * 0.04,
    height: width * 0.04,
    position: 'absolute',
    top: width * 0.02,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.04,
  },
  selectedText: {
    color: colors?.white,
    fontSize: width * 0.02,
    fontFamily: fonts?.montserratBold,
  },
});
