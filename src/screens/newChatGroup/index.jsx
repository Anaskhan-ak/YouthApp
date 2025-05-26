import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../assets/images';
import InboxHeader from '../../components/headers/chat/inbox';
import { colors } from '../../utils/colors';
import AddMembers from './components/addMembers';
import { styles } from './styles';

const NewChatGroup = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const data = Array.from({length: 20}, () => ({
    photo: images?.defaultProfilePicture,
    name: 'Keneth Alleen',
    active : false
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
          <Text style={styles?.gradientText}>Add</Text>
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
      <AddMembers/>
    </View>
  );
};

export default NewChatGroup;
