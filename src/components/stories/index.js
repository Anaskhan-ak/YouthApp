import React, {useRef} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import InstagramStories from '@birdwingo/react-native-instagram-stories';
import {colors} from '../../utils/colors';
import {Pixels, width} from '../../constant';
import {Plus} from '../../assets/images/svgs';
import {fonts} from '../../utils/fonts';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const avatarSize = width * 0.125;
const borderRadius = avatarSize / 2;

const Stories = ({stories}) => {
  const ref = useRef(null);
  const navigation = useNavigation()
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
      <TouchableOpacity onPress={()=>navigation?.navigate('CreateStory')} style={styles.addStory}>
        <Plus width={width * 0.06} height={width * 0.06} />
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
    justifyContent:"center"
  },
  addStory: {
    width: width * 0.155,
    height: width * 0.155,
    backgroundColor: colors?.ashGrey,
    borderRadius: width * 0.155,
    alignItems: 'center',
    justifyContent: 'center',
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
