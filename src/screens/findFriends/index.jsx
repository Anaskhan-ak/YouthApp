import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { BackArrow, Cross } from '../../assets/images/svgs';
import { GradientBorderButton } from '../../components/buttons/GradientBorderButton';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import CustomSearchBar from '../../components/inputs/search';
import InviteModal from '../../components/modals/genderModal/inviteModal';
import GradientText from '../../components/text/GradientText';
import { height, width } from '../../constant';
import { apiCall } from '../../services/apiCall';
import { styles } from './styles';

const FindFriends = () => {
  const [modal, setModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [search, setSearch] = useState();
  const [phoneNos, setPhoneNos] = useState([]);
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const navigation = useNavigation();

  const handleSearch = useCallback(
    _.debounce(value => {
      setSearch(value);
      getYouthappContacts(value); // call your function here with debounced input
    }, 1000),
    [],
  );

  const getYouthappContacts = async numbers => {
    console.log("NUMBERS FOR API", numbers)
    const response = await apiCall?.getContactSuggestions({
      contacts: numbers,
      // name: value ? value : null,
    });
    setUsers(
      response?.user?.map(u => ({
        id: u?.id,
        name: `${u?.firstName} ${u?.lastName}`,
        photo: u?.photo,
      })),
    );
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
      const sanitizeNumber = (number) => {
        if (!number) return null; // Remove undefined numbers
        const sanitized = number.replace(/[^+\d]/g, '').trim(); // Remove spaces, dashes, and other characters
        return sanitized.length >= 10 ? sanitized : null; // Keep numbers with at least 10 characters
      };
      const extractedNumbers = results
        ?.map(number => sanitizeNumber(number?.phoneNumbers[0]?.number))
        .filter(Boolean); // Remove null/undefined/short values
      getYouthappContacts(extractedNumbers)
      setPhoneNos(formattedContacts);
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
          // onPress={() => setInviteModal(true)}
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
              data={phoneNos}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={() => (
                <>
                  <Text style={styles?.contentHeading}>Phone Contacts</Text>
                </>
              )}
              renderItem={({item}) => (
                <View style={styles?.contentItem}>
                  <Image
                    source={
                      item?.photo
                        ? {uri: item?.photo}
                        : require('../../assets/images/SignupImage.jpeg')
                    }
                    style={styles?.itemImage}
                  />
                  <Text style={styles?.itemName}>{item?.fullName}</Text>
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
      {inviteModal && <InviteModal />}
    </SafeAreaView>
  );
};

export default FindFriends;
