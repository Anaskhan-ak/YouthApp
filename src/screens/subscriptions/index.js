import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {BackArrow} from '../../assets/images/svgs';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import CustomSearchBar from '../../components/inputs/search';
import {height, width} from '../../constant';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import ItemCard from './components/itemCard';

const Subscriptions = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const users = [
    {
      id: 'cmbeywh9v0000yrc1vcoycrlm',
      firstName: 'jamil',
      lastName: 'ahmed',
      country: 'pakistan',
      photo: null,
      coverImage: null,
      isFollowing: true,
      isFollower: false,
      isSubscriber: true,
    },
    {
      id: 'cmbeywh9v0001yrc1vcoycrlm',
      firstName: 'ali',
      lastName: 'khan',
      country: 'pakistan',
      photo: null,
      coverImage: null,
      isFollowing: false,
      isFollower: true,
      isSubscriber: false,
    },
    {
      id: 'cmbeywh9v0002yrc1vcoycrlm',
      firstName: 'sana',
      lastName: 'fatima',
      country: 'pakistan',
      photo: null,
      coverImage: null,
      isFollowing: true,
      isFollower: true,
      isSubscriber: false,
    },
    {
      id: 'cmbeywh9v0003yrc1vcoycrlm',
      firstName: 'ahsan',
      lastName: 'raza',
      country: 'pakistan',
      photo: null,
      coverImage: null,
      isFollowing: false,
      isFollower: false,
      isSubscriber: true,
    },
    {
      id: 'cmbeywh9v0004yrc1vcoycrlm',
      firstName: 'zara',
      lastName: 'sheikh',
      country: 'pakistan',
      photo: null,
      coverImage: null,
      isFollowing: true,
      isFollower: true,
      isSubscriber: true,
    },
    {
      id: 'cmbeywh9v0000yrc1vcoycrlm',
      firstName: 'jamil',
      lastName: 'ahmed',
      country: 'pakistan',
      photo: null,
      coverImage: null,
      isFollowing: true,
      isFollower: false,
      isSubscriber: true,
    },
    {
      id: 'cmbeywh9v0001yrc1vcoycrlm',
      firstName: 'ali',
      lastName: 'khan',
      country: 'pakistan',
      photo: null,
      coverImage: null,
      isFollowing: false,
      isFollower: true,
      isSubscriber: false,
    },
    {
      id: 'cmbeywh9v0002yrc1vcoycrlm',
      firstName: 'sana',
      lastName: 'fatima',
      country: 'pakistan',
      photo: null,
      coverImage: null,
      isFollowing: true,
      isFollower: true,
      isSubscriber: false,
    },
    {
      id: 'cmbeywh9v0003yrc1vcoycrlm',
      firstName: 'ahsan',
      lastName: 'raza',
      country: 'pakistan',
      photo: null,
      coverImage: null,
      isFollowing: false,
      isFollower: false,
      isSubscriber: true,
    },
    {
      id: 'cmbeywh9v0004yrc1vcoycrlm',
      firstName: 'zara',
      lastName: 'sheikh',
      country: 'pakistan',
      photo: null,
      coverImage: null,
      isFollowing: true,
      isFollower: true,
      isSubscriber: true,
    },
  ];
  return (
    <SafeAreaView style={styles?.container}>
      <View style={styles?.header}>
        <TouchableOpacity
          style={styles?.backButton}
          onPress={() => navigation?.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles?.headerText}>Subscriptions</Text>
        <View />
      </View>
      <CustomSearchBar
        value={search}
        onChangeText={setSearch}
        placeholder={'Search'}
        //   func={}
      />
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => (
          <Text style={styles?.contentHeading}>{`All 150 Subscriptions`}</Text>
        )}
        renderItem={({item}) => {
          return <ItemCard item={item} />;
        }}
        style={styles?.list}
      />
    </SafeAreaView>
  );
};

export default Subscriptions;
