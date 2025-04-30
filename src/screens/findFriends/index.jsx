import { useEffect, useState } from 'react';
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
  const items1 = [...items, ...items, ...items, ...items];

  const handleSearch = value => {
    setSearch(value);
    // console.log("Search value", search)
  };

  const getContacts = async () => {
    console.log(':::::::::::::');
    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Please accept bare mortal',
        },
      );
      console.log('Permission status:', permission);
      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        setModal(false);
        return;
      }   
    }
    // const contacts = await Contacts.getCount()
    // console.log('Contacts', contacts)
    const response = await apiCall?.getContactSuggestions(phoneNos)
    console.log("Response", response)
  };

  useEffect(() => {
    
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
        <GradientBorderButton title={'Skip'} width={width * 0.75} onPress={getContacts}/>
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
              data={items}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={() => (
                <Text style={styles?.contentHeading}>Youthapp Contacts</Text>
              )}
              renderItem={({item}) => (
                <View style={styles?.contentItem}>
                  <Image source={item?.photo} style={styles?.itemImage} />
                  <Text style={styles?.itemName}>{item?.name}</Text>
                  <PrimaryButton
                    title={item?.button}
                    styles={styles?.gradientButton}
                    textStyle={styles?.gradientButtonText}
                  />
                </View>
              )}
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
                  <PrimaryButton
                    title={item?.button}
                    styles={styles?.gradientButton}
                    textStyle={styles?.gradientButtonText}
                  />
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
