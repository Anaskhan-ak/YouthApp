import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';
import { images } from '../../assets/images';
import ChatHeader from '../../components/headers/chat/chat';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import ChatFooter from './components/footer';
import ReceivedMessage from './components/receivedMessage';
import SentMessage from './components/sentMessage';
import { styles } from './styles';

const Chat = ({route}) => {
  // const {chatID, receiver} = route?.params;
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const userID = 'cm60ql39f003l91r8l18bd80z';
  useEffect(() => {
    const getAllChatMessages = async () => {
      try {
        const response = await apiCall?.getChatMessages({chatId: chatID});
        console.log('Successfully fetched messages');
        // console.log('Response', response);
        setMessages(response);
      } catch (error) {
        console.log('Error fetching messages');
      }
    };
    getAllChatMessages();
  }, []);
  return (
    <SafeAreaView style={{flex : 1, backgroundColor : colors?.white}}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      style={{flex: 1, backgroundColor : colors?.white}}>
      <ImageBackground
        style={styles?.container}
        source={images?.chatBackground}>
        <ChatHeader
          user={{
            title: 'Sannya Wasim',
            // `${receiver?.firstName} ${receiver?.lastName}`,
            image:
              // receiver?.photo ? {uri : receiver?.photo} :
              images?.defaultProfilePicture,
            lastOnline: 'Last seen today at 1:39 PM',
          }}
          backPress={() => navigation?.goBack()}
        />

        {/* <View style={styles?.messages}> */}
          <FlatList
            data={messages}
            renderItem={({item}) => {
              // console.log("Item", item)
              if (item?.senderId === userID) {
                return <SentMessage message={item} />;
              } else {
                return <ReceivedMessage message={item} />;
              }
            }}
            style={styles?.list}
          />
        {/* </View> */}

        <ChatFooter />
      </ImageBackground>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
