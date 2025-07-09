import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import Contacts from 'react-native-contacts';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../assets/images';
import CreateButton from '../../components/buttons/CreateButton';
import InboxHeader from '../../components/headers/chat/inbox';
import CustomSearchBar from '../../components/inputs/search';
import { toast } from '../../components/toast';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import { styles } from './styles';

const NewChat = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [following, setFollowing] = useState([]);
  const [contacts, setContacts] = useState([]);
  const data = Array.from({length: 20}, () => ({
    photo: images?.defaultProfilePicture,
    name: 'Keneth Alleen',
  }));

  const getFollowing = async () => {
    try {
      const page = 1;
      const limit = 10;
      const response = await apiCall?.getFollowing(page, limit);
      // console.log('following fetched successfully', response?.results);
      setFollowing(response?.results);
    } catch (error) {
      console.log('Error fetching following', error);
    }
  };

  // const getContacts = async () => {
  //   try {
  //     if (Platform.OS === 'android') {
  //       const permission = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //         {
  //           title: 'Contacts Permission',
  //           message: 'This app would like to view your contacts.',
  //           buttonPositive: 'Please accept bare mortal',
  //         },
  //       );
  //       if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
  //         // setModal(false);
  //         toast('Permissions denied');
  //         return;
  //       }
  //     }
  //     const results = await Contacts?.getContactsByPhoneNumber('03228214535');
  //     // console.log('Contacts', results);
  //     const formattedContacts = results.map((contact, index) => ({
  //       id: index,
  //       fullName:
  //         contact.displayName ||
  //         `${contact.givenName || ''} ${contact.familyName || ''}`.trim(),
  //       photo: contact.thumbnailPath, // Path to the contact's photo (if available)
  //       phoneNumbers: contact.phoneNumbers[0]?.number, // Array of phone numbers
  //     }));
  //     console.log('Formatted contacts', formattedContacts?.slice(0, 4));
  //     const sanitizeNumber = number => {
  //       if (!number) return null; // Remove undefined numbers
  //       const sanitized = number.replace(/[^+\d]/g, '').trim(); // Remove spaces, dashes, and other characters
  //       return sanitized.length >= 10 ? sanitized : null; // Keep numbers with at least 10 characters
  //     };
  //     const extractedNumbers = results
  //       ?.map(number => sanitizeNumber(number?.phoneNumbers[0]?.number))
  //       .filter(Boolean); // Remove null/undefined/short values
  //     console.log('extractedNumbers', extractedNumbers);
  //     // getYouthappContacts(extractedNumbers);
  //     setContacts(formattedContacts);
  //   } catch (error) {
  //     console.log('Error fetching contacts', error);
  //   }
  //   // }
  // };

  // const fetchNumbers = async () => {
  //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
  //     title: 'Contacts',
  //     message: 'This app would like to view your contacts.',
  //     buttonPositive: 'Please accept bare mortal',
  //   })
  //     .then(res => {
  //       console.log('Permission: ', res);
  //       Contacts.getAll()
  //         .then(contacts => {
  //           // work with contacts
  //           console.log(contacts);
  //         })
  //         .catch(e => {
  //           console.log(e);
  //         });
  //     })
  //     .catch(error => {
  //       console.error('Permission error: ', error);
  //     });
  // };

  useEffect(() => {
    getFollowing();
    // getContacts();
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     // fetchNumbers();
  //   }, 1000); // Delay 1 second
  //   return () => clearTimeout(timer);
  // }, []);

  const renderItem = ({item, index}) => {
    // console.log('item', item);
    return (
      <View key={index} style={styles?.itemContainer}>
        <View style={styles?.content}>
          <Image
            source={item?.photo ? {uri: item?.photo} : images?.defaultPicture}
            style={styles?.image}
          />
          <Text
            style={styles?.name}>{`${item?.firstName} ${item?.lastName}`}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation?.navigate('Chat', {
              receiver: {
                chatId: '',
                user: {
                  firstName: item?.firstName,
                  lastName: item?.lastName,
                  photo: item?.photo,
                },
                userId: item?.id,
              },
            })
          }>
          <LinearGradient
            colors={[colors?.RGB1, colors?.RGB2]}
            style={styles?.gradientButton}>
            <Text style={styles?.gradientText}>Chat</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles?.container}>
      <InboxHeader
        title="New Chat"
        onCancelIconPress={() => navigation?.goBack()}
        backPress={() => navigation?.goBack()}
      />
      <View style={styles?.search}>
        <CustomSearchBar search={search} setSearch={setSearch} />
      </View>
      <View style={styles?.listContainer}>
        <FlatList
          data={following}
          renderItem={renderItem}
          style={styles?.list}
          ListHeaderComponent={
            <Text style={styles?.header}>Youthapp Contacts</Text>
          }
        />
      </View>
      {/* <View style={styles?.listContainer}>
        <FlatList
          data={following}
          renderItem={renderItem}
          style={styles?.list}
          ListHeaderComponent={
            <Text style={styles?.header}>Phone Contacts</Text>
          }
        />
      </View> */}
      <CreateButton title="Next" />
    </View>
  );
};

export default NewChat;
