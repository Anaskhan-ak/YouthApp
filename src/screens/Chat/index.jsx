import { useNavigation } from '@react-navigation/native';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import { images } from '../../assets/images';
import ChatHeader from '../../components/headers/chat/chat';
import { getDataLocally } from '../../helper';
import useUser from '../../hooks/user';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import ChatDetails from './components/chatDetails';
import ChatFooter from './components/footer';
import ReceivedMessage from './components/receivedMessage';
import SentMessage from './components/sentMessage';
import { styles } from './styles';

ZegoUIKitPrebuiltCallService.useSystemCallingUI([ZIM, ZPNs]);

const Chat = ({route}) => {
  const {chatID, receiver} = route?.params;
  // console.log("receiver", receiver);
  const [messages, setMessages] = useState([]);
  const [chatDetails, setChatDetails] = useState(false);
  const navigation = useNavigation();
  const user = useUser();
  const yourAppID = 1017984930
  const yourAppSign = 'd623688f27b5f06360f2c164c2898e950a7fd95c8a296dbac0bd89e1e2be81bc'

  const onUserLogin = async () => {
    const userDetails = await getDataLocally()
    return ZegoUIKitPrebuiltCallService.init(
      yourAppID, // You can get it from ZEGOCLOUD's console
      yourAppSign, // You can get it from ZEGOCLOUD's console
      userDetails?.id, // It can be any valid characters, but we recommend using a phone number.
      `${userDetails?.firstName} ${userDetails?.lastName}`,
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.mp3',
          outgoingCallFileName: 'zego_outgoing.mp3',
        },
        androidNotificationConfig: {
          channelID: 'ZegoUIKit',
          channelName: 'ZegoUIKit',
        },
      },
    );
  };

  useEffect(() => {
    onUserLogin();
  }, []);
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
    <SafeAreaView style={{flex: 1, backgroundColor: colors?.white}}>
      <>
        {chatDetails ? (
          <ChatDetails
            title="Group Info"
            backPress={() => setChatDetails(false)}
          />
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            style={{flex: 1, backgroundColor: colors?.white}}>
            <ImageBackground
              style={styles?.container}
              source={images?.chatBackground}>
              <ChatHeader
                user={{
                  title: `${receiver?.user?.firstName} ${receiver?.user?.lastName}`,
                  // `${receiver?.firstName} ${receiver?.lastName}`,
                  id : receiver?.userId,
                  image: receiver?.user?.photo
                    ? {uri: receiver?.user?.photo}
                    : images?.defaultProfilePicture,
                  lastOnline: 'Last seen today at 1:39 PM',
                }}
                backPress={() => navigation?.goBack()}
                onChatDetailsPress={() => setChatDetails(true)}
              />

              {/* <View style={styles?.messages}> */}
              <FlatList
                data={messages}
                renderItem={({item}) => {
                  // console.log("Item", item)
                  if (item?.senderId === user?.id) {
                    return <SentMessage message={item} />;
                  } else {
                    return <ReceivedMessage message={item} />;
                  }
                }}
                style={styles?.list}
              />
              {/* </View> */}

              <ChatFooter receiver={receiver}/>
            </ImageBackground>
          </KeyboardAvoidingView>
        )}
      </>
    </SafeAreaView>
  );
};

export default Chat;
