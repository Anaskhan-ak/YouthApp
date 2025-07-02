import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View } from 'react-native';
import AddMembers from './components/addMembers';
import GroupName from './components/groupName';
import { styles } from './styles';

const NewChatGroup = () => {
  const [youthContacts, setYouthContacts] = useState([]);
  const [phoneContacts, setPhoneContacts] = useState([]);
  const [next, setNext] = useState(false);
  const navigation = useNavigation()
  return (
    <View style={styles?.container}>
      {next ? (
        <GroupName setNext={setNext}/>
      ) : (
        <AddMembers
          youthContacts={youthContacts}
          setYouthContacts={setYouthContacts}
          phoneContacts={phoneContacts}
          setPhoneContacts={setPhoneContacts}
          setNext={setNext}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default NewChatGroup;
