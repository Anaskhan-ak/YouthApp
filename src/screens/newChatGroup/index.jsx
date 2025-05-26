import { useState } from 'react';
import { View } from 'react-native';
import AddMembers from './components/addMembers';
import GroupName from './components/groupName';
import { styles } from './styles';

const NewChatGroup = () => {
  const [youthContacts, setYouthContacts] = useState([]);
  const [phoneContacts, setPhoneContacts] = useState([]);
  const [next, setNext] = useState(true);
  return (
    <View style={styles?.container}>
      {next ? (
        <GroupName />
      ) : (
        <AddMembers
          youthContacts={youthContacts}
          setYouthContacts={setYouthContacts}
          phoneContacts={phoneContacts}
          setPhoneContacts={setPhoneContacts}
          setNext={setNext}
        />
      )}
    </View>
  );
};

export default NewChatGroup;
