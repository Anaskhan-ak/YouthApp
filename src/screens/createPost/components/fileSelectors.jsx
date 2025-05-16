import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FileIcon, FileMicIcon } from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const FileSelectorButtons = ({
  type,
  onPickFile,
  media,
  thumbnail,
  pickFiles,
}) => {
  const navigation = useNavigation();
  // console.log("Thumbnail", thumbnail)
  if (type === 'audios' && !(media?.some(m => m?.type === 'audio/mpeg') && thumbnail)) {
    return (
      <View style={styles?.container}>
        <TouchableOpacity
          style={styles?.button}
          onPress={() => onPickFile('audio')}>
          <FileIcon />
          <Text style={styles?.text}>
            {media?.length === 0
              ? 'Select from Files'
              : media[0]?.name?.length > 40
              ? `${media[0]?.name?.slice(0, 40)}...`
              : `${media[0]?.name}`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles?.button}
          onPress={() => pickFiles('thumbnail')}>
          <FileIcon />
          <Text style={styles?.text}>
            {thumbnail === null
              ? 'Select Thumbnail'
              : thumbnail?.name?.length > 40
              ? `${thumbnail?.name?.slice(0, 40)}...`
              : `${thumbnail?.name}`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles?.button}
          onPress={() => navigation?.navigate('CreateYudio')}>
          <FileMicIcon width={width * 0.05} height={width * 0.05} />
          <Text style={styles?.text}>Record new Yudio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (type === 'files') {
    return (
      <View style={styles?.container}>
        <TouchableOpacity
          style={styles?.button}
          onPress={() => onPickFile('file')}>
          <FileIcon />
          <Text style={styles?.text}>Select from Files</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles?.button}
          onPress={() => onPickFile('thumbnail')}>
          <FileIcon />
          <Text style={styles?.text}>Select Thumbnail</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

export default FileSelectorButtons;

const styles = StyleSheet.create({
  container: {
    marginVertical: height * 0.005,
  },
  button: {
    backgroundColor: colors?.greyBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: width * 0.025,
    marginVertical: height * 0.003,
    borderRadius: width * 0.02,
  },
  text: {
    marginLeft: width * 0.02,
    fontFamily: fonts?.montserratSemiBold,
  },
});
