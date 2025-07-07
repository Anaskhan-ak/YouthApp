import { ZegoSendCallInvitationButton } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import {
  BackArrow,
  VoiceCallIcon
} from '../../../../assets/images/svgs';
import { styles } from './styles';

const ChatHeader = ({user, backPress, onChatDetailsPress}) => {
  console.log("user", user)
  return (
    <View style={styles?.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={'transparent'}
      />
      <TouchableOpacity style={styles?.backButton} onPress={backPress}>
        <BackArrow />
      </TouchableOpacity>
      <TouchableOpacity style={styles?.details} onPress={onChatDetailsPress}>
        <Image source={user?.image} style={styles?.image} />
        <View style={styles?.textContainer}>
          <Text style={styles?.title}>{user?.title}</Text>
          <Text style={styles?.lastOnline}>{user?.lastOnline}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles?.buttonContainer}>
        {/* <TouchableOpacity style={styles?.button}>
          <VideoCallIcon />
        </TouchableOpacity> */}
        <ZegoSendCallInvitationButton
          invitees={[{userID: user?.id, userName: user?.title}]}
          isVideoCall={false}
          resourceID={'youth_data'} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
        />

        <TouchableOpacity style={styles?.button}>
          <VoiceCallIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;
