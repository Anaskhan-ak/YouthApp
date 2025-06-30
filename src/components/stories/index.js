import InstagramStories from '@birdwingo/react-native-instagram-stories';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Plus } from '../../assets/images/svgs';
import { height, Pixels, width } from '../../constant';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

const avatarSize = width * 0.125;
const borderRadius = avatarSize / 2;

const Stories = ({stories}) => {
  const ref = useRef(null);
  const navigation = useNavigation();
  const renderAvatar = item => {
    const uri = item?.avatarSource?.uri;
    const avatarImage = <Image source={{uri}} style={styles.avatarImage} />;

    if (!item?.seen) {
      return (
        <LinearGradient
          colors={[colors?.RGB1 || '#478FE4', colors?.RGB2 || '#36AFD6']}
          style={styles.avatarGradient}>
          <View style={styles.avatarInner}>{avatarImage}</View>
        </LinearGradient>
      );
    }

    return <View style={styles.avatarPlain}>{avatarImage}</View>;
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles?.addStoryBorder}>
        <View
          onPress={() => navigation?.navigate('CreateStory')}
          style={styles.addStory}>
          <Plus width={width * 0.06} height={width * 0.06} />
        </View>
      </TouchableOpacity>
      <InstagramStories
        ref={ref}
        stories={stories}
        showName={true}
        avatarSize={avatarSize}
        avatarTextStyle={styles.avatarText}
        textStyle={styles.storyText}
        closeIconColor={colors?.white}
        animationDuration={3000}
        avatarListContainerStyle={styles.avatarListContainer}
        nameTextStyle={styles.nameTextStyle}
        avatarProps={{renderAvatar}}
        avatarBorderColors={[colors?.RGB1, colors?.RGB2]}
        avatarSeenBorderColors={[colors?.gray, colors?.gray]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addStoryBorder: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.15,
    backgroundColor: colors?.white,
    borderWidth: 3,
    borderColor: colors?.gray,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -height * 0.014,
  },
  addStory: {
    backgroundColor: colors?.ashGrey,
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop : -15
  },
  avatarText: {
    fontSize: 12,
  },
  storyText: {
    color: colors?.white,
  },
  avatarListContainer: {
    paddingHorizontal: 5,
    gap: 5,
  },
  nameTextStyle: {
    fontSize: Pixels(9),
    textAlign: 'center',
    fontFamily: fonts?.montserratMedium,
  },
  avatarGradient: {
    width: avatarSize,
    height: avatarSize,
    borderRadius,
    padding: 2,
  },
  avatarInner: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius,
    overflow: 'hidden',
  },
  avatarPlain: {
    width: avatarSize,
    height: avatarSize,
    borderRadius,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius,
  },
});

export default Stories;
