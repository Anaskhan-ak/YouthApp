import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackArrow } from '../../assets/images/svgs';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import CustomSearchBar from '../../components/inputs/search';
import { height, width } from '../../constant';
import { apiCall } from '../../services/apiCall';
import { styles } from './styles';

const ConnectionListing = ({route}) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const {heading} = route?.params || '';
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const page = 1;
        const limit = 20;
        const response = await apiCall?.getFollowing(page, limit);
        if (response) {
          console.log('Following fetched successfully', response?.results);
          setFollowing(response?.results);
        }
      } catch (error) {
        console.log('Error fetching following', error);
      }
    };
    getFollowing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles?.container}>
      <View style={styles?.header}>
        <TouchableOpacity
          style={styles?.backButton}
          onPress={() => navigation?.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles?.headerText}>{heading}</Text>
        <View />
      </View>
      <CustomSearchBar
        value={search}
        onChangeText={setSearch}
        placeholder={'Search'}
        //   func={}
      />
      <FlatList
        data={following}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => (
          <Text
            style={
              styles?.contentHeading
            }>{`All ${following?.length} ${heading?.toUpperCase()}`}</Text>
        )}
        renderItem={({item}) => {
          return (
            <View style={styles?.contentView}>
              <View style={styles?.itemLeftContent}>
                <Image
                  source={
                    item?.photo
                      ? {uri: item?.photo}
                      : require('../../assets/images/SignupImage.jpeg')
                  }
                  style={styles?.itemImage}
                />
                <Text style={styles?.itemName}>
                  {`${item?.firstName} ${item?.lastName}`}
                </Text>
              </View>
              {item?.isFollowing ? (
                <PrimaryButton
                  width={width * 0.2}
                  height={height * 0.035}
                  marginTop={-2}
                  title="Followed"
                  styles={styles?.gradientButton}
                  textStyle={styles?.gradientButtonText}
                  //    onPress={() => toggleFollow(item?.id)}
                />
              ) : (
                <TouchableOpacity
                  style={styles?.grayButton}
                  //    onPress={() => toggleFollow(item?.id)}
                >
                  <Text style={styles?.grayButtonText}>Follow</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
        style={styles?.list}
      />
    </SafeAreaView>
  );
};

export default ConnectionListing;
