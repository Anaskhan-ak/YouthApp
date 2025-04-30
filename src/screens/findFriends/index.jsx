import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Contacts from 'react-native-contacts';
import { BackArrow, Cross } from '../../assets/images/svgs';
import { GradientBorderButton } from '../../components/buttons/GradientBorderButton';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import CustomSearchBar from '../../components/inputs/search';
import GradientText from '../../components/text/GradientText';
import { height, width } from '../../constant';
import { apiCall } from '../../services/apiCall';
import { styles } from './styles';

const FindFriends = () => {
  const [modal, setModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false)
  const [search, setSearch] = useState();
  const [phoneNos, setPhoneNos] = useState(['03228214535']);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const navigation = useNavigation();
  const items = [
    {
      name: 'Sannya Wasim',
      photo: require('../../assets/images/SignupImage.jpeg'),
      button: 'Follow',
    },
    {
      name: 'Sannya Wasim',
      photo: require('../../assets/images/SignupImage.jpeg'),
      button: 'Follow',
    },
    {
      name: 'Sannya Wasim',
      photo: require('../../assets/images/SignupImage.jpeg'),
      button: 'Follow',
    },
  ];

  const handleSearch = useCallback(
    _.debounce(value => {
      setSearch(value);
      getYouthappContacts(value); // call your function here with debounced input
    }, 1000),
    [],
  );
  async function requestContactsPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts Permission',
        message: 'This app needs access to your contacts to find friends.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  const getContacts = async () => {
      const permission = await requestContactsPermission();
      if (permission) {
        console.log("anas1")
        Contacts.getAll()
          .then(contacts => {
            console.log('Contacts:', contacts);
          })
          .catch(e => {
            console.error('Failed to load contacts:', e);
          });
      }
    
  };

  const getYouthappContacts = async value => {
    const response = await apiCall?.getContactSuggestions({
      contacts: phoneNos,
      name: value ? value : null,
    });
    console.log('Response', response?.user);
    setUsers(
      response?.user?.map(u => ({
        id: u?.id,
        name: `${u?.firstName} ${u?.lastName}`,
        photo: u?.photo,
      })),
    );
  };

  const getFollowing = async () => {
    try {
      const result = await apiCall?.getFollowing('cm60ql39f003l91r8l18bd80z');
      console.log('Following successfully fetched', result);
      setFollowing(result);
    } catch (error) {
      console.log('error fetching following', error);
    }
  };

  const toggleFollow = async followingId => {
    // setLoadingStates(prevState => ({
    //   ...prevState,
    //   [followingId]: true,
    // }));
    try {
      const isAlreadyFollowing = following?.includes(followingId);
      let response;

      if (!isAlreadyFollowing) {
        response = await apiCall?.follow({
          followerId: 'cm60ql39f003l91r8l18bd80z',
          followingId: 'cm64oiovt005391r8pjysmd7b',
        });
        console.log('User successfully followed', response);

        if (response) {
          setFollowing(prev => [...prev, followingId]); // Add to state
        }
      } else {
        response = await apiCall?.unfollow({
          followerId: 'cm60ql39f003l91r8l18bd80z',
          followingId: 'cm64oiovt005391r8pjysmd7b',
        });
        console.log('User successfully unfollowed', response);

        if (response) {
          setFollowing(prev => prev.filter(id => id !== followingId)); // Remove from state
        }
      }
    } catch (error) {
      console.error('Error toggling follow state:', error);
    }
    // finally {
    //   // Clear loader state for the specific user
    //   setLoadingStates(prevState => ({
    //     ...prevState,
    //     [followingId]: false,
    //   }));
    // }
  };

  const handleBack = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    getFollowing();
    getContacts();
    getYouthappContacts();
  }, []);


  return (
    <SafeAreaView style={styles?.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />

      <TouchableOpacity style={styles?.crossButton}>
        <Cross />
      </TouchableOpacity>
      <Image
        style={styles?.image}
        source={require('../../assets/images/SignupImage.jpeg')}
      />
      <View style={styles?.content}>
        <Text style={styles?.heading}>Find Friends</Text>
        <Text style={styles?.subheading}>
          Find your friends and share unique content with them.
        </Text>
        <PrimaryButton
          title={'Find Friends'}
          width={width * 0.74}
          onPress={() => setModal(true)}
        />
        <GradientBorderButton
          title={'Skip'}
          width={width * 0.75}
          onPress={getContacts}
        />
      </View>
      {modal && (
        <Modal animationType="slide" visible={modal} statusBarTranslucent>
          <View style={styles?.modalContent}>
            <View style={styles?.header}>
              <TouchableOpacity
                style={styles?.backButton}
                onPress={() => setModal(false)}>
                <BackArrow />
              </TouchableOpacity>
              <Text style={styles?.headerText}>Find Friends</Text>
              <GradientText style={styles?.gradientText}>Next</GradientText>
            </View>
            <CustomSearchBar
              search={search}
              setSearch={handleSearch}
              func={getYouthappContacts}
            />
            <FlatList
              data={users}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={() => (
                <Text style={styles?.contentHeading}>Youthapp Contacts</Text>
              )}
              renderItem={({item}) => {
                const isFollowing = following.includes(item?.id);
                return (
                  <View style={styles?.contentItem}>
                    <Image
                      source={
                        item?.photo
                          ? {uri: item?.photo}
                          : require('../../assets/images/SignupImage.jpeg')
                      }
                      style={styles?.itemImage}
                    />
                    <Text style={styles?.itemName}>{item?.name}</Text>
                    {isFollowing ? (
                      <PrimaryButton
                        title="Followed"
                        styles={styles?.gradientButton}
                        textStyle={styles?.gradientButtonText}
                        onPress={() => toggleFollow(item?.id)}
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles?.grayButton}
                        onPress={() => toggleFollow(item?.id)}>
                        <Text style={styles?.grayButtonText}>Follow</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }}
              style={styles?.list}
            />
            <FlatList
              data={items}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={() => (
                <>
                  <Text style={styles?.contentHeading}>Phone Contacts</Text>
                </>
              )}
              renderItem={({item}) => (
                <View style={styles?.contentItem}>
                  <Image source={item?.photo} style={styles?.itemImage} />
                  <Text style={styles?.itemName}>{item?.name}</Text>
                  {/* <PrimaryButton
                    title={item?.button}
                    styles={styles?.gradientButton}
                    textStyle={styles?.gradientButtonText}
                  /> */}
                  <TouchableOpacity style={styles?.grayButton}>
                    <Text style={styles?.grayButtonText}>Invite</Text>
                  </TouchableOpacity>
                </View>
              )}
              style={[styles?.list, {marginTop: height * 0.02}]}
            />
          </View>
        </Modal>
      )}
      {/* {
        inviteModal && (
          <InviteModal/>
        )
      } */}
    </SafeAreaView>
  );
};

export default FindFriends;
