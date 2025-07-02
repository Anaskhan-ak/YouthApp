import { BlurView } from '@react-native-community/blur';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Cross } from '../../../assets/images/svgs';
import YudioPlayer from '../../../components/audio/YudioPlayer';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const MediaUploader = ({media, thumbnail, setMedia, setThumbnail}) => {
  console.log("media",media)
  if (media) {
    if (
      media?.some(m => m?.type === 'video/mp4') ||
      media?.some(m => m.type === 'image/jpeg') ||
      media?.some(m => m.type === 'image') ||
      media?.some(m => m?.type === 'video') ||
      media?.some(m => m.type === 'image/png')
    ) {
      return (
        <FlatList
          data={media}
          renderItem={({item}) => (
            <View style={{position: 'relative'}}>
              <TouchableOpacity
                style={styles.cancelImage}
                onPress={() =>
                  setMedia(prev => prev.filter(media => media.uri !== item.uri))
                }>
                <Cross width={width * 0.02} height={width * 0.02} />
              </TouchableOpacity>
              <Image source={{uri: item?.uri}} style={styles.mediaImage} />
            </View>
          )}
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    } else if (
      (media?.some(m => m?.type === 'audio/mpeg') && thumbnail) || // music file selected
      media?.some(m => m?.type === 'audio/wav') //yudio file selected
    ) {
      return (
        <View style={styles?.audioPlayerContainer}>
          <TouchableOpacity
            style={styles.cancelImage}
            onPress={() => {
              setMedia([]);
              setThumbnail(null);
            }}>
            <Cross width={width * 0.02} height={width * 0.02} />
          </TouchableOpacity>
          <YudioPlayer
            audio={{
              uri: media[0]?.uri,
              type: media[0]?.type,
              name: media[0]?.name ? media[0]?.name : 'audio.wav',
            }}
          />
        </View>
      );
    } else {
      if (
        (media?.some(m => m?.mediaType === 'FILE') && thumbnail) ||
        media?.some(m => m.postType === 'DOCUMENT')
      ) {
        return (
          <View style={styles?.documentContainer}>
            <ImageBackground
              style={styles?.thumbnailBackground}
              source={
                thumbnail ? {uri: thumbnail?.uri} : {uri: media[0]?.thumbnail}
              }>
              <BlurView
                style={styles?.blur}
                blurType="light"
                blurAmount={1}
                reducedTransparencyFallbackColor="white"
              />
              <TouchableOpacity
                style={styles.cancelImage}
                onPress={() => {
                  setMedia([]);
                  setThumbnail(null);
                }}>
                <Cross width={width * 0.02} height={width * 0.02} />
              </TouchableOpacity>
              <Image
                source={
                  thumbnail ? {uri: thumbnail?.uri} : {uri: media[0]?.thumbnail}
                }
                style={styles?.thumbnailImage}
              />
            </ImageBackground>
            <View style={styles?.documentText}>
              <Text style={styles?.documentName}>
                {media[0]?.name.slice(0, 15).split('.')}
              </Text>
              <Text style={styles?.documentType}>
                {media[0]?.type?.split('/').pop().toUpperCase()}
              </Text>
            </View>
          </View>
        );
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
};

export default MediaUploader;

const styles = StyleSheet.create({
  mediaImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  mediaImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.01,
    margin: width * 0.01,
  },
  cancelImage: {
    backgroundColor: colors?.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: width * 0.02,
    right: width * 0.02,
    padding: width * 0.008,
    borderRadius: width * 0.03,
    zIndex: 10,
  },

  audioPlayerContainer: {
    marginVertical: height * 0.01,
  },
  documentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width * 0.935,
    marginTop : height * 0.02
  },
  thumbnailBackground: {
    width: width * 0.4,
    height: height * 0.15,
    borderRadius: width * 0.03,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  thumbnailImage: {
    width: width * 0.2,
    height: height * 0.15,
    overflow: 'hidden',
    resizeMode: 'stretch',
  },
  documentText: {
    marginLeft: width * 0.02,
  },
  documentName: {
    fontSize: width * 0.038,
    fontFamily: fonts?.montserratSemiBold,
    color: colors?.text,
  },
  documentType: {
    fontSize: width * 0.035,
    fontFamily: fonts?.montserratRegular,
    color: colors?.textGray,
  },
});
