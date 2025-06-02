import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import InboxHeader from '../../components/headers/chat/inbox';
import Post from '../../components/post';

const PostDetails = ({route}) => {
  const {post} = route?.params;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles?.container}>
      <InboxHeader title="Post" backPress={() => navigation?.goBack()} />
      <ScrollView>
        <Post post={post} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems : "flex-start"
  },
});
