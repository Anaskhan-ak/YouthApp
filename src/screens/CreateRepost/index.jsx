import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CreateButton from '../../components/buttons/CreateButton';
import Drawer from '../../components/drawer';
import GradientHeader from '../../components/headers/gradientHeader';
import UserInfoHeader from '../../components/headers/userInfoHeader';
import MultilineInput from '../../components/inputs/multilineInput';
import DocumentPost from '../../components/post/subComponents/repost/documentPost';
import EventPost from '../../components/post/subComponents/repost/eventPost';
import MediaPost from '../../components/post/subComponents/repost/mediaPost';
import MomentPost from '../../components/post/subComponents/repost/momentPost';
import MusicPost from '../../components/post/subComponents/repost/musicPost';
import YudioPost from '../../components/post/subComponents/repost/yudioPost';
import UserPostHeader from '../../components/post/subComponents/userPostHeader';
import { toast } from '../../components/toast';
import { height, width } from '../../constant';
import { getDataLocally } from '../../helper';
import useUser from '../../hooks/user';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';

const CreateRepost = ({route}) => {
  const {post, setActions} = route?.params;
  const [description, setDescription] = useState('');
  const user = useUser();
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chars, setChars] = useState(0);
  const maxChars = 4000;
  const navigation= useNavigation()
  const [metaData, setMetaData] = useState({
    audience: {
      active: false,
      value: 'PUBLIC',
      ref: useRef(),
    },
    location: {
      active: false,
      value: 'Pakistan',
      ref: useRef(),
    },
    tagFriends: {
      active: false,
      value: [],
      ref: useRef(),
    },
  });

  const handleRepost = async () => {
    const userDetails = await getDataLocally();
    try {
      setLoading(true);
      const body = {
        userId: userDetails?.id,
        postId: post?.id,
        caption: description,
        location: 'Pakistan',
      };
      const response = await apiCall?.repost(body);
      if (response) {
        console.log('Successfully reposted', response);
        setActions(prev => ({
          ...prev,
          repost: {
            ...prev?.repost,
            count: prev?.repost?.count + 1,
          },
        }));
        setLoading(false);
        navigation?.navigate('Home')
      }
    } catch (error) {
      console.log('Error reposting', error);
      toast('error', 'Error reposting');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const renderPostContent = (
    post,
    // modalProps
  ) => {
    // console.log('Post', post);
    const postComponents = {
      MEDIA: MediaPost,
      MUSIC: MusicPost,
      YUDIO: YudioPost,
      EVENT: EventPost,
      DOCUMENT: DocumentPost,
      MOMMENTS: MomentPost,
    };

    const PostComponent = postComponents[post.type];
    return (
      <PostComponent
        post={post}
        // modal={modalProps}
        // isScrolling={isScrolling}
      />
    );
  };
  return (
    <View style={styles.contentContainer}>
      <GradientHeader title="Repost" backPress={() => navigation?.goBack()}/>
      <View style={styles?.userInfoHeader}>
        <UserInfoHeader
          userName={user?.name}
          image={user?.photo}
          data={metaData}
          setData={setMetaData}
        />
      </View>
      <ScrollView style={styles?.input}>
        <MultilineInput
          placeholder="Say something about this..."
          placeholderTextColor={colors?.gray}
          editable={true}
          multiline={true}
          numberOfLines={5}
          scrollEnabled={true}
          value={description}
          onChangeText={setDescription}
          postType={'post'}
          chars={chars}
          setChars={setChars}
          maxChars={maxChars}
        />
        <LinearGradient
          colors={[colors?.RGB4, colors?.RGB5]}
          style={styles?.post}>
          <UserPostHeader post={post} user={post?.user} />
          {renderPostContent(post)}
        </LinearGradient>
        {drawer && <Drawer />}
      </ScrollView>

      <CreateButton
        title="Repost"
        onPress={handleRepost}
        loader={
          loading ? (
            <ActivityIndicator size={'small'} color={colors?.RGB1} />
          ) : null
        }
      />
    </View>
  );
};

export default CreateRepost;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: colors?.white,
    // alignItems : "center",
  },
  userInfoHeader: {
    marginVertical: height * 0.01,
    alignSelf: 'center',
  },
  input: {
    margin: width * 0.04,
  },
  post: {
    // alignSelf : "center",
    marginTop: height * 0.02,
    padding: width * 0.04,
    borderRadius: width * 0.03,
  },
});
