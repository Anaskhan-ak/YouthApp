import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import CreateButton from '../../../components/buttons/CreateButton';
import Drawer from '../../../components/drawer';
import GradientHeader from '../../../components/headers/gradientHeader';
import UserInfoHeader from '../../../components/headers/userInfoHeader';
import MultilineInput from '../../../components/inputs/multilineInput';
import { toast } from '../../../components/toast';
import { height, width } from '../../../constant';
import useUser from '../../../hooks/user';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';

const MomentDetails = ({setCameraOpen, url}) => {
  const user = useUser();
  const [description, setDescription] = useState('');
  const [chars, setChars] = useState(0);
  const [loading, setLoading] = useState(false);
  const maxChars = 350;
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

  const createMoment = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('type', 'MOMMENTS');
      formData.append('caption', description);
      formData.append('isPublic', true);
      formData.append('audience', metaData?.audience?.value);
      formData.append('location', metaData?.location?.value);
      if (
        metaData?.tagFriends?.value &&
        metaData?.tagFriends?.value?.filter(
          item => item !== undefined && item !== '',
        ).length > 0
      ) {
        formData.append(
          'Tag',
          JSON.stringify(
            metaData?.tagFriends?.value?.filter(
              item => item !== undefined && item !== '',
            ),
          ),
        );
      }
      formData.append('media', {
        uri: `file://${url}`,
        type: 'video/quicktime', // Use 'video/quicktime' for MOV files
        name: `${Date.now()}.mov`,
      });
      console.log("url", url)
      console.log("formData", formData)
      const response = await apiCall?.createNewPost(formData);
      if (response) {
        console.log('::moment created successfully::', response);
        setLoading(false);
        toast('success', 'Moment Created Successfully');
      }
    } catch (error) {
      console.log('::moment creation failed::', error);
      toast('error', 'Moment Creation Failed');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles?.container}>
      <GradientHeader
        backPress={() => setCameraOpen(true)}
        title="New Moment"
      />
      <View style={styles?.padding}>
        <UserInfoHeader
          image={user?.photo}
          userName={`${user?.firstName} ${user?.lastName}`}
          data={metaData}
          setData={setMetaData}
        />
        <View style={styles?.content}>
          <MultilineInput
            placeholder="Say something about this..."
            placeholderTextColor={colors?.gray}
            editable={true}
            multiline={true}
            numberOfLines={5}
            scrollEnabled={true}
            value={description}
            onChangeText={setDescription}
            chars={chars}
            setChars={setChars}
            maxChars={maxChars}
            postType={'post'}
          />
          <Video source={{uri: url}} style={styles?.thumbnail} />
        </View>
        <Drawer />
      </View>
      <CreateButton title="Create New Moment" onPress={createMoment} />
    </View>
  );
};

export default MomentDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.white,
    flex: 1,
    // alignItems : 'center'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: width * 0.03,
  },
  thumbnail: {
    width: width * 0.7,
    height: height * 0.18,
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.01,
    flex: 0.8,
    borderRadius: width * 0.02,
    overflow: 'hidden',
  },
  padding: {
    padding: width * 0.03,
  },
});
