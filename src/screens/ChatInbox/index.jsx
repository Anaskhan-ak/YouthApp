import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View } from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SocialButton from '../../components/buttons/SocialButton';
import InboxHeader from '../../components/headers/chat/inbox';
import CustomSearchBar from '../../components/inputs/search';
import { width } from '../../constant';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import Calls from './components/calls';
import Chats from './components/chats';
import { styles } from './styles';

const ChatInbox = () => {
  const [search, setSearch] = useState('');
  const [toggleChatsCalls, setToggleChatsCalls] = useState('chats');
  const navigation = useNavigation();

  return (
    <View style={styles?.container}>
      <InboxHeader
        title="Chat"
        onGroupIconPress={() => navigation.navigate('NewChatGroup')}
        backPress={() => navigation?.goBack()}
        onNewChatIconPress={() => navigation.navigate('NewChat')}
      />
      <View style={styles?.buttonContainer}>
        <PrimaryButton
          title="Chats"
          width={width * 0.45}
          onPress={() => setToggleChatsCalls('chats')}
        />
        <SocialButton
          title="Calls"
          width={width * 0.45}
          onPress={() => setToggleChatsCalls('calls')}
        />
      </View>
      <CustomSearchBar
        marginHorizontal={width * 0.04}
        search={search}
        setSearch={setSearch}
      />
      {toggleChatsCalls === 'chats' ? <Chats /> : <Calls />}
    <BottomTabNavigator/>
    </View>
  );
};

export default ChatInbox;
