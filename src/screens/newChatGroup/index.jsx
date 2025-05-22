import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../assets/images';
import CreateButton from '../../components/buttons/CreateButton';
import InboxHeader from '../../components/headers/chat/inbox';
import CustomSearchBar from '../../components/inputs/search';
import { colors } from '../../utils/colors';
import { styles } from './styles';

const NewChatGroup = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const data = Array.from({length: 20}, () => ({
    photo: images?.defaultProfilePicture,
    name: 'Keneth Alleen',
  }));
  const renderItem = ({item}) => {
    return (
      <View style={styles?.itemContainer}>
        <View style={styles?.content}>
          <Image source={item?.photo} style={styles?.image} />
          <Text style={styles?.name}>{item?.name}</Text>
        </View>
        <LinearGradient
          colors={[colors?.RGB1, colors?.RGB2]}
          style={styles?.gradientButton}>
          <Text style={styles?.gradientText}>Chat</Text>
        </LinearGradient>
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
          renderItem={renderItem}
          style={styles?.list}
          ListHeaderComponent={<Text style={styles?.header}>Youthapp Contacts</Text>}
        />
      </View>
      <View style={styles?.listContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          style={styles?.list}
          ListHeaderComponent={<Text style={styles?.header}>Phone Contacts</Text>}
        />
      </View>
      <CreateButton title='Next'/>
    </View>
  );
};

export default NewChatGroup;
