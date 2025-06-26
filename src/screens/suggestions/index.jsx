import {useNavigation} from '@react-navigation/native';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import {InactiveLike, Plus} from '../../assets/images/svgs';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import InboxHeader from '../../components/headers/chat/inbox';
import UserPostHeader from '../../components/post/subComponents/userPostHeader';
import {height, Pixels, width} from '../../constant';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {images} from '../../assets/images';
import {useEffect, useState} from 'react';
import {apiCall} from '../../services/apiCall';
import {ActivityIndicator} from 'react-native';
import {toast} from '../../components/toast';
import {getDataLocally} from '../../helper';

const SuggestedContent = ({route}) => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState([]);
  const {headerTitle, type} = route?.params;
  const navigation = useNavigation();
  const getUsers = async () => {
    try {
      setLoader(true);
      const response = await apiCall?.getAllUsers({
        page: 1,
        pageSize: 100,
      });
      setUsers(response);
    } catch (e) {
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const toggleFollow = async followingId => {
    try {
      const user = await getDataLocally();
      const response = await apiCall?.follow({
        followerId: user?.id,
        followingId: followingId,
      });
      toast('success', 'follow request successfully');
    } catch (error) {
      console.error('Error toggling follow state:', error);
    }
  };
  return (
    <View style={styles?.container}>
      <InboxHeader title={headerTitle} backPress={() => navigation?.goBack()} />
      {loader ? (
        <View style={styles?.activityContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : users?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={users}
          renderItem={({item, index}) => {
            if (type === 'users') {
              return (
                <View style={styles?.card} key={index}>
                  <Image
                    source={
                      item?.coverImage
                        ? {uri: item?.coverImage}
                        : images?.defaultPicture
                    }
                    style={styles?.cover}
                  />
                  <Image
                    source={
                      item?.photo
                        ? {uri: item?.photo}
                        : images?.defaultProfilePicture
                    }
                    style={styles?.photo}
                  />
                  <Text
                    style={
                      styles?.text
                    }>{`${item?.firstName} ${item?.lastName}`}</Text>
                  <PrimaryButton
                    borderRadius={width * 0.015}
                    textStyle={styles?.btnTxt}
                    width={width * 0.26}
                    height={height * 0.04}
                    title="Follow"
                    onPress={() => toggleFollow(item?.id)}
                  />
                </View>
              );
            }

            if (type === 'moments') {
              return (
                <View key={index} style={styles?.content}>
                  <Video
                    source={{uri: item?.Momments?.url}}
                    style={styles?.video}
                  />
                  {/* header */}
                  <View style={styles?.overlay}>
                    <View style={styles?.userHeader}>
                      <UserPostHeader user={item?.user} post={item} />
                    </View>
                    <View style={styles?.bottom}>
                      <Text style={styles?.caption}>
                        {item?.Momments?.caption?.length > 20
                          ? `${item?.Momments?.caption?.slice(0, 20)}...`
                          : item?.Momments?.caption}
                      </Text>
                      <View style={styles?.buttons}>
                        <TouchableOpacity style={styles?.button}>
                          <InactiveLike />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles?.button,
                            {backgroundColor: colors?.pink},
                          ]}>
                          <Plus width={20} height={20} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }
          }}
          style={styles?.list}
          numColumns={2}
        />
      ) : (
        <View style={styles?.activityContainer}>
          <Text style={styles?.heading}>No Users Found</Text>
        </View>
      )}
    </View>
  );
};

export default SuggestedContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.extraLightGrey_1,
  },
  card: {
    margin: width * 0.01,
    alignItems: 'items-start',
    justifyContent: 'justify-between',
    backgroundColor: colors?.white,
    borderRadius: width * 0.02,
    padding: width * 0.02,
  },
  cover: {
    height: height * 0.08,
    width: width * 0.38,
    alignSelf: 'center',
    borderTopLeftRadius: width * 0.02,
    borderTopRightRadius: width * 0.02,
  },
  photo: {
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.16,
    borderWidth: width * 0.008,
    borderColor: colors?.white,
    shadowColor: colors?.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    // position : 'absolute',
    // zIndex : 100,
    marginTop: -height * 0.026,
    alignSelf: 'center',
  },
  text: {
    fontFamily: fonts?.montserratBold,
    fontSize: Pixels(12),
    color: colors?.text,
    alignSelf: 'center',
    marginVertical: height * 0.01,
  },
  heading: {
    fontFamily: fonts?.montserratBold,
    fontSize: Pixels(18),
    color: colors?.text,
  },
  list: {
    alignSelf: 'center',
    marginVertical: height * 0.02,
  },
  content: {
    margin: width * 0.02,
    backgroundColor: 'yellow',
  },
  video: {
    width: width * 0.45,
    height: height * 0.3,
    borderRadius: width * 0.02,
    backgroundColor: 'black',
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    zIndex: 10,
    top: height * 0.01,
    width: width * 0.43,
    height: height * 0.27,
    // alignItems : 'space-between',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  userHeader: {
    transform: [{scale: 0.7}],
    marginLeft: -width * 0.07,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.02,
  },
  caption: {
    alignSelf: 'baseline',
  },
  buttons: {},
  button: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors?.gray,
    marginVertical: height * 0.01,
  },
  activityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
