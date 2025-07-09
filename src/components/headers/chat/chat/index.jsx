/* eslint-disable react-hooks/exhaustive-deps */
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import {
  BackArrow,
  VideoCallIcon
} from '../../../../assets/images/svgs';
import { styles } from './styles';
import ZegoUIKit, { ZegoToast, ZegoToastType } from '@zegocloud/zego-uikit-rn'
import ZegoUIKitPrebuiltCallService, { ZegoSendCallInvitationButton } from '@zegocloud/zego-uikit-prebuilt-call-rn';

import { onUserLogin } from '../../../../common/zegoCall';
import { useEffect } from 'react';
import { getDataLocally } from 'helper';
import { useNavigation } from '@react-navigation/native';
import { toast } from 'components/toast';


const ChatHeader = ({user, backPress, onChatDetailsPress}) => {
  const navigation = useNavigation()
   useEffect(() => {
     localData()     
    }, [])
    const localData = async() =>{
      const userData = await getDataLocally()
      if(userData){
       onUserLogin(userData?.id, userData?.firstName, navigation)
      }
    }
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
        <TouchableOpacity style={styles?.button}>
          <VideoCallIcon />
        </TouchableOpacity>       

        <TouchableOpacity style={styles?.button}>
          {/* <VoiceCallIcon /> */}
          {/* <ZegoSendCallInvitationButton
          invitees={[{userID: user?.id, userName: user?.title}]}
          isVideoCall={false}
          resourceID={'youth_data'} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
        /> */}
         <ZegoSendCallInvitationButton
             invitees={[{userID: user?.id, userName: user?.title}]}
              isVideoCall={false}
              showWaitingPageWhenGroupCall={true}
              onPressed={ (errorCode, errorMessage, errorInvitees) => {
                if (errorCode == 0) {
                  toast('error',errorMessage)
                } else {
                  toast("error",`{type: ${ZegoToastType.error}, error: ${errorCode}\n\n${errorMessage}}`)
                }
              }}
            />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;
