import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../../../../assets/images';
import { PlayIcon } from '../../../../assets/images/svgs';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';

const MomentPosts = () => {
  const data = [
    {
      user: {
        firstName: 'Sannya',
        lastName: 'Wasim',
        photo: images?.onboarding1,
      },
      type: 'MOMMENT',
      likes: [
        {
          firstName: 'Sannya',
          lastName: 'Wasim',
          photo: images?.onboarding1,
        },
        {
          firstName: 'Sannya',
          lastName: 'Wasim',
          photo: images?.onboarding1,
        },
        {
          firstName: 'Sannya',
          lastName: 'Wasim',
          photo: images?.onboarding1,
        },
        {
          firstName: 'Sannya',
          lastName: 'Wasim',
          photo: images?.onboarding1,
        },
        {
          firstName: 'Sannya',
          lastName: 'Wasim',
          photo: images?.onboarding1,
        },
        {
          firstName: 'Sannya',
          lastName: 'Wasim',
          photo: images?.onboarding1,
        },
        {
          firstName: 'Sannya',
          lastName: 'Wasim',
          photo: images?.onboarding1,
        },
      ],
      comments: [
        {
          firstName: 'Sannya',
          lastName: 'Wasim',
          photo: images?.onboarding1,
          text: 'Lovely 😘😍 I’ve enjoyed the day too With @Haya & @Battamostafffa',
        },
        {
          firstName: 'Sannya',
          lastName: 'Wasim',
          photo: images?.onboarding1,
          text: 'Lovely 😘😍 I’ve enjoyed the day too With @Haya & @Battamostafffa',
        },
        {
          firstName: 'Sannya',
          lastName: 'Wasim',
          photo: images?.onboarding1,
          text: 'Lovely 😘😍 I’ve enjoyed the day too With @Haya & @Battamostafffa',
        },
        {
          firstName: 'Sannya',
          lastName: 'Wasim',
          photo: images?.onboarding1,
          text: 'Lovely 😘😍 I’ve enjoyed the day too With @Haya & @Battamostafffa',
        },
        {
          firstName: 'Sannya',
          lastName: 'Wasim',
          photo: images?.onboarding1,
          text: 'Lovely 😘😍 I’ve enjoyed the day too With @Haya & @Battamostafffa',
        },
        {
          firstName: 'Sannya',
          lastName: 'Wasim',
          photo: images?.onboarding1,
          text: 'Lovely 😘😍 I’ve enjoyed the day too With @Haya & @Battamostafffa',
        },
        {
          firstName: 'Sannya',
          lastName: 'Wasim',
          photo: images?.onboarding1,
          text: 'Lovely 😘😍 I’ve enjoyed the day too With @Haya & @Battamostafffa',
        },
      ],
      share: 10,
      repost: 10,
      Momment: {
        url: require('../../../../assets/video/video.mp4'),
        thumbnail : images?.onboarding1
      },
    },
  ];
  return (
    <View style={styles?.container}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity>
              <Image source={item?.Momment?.thumbnail} style={styles?.thumbnail} />
              <View style={styles?.footer}>
                <PlayIcon width={width * 0.025} height={width * 0.025} />
                <Text style={styles?.iconText}>375K</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        numColumns={3}
        style={styles?.list}
      />
    </View>
  );
};

export default MomentPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbnail: {
    margin: width * 0.005,
    borderRadius: width * 0.02,
    width: width * 0.32,
    height: height * 0.22,
  },
  list : {
    marginVertical : height * 0.005
  },
  footer : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'flex-start',
    position : 'absolute',
    bottom : width * 0.02,
    left : width * 0.02
  },
iconText : {
    fontFamily : fonts?.montserratBold,
    fontSize : width * 0.025,
    color : colors?.white
}
});
