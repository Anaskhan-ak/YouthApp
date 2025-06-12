import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { width } from '../../../../constant';

const MediaPosts = ({posts}) => {
    const navigation = useNavigation()
  return (
    <View style={styles?.container}>
      <FlatList
        data={posts}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => navigation?.navigate('PostDetails', {post:item})}>
              <Image source={{uri : item?.media?.url[0]}} style={styles?.image} />
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
