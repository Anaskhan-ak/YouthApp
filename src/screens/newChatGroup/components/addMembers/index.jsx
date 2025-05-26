import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../../assets/images';
import CreateButton from '../../../../components/buttons/CreateButton';
import CustomSearchBar from '../../../../components/inputs/search';
import { colors } from '../../../../utils/colors';
import { styles } from './styles';

const AddMembers = () => {
  const [search, setSearch] = useState('');
  const [youthContacts, setYouthContacts] = useState([
    {photo: images?.defaultProfilePicture, name: 'Keneth Alleen'},
    {photo: images?.defaultProfilePicture, name: 'Sannya Wasim'},
    {photo: images?.defaultProfilePicture, name: 'Adeel Murtaza'},
    {photo: images?.defaultProfilePicture, name: 'Muzammil Khan'},
    {photo: images?.defaultProfilePicture, name: 'Zoya Tariq'},
    {photo: images?.defaultProfilePicture, name: 'Tariq Mehmood'},
    {photo: images?.defaultProfilePicture, name: 'Sarah Aslam'},
    {photo: images?.defaultProfilePicture, name: 'Haider Raza'},
    {photo: images?.defaultProfilePicture, name: 'Nimra Ahsan'},
    {photo: images?.defaultProfilePicture, name: 'Farhan Ali'},
  ]);

  const handlePress = obj => {
    const isAlreadyAdded = youthContacts?.filter(cont =>
      cont?.includes(obj?.name),
    );
    setYouthContacts(prev =>
      isAlreadyAdded
        ? prev?.filter(contact => contact?.name !== obj?.name)
        : [...prev, obj],
    );
  };
  const renderYouthContacts = ({item}) => {
    return (
      <View style={styles?.itemContainer}>
        <View style={styles?.content}>
          <Image source={item?.photo} style={styles?.image} />
          <Text style={styles?.name}>{item?.name}</Text>
        </View>
        <TouchableOpacity onPress={() => handlePress(item)}>
          <LinearGradient
            colors={[colors?.RGB1, colors?.RGB2]}
            style={styles?.gradientButton}>
            <Text style={styles?.gradientText}>Add</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };
  const renderPhoneContacts = ({item}) => {
    return (
      <View style={styles?.itemContainer}>
        <View style={styles?.content}>
          <Image source={item?.photo} style={styles?.image} />
          <Text style={styles?.name}>{item?.name}</Text>
        </View>
        <LinearGradient
          colors={[colors?.RGB1, colors?.RGB2]}
          style={styles?.gradientButton}>
          <Text style={styles?.gradientText}>Invite</Text>
        </LinearGradient>
      </View>
    );
  };
  return (
    <View style={styles?.container}>
      <View style={styles?.search}>
        <CustomSearchBar search={search} setSearch={setSearch} />
      </View>
      <View style={styles?.listContainer}>
        <FlatList
          data={youthContacts}
          renderItem={renderYouthContacts}
          style={styles?.list}
          ListHeaderComponent={
            <Text style={styles?.header}>Youthapp Contacts</Text>
          }
        />
      </View>
      <View style={styles?.listContainer}>
        <FlatList
          data={youthContacts}
          renderItem={renderPhoneContacts}
          style={styles?.list}
          ListHeaderComponent={
            <Text style={styles?.header}>Phone Contacts</Text>
          }
        />
      </View>
      <CreateButton title="Next" />
    </View>
  );
};

export default AddMembers;
