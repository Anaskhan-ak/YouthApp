import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  Modal,
  PermissionsAndroid,
  Platform,
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
  const [search, setSearch] = useState();
  const [phoneNos, setPhoneNos] = useState(['03228214535']);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const navigation  = useNavigation()
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

  const handleSearch = value => {
    setSearch(value);
    // console.log("Search value", search)
  };

  const getContacts = async () => {
    try {
      // Step 1: Request permission
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app needs access to your contacts.',
            buttonPositive: 'OK',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Contacts permission denied');
          return [];
        }
      }

      // Step 2: Fetch contacts
      const contacts = await Contacts.getAll();

      // Optional: Sort or format the contacts
      const formattedContacts = contacts.map((contact, index) => ({
        id: index,
        fullName:
          contact.displayName ||
          `${contact.givenName || ''} ${contact.familyName || ''}`.trim(),
        photo: contact.thumbnailPath, // Path to the contact's photo (if available)
        phoneNumbers: contact.phoneNumbers.map(pn => pn.number), // Array of phone numbers
      }));

      setPhoneNumbers(formattedContacts);
      setFilteredContacts(formattedContacts);
      formattedContacts && setPhoneLoading(false);

      // set youth contacts
      const sanitizeNumber = (number) => {
        if (!number) return null; // Remove undefined numbers
        const sanitized = number.replace(/[^+\d]/g, '').trim(); // Remove spaces, dashes, and other characters
        return sanitized.length >= 10 ? sanitized : null; // Keep numbers with at least 10 characters
      };
      const extractedNumbers = contacts
        ?.map(number => sanitizeNumber(number?.phoneNumbers[0]?.number))
        .filter(Boolean); // Remove null/undefined/short values
      console.log('Extracted numbers', extractedNumbers[0]);

      return extractedNumbers;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  };

  const getYouthappContacts = async () => {
    const response = await apiCall?.getContactSuggestions({contacts: phoneNos});
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
    getYouthappContacts()
    BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    };
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
              setSearch={value => handleSearch(value)}
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
                  <TouchableOpacity
                    style={styles?.grayButton}>
                    <Text style={styles?.grayButtonText}>Invite</Text>
                  </TouchableOpacity>
                </View>
              )}
              style={[styles?.list, {marginTop: height * 0.02}]}
            />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default FindFriends;
