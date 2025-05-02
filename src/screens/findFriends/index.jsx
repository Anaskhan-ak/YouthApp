import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { Cross } from '../../assets/images/svgs';
import { GradientBorderButton } from '../../components/buttons/GradientBorderButton';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import InviteModal from '../../components/modals/genderModal/inviteModal';
import { width } from '../../constant';
import { apiCall } from '../../services/apiCall';
import ContactsList from './Contacts';
import { styles } from './styles';

const FindFriends = () => {
  const [modal, setModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [search, setSearch] = useState();
  const [phoneNos, setPhoneNos] = useState([]);
  const [filteredNos, setFilteredNos] = useState([])
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([])
  const [following, setFollowing] = useState([]);
  const navigation = useNavigation();

  const handleSearch = useCallback(
    _.debounce((query) => {
      setSearch(query);
      if (query.trim() === '') {
        setFilteredUsers(users);
        // setFilteredContacts(phoneNumbers);
      } else {
        const lowerCaseQuery = query.toLowerCase();
        const searchedContacts = phoneNos.filter(
          (contact) =>
            contact?.fullName?.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredNos(searchedContacts);
  
        const searchedUsers = users.filter(
          (user) =>
            user?.fullName?.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredUsers(searchedUsers);
      }
    }, 500),
    [users, phoneNos]
  );

  const onChangeSearchText = (text) => {
    setSearch(text);           // Immediate UI update
    handleSearch(text);        // Debounced filtering
  };

  const getYouthappContacts = async numbers => {
    const response = await apiCall?.getContactSuggestions({
      contacts: numbers,
      // name: value ? value : null,
    });
    setUsers(
      response?.user?.map(u => ({
        id: u?.id,
        fullName: `${u?.firstName} ${u?.lastName}`,
        photo: u?.photo,
      })),
    );
    setFilteredUsers(
      response?.user?.map(u => ({
        id: u?.id,
        fullName: `${u?.firstName} ${u?.lastName}`,
        photo: u?.photo,
      })),
    )
  };
  const getContacts = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Please accept bare mortal',
          },
        );
        if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
          setModal(false);
          return;
        }
      }
      const results = await Contacts?.getAll();
      // console.log('Contacts', results);
      const formattedContacts = results.map((contact, index) => ({
        id: index,
        fullName:
          contact.displayName ||
          `${contact.givenName || ''} ${contact.familyName || ''}`.trim(),
        photo: contact.thumbnailPath, // Path to the contact's photo (if available)
        phoneNumbers: contact.phoneNumbers.map(pn => pn.number), // Array of phone numbers
      }));
      // console.log('Formatted contacts', formattedContacts?.slice(0, 4));
      const sanitizeNumber = number => {
        if (!number) return null; // Remove undefined numbers
        const sanitized = number.replace(/[^+\d]/g, '').trim(); // Remove spaces, dashes, and other characters
        return sanitized.length >= 10 ? sanitized : null; // Keep numbers with at least 10 characters
      };
      const extractedNumbers = results
        ?.map(number => sanitizeNumber(number?.phoneNumbers[0]?.number))
        .filter(Boolean); // Remove null/undefined/short values
      getYouthappContacts(extractedNumbers);
      setPhoneNos(formattedContacts);
      setFilteredNos(formattedContacts)
    } catch (error) {
      console.log('Error fetching contacts', error);
    }
    // }
  };

  const getFollowing = async () => {
    try {
      const result = await apiCall?.getFollowing('cm60ql39f003l91r8l18bd80z');
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
      const isAlreadyFollowing = following.some(f => f.followingId === followingId);
      let response;

      if (!isAlreadyFollowing) {
        response = await apiCall?.follow({
          followerId: 'cm60ql39f003l91r8l18bd80z',
          followingId: followingId,
        });
        console.log('User successfully followed', response);

        if (response) {
          setFollowing(prev => [...prev, response]); // Add to state
        }
      } else {
        response = await apiCall?.unfollow({
          followerId: 'cm60ql39f003l91r8l18bd80z',
          followingId: followingId,
        });
        console.log('User successfully unfollowed', response);

        if (response === 200) {
          setFollowing(prev => prev.filter(f => f?.followingId !== followingId)); // Remove from state
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
    const backHandler = BackHandler?.addEventListener(
      'hardwareBackPress',
      handleBack,
    );
    return () => backHandler?.remove();
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
          onPress={() => setInviteModal(true)}
        />
      </View>
      {modal && (
        <ContactsList
          modal={modal}
          setModal={setModal}
          search={search}
          handleSearch={onChangeSearchText}
          getYouthappContacts={getYouthappContacts}
          users={filteredUsers}
          following={following}
          phoneNos={filteredNos}
          toggleFollow={toggleFollow}
        />
      )}
      {inviteModal && <InviteModal setModal={setInviteModal}/>}
    </SafeAreaView>
  );
};

export default FindFriends;
