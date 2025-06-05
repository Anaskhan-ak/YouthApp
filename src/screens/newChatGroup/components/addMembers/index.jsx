import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../../assets/images';
import CreateButton from '../../../../components/buttons/CreateButton';
import InboxHeader from '../../../../components/headers/chat/inbox';
import CustomSearchBar from '../../../../components/inputs/search';
import { colors } from '../../../../utils/colors';
import { styles } from './styles';

const AddMembers = ({
  youthContacts,
  setYouthContacts,
  phoneContacts,
  setPhoneContacts,
  setNext,
}) => {
  const [search, setSearch] = useState('');

  const data = [
    {
      id: 'aaaaaaaaaaaaaaaaaa',
      photo: images?.defaultProfilePicture,
      name: 'Keneth Alleen',
    },
    {
      id: 'bbbbbbbbbbbbbbbbb',
      photo: images?.defaultProfilePicture,
      name: 'Sannya Wasim',
    },
    {
      id: 'ccccccccccccccccc',
      photo: images?.defaultProfilePicture,
      name: 'Adeel Murtaza',
    },
    {
      id: 'ddddddddddddddddd',
      photo: images?.defaultProfilePicture,
      name: 'Muzammil Khan',
    },
    {
      id: 'eeeeeeeeeeeeeeeee',
      photo: images?.defaultProfilePicture,
      name: 'Zoya Tariq',
    },
    {
      id: 'fffffffffffffffff',
      photo: images?.defaultProfilePicture,
      name: 'Tariq Mehmood',
    },
    {
      id: 'ggggggggggggggggg',
      photo: images?.defaultProfilePicture,
      name: 'Sarah Aslam',
    },
    {
      id: 'hhhhhhhhhhhhhhhhh',
      photo: images?.defaultProfilePicture,
      name: 'Haider Raza',
    },
    {
      id: 'iiiiiiiiiiiiiiiiii',
      photo: images?.defaultProfilePicture,
      name: 'Nimra Ahsan',
    },
    {
      id: 'jjjjjjjjjjjjjjjjjj',
      photo: images?.defaultProfilePicture,
      name: 'Farhan Ali',
    },
  ];

  const handleYouthPress = obj => {
    const isAlreadyAdded = youthContacts?.some(
      contact => contact?.id === obj?.id,
    );
    setYouthContacts(prev =>
      isAlreadyAdded
        ? prev?.filter(contact => contact?.id !== obj?.id)
        : [...prev, obj],
    );
  };

  const handlePhonePress = obj => {
    const isAlreadyAdded = phoneContacts?.some(
      contact => contact?.id === obj?.id,
    );
    setPhoneContacts(prev =>
      isAlreadyAdded
        ? prev?.filter(contact => contact?.id !== obj?.id)
        : [...prev, obj],
    );
  };
  const renderYouthContacts = ({item}) => {
    const isAlreadyAdded = youthContacts?.some(
      contact => contact?.id === item?.id,
    );
    return (
      <View style={styles?.itemContainer}>
        <View style={styles?.content}>
          <Image source={item?.photo} style={styles?.image} />
          <Text style={styles?.name}>{item?.name}</Text>
        </View>
        <TouchableOpacity onPress={() => handleYouthPress(item)}>
          {isAlreadyAdded ? (
            <View style={[styles?.button, {backgroundColor: colors?.gray}]}>
              <Text style={[styles?.text, {color: colors?.text}]}>Added</Text>
            </View>
          ) : (
            <LinearGradient
              colors={[colors?.RGB1, colors?.RGB2]}
              style={styles?.button}>
              <Text style={[styles?.text, {color: colors?.white}]}>Add</Text>
            </LinearGradient>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  const renderPhoneContacts = ({item}) => {
    const isAlreadyAdded = phoneContacts?.some(
      contact => contact?.id === item?.id,
    );
    return (
      <View style={styles?.itemContainer}>
        <View style={styles?.content}>
          <Image source={item?.photo} style={styles?.image} />
          <Text style={styles?.name}>{item?.name}</Text>
        </View>
        <TouchableOpacity onPress={() => handlePhonePress(item)}>
          {isAlreadyAdded ? (
            <View style={[styles?.button, {backgroundColor: colors?.gray}]}>
              <Text style={[styles?.text, {color: colors?.text}]}>Invited</Text>
            </View>
          ) : (
            <LinearGradient
              colors={[colors?.RGB1, colors?.RGB2]}
              style={styles?.button}>
              <Text style={[styles?.text, {color: colors?.white}]}>Invite</Text>
            </LinearGradient>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles?.container}>
      <InboxHeader
        title="Group Chat"
        onCancelIconPress={() => navigation?.goBack()}
        onGroupIconPress={() => navigation?.goBack()}
      />
      <View style={styles?.search}>
        <CustomSearchBar search={search} setSearch={setSearch} />
      </View>
      <View style={styles?.listContainer}>
        <FlatList
          data={data}
          renderItem={renderYouthContacts}
          style={styles?.list}
          ListHeaderComponent={
            <Text style={styles?.header}>Youthapp Contacts</Text>
          }
        />
      </View>
      <View style={styles?.listContainer}>
        <FlatList
          data={data}
          renderItem={renderPhoneContacts}
          style={styles?.list}
          ListHeaderComponent={
            <Text style={styles?.header}>Phone Contacts</Text>
          }
        />
      </View>
      <CreateButton title="Next" onPress={() => setNext(true)} />
    </View>
  );
};

export default AddMembers;
