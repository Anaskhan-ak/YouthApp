import {useNavigation} from '@react-navigation/native';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {images} from '../../../assets/images';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {height, Pixels, width} from '../../../constant';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import {apiCall} from '../../../services/apiCall';
import {useEffect, useState} from 'react';
import GradientText from '../../../components/text/GradientText';
import {getDataLocally} from '../../../helper';
import {toast} from '../../../components/toast';

const SuggestedUsers = ({getUserData}) => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const response = await apiCall?.getAllUsers({
        page: 1,
        pageSize: 10,
      });
      setUsers(response);
    } catch (e) {
    } finally {
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
      getUserData();
      getUsers();
      toast('success', 'follow request successfully');
    } catch (error) {
      console.error('Error toggling follow state:', error);
    }
  };

  return (
    <View style={styles?.container}>
      <View style={styles?.textView}>
        <Text style={styles?.heading}>Suggested for you</Text>
        <TouchableOpacity
          onPress={() =>
            navigation?.navigate('SuggestedContent', {
              headerTitle: 'Suggested Users',
              data: users,
              type: 'users',
            })
          }>
          <GradientText style={styles?.heading}>See all</GradientText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        renderItem={({item}) => {
          return (
            <View style={styles?.card}>
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
        }}
        style={styles?.list}
        horizontal
      />
    </View>
  );
};

export default SuggestedUsers;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.extraLightGrey_1,
    marginVertical: 20,
    paddingBottom: 20,
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height * 0.0125,
    paddingHorizontal: width * 0.025,
  },
  card: {
    margin: width * 0.01,
    alignItems: 'items-start',
    justifyContent: 'justify-between',
    backgroundColor: colors?.white,
    borderRadius: width * 0.02,
    padding: width * 0.015,
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
  list: {
    // marginVertical: height * 0.01,
  },
  heading: {
    fontFamily: fonts?.montserratBold,
    fontSize: Pixels(14),
    color: colors?.text,
  },
  btn: {
    fontSize: Pixels(12),
    color: colors?.white,
    fontFamily: fonts?.montserratBold,
  },
});
