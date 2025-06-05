import { useNavigation } from '@react-navigation/native';
import {
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { images } from '../../../../assets/images';
import { width } from '../../../../constant';

const MediaPosts = () => {
    const navigation = useNavigation()
  const data = [
    {
      user: {
        firstName: 'Sannya',
        lastName: 'Wasim',
        photo: images?.onboarding1,
      },
      type: 'MEDIA',
      media: [images?.onboarding1, images?.onboarding1, images?.onboarding1],
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
    },
  ];
  return (
    <View style={styles?.container}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => navigation?.navigate('PostDetails', {post:item})}>
              <Image source={item?.media[0]} style={styles?.image} />
            </TouchableOpacity>
          );
        }}
        numColumns={3}
      />
    </View>
  );
};

export default MediaPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image : {
    margin : width * 0.01,
    width : width * 0.31,
    height : width * 0.28,
    borderRadius : width * 0.01
  }
});
