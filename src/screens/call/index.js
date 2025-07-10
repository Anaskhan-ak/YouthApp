import { useRef } from 'react';

import ZegoUIKitPrebuiltCallService, {
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ZegoMenuBarButtonName,
  ZegoUIKitPrebuiltCall
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { Image, StyleSheet, View } from 'react-native';

export default function CallPage(props) {
  const prebuiltRef = useRef();
  const {route} = props;
  const {params} = route;
  const {userID, userName} = params;
  const appID = 1017984930;
  const appSign =
    'd623688f27b5f06360f2c164c2898e950a7fd95c8a296dbac0bd89e1e2be81bc';
  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        ref={prebuiltRef}
        appID={appID}
        appSign={appSign}
        userID={userID}
        userName={userName}
        callID="rn12345678"
        config={{
          // ...ONE_ON_ONE_VOICE_CALL_CONFIG,
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,

          avatarBuilder: ({userInfo}) => {
            return (
              <View style={{width: '100%', height: '100%'}}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                  source={{uri: `https://robohash.org/${userInfo.userID}.png`}}
                />
              </View>
            );
          },
          onCallEnd: (callID, reason, duration) => {
            console.log('########CallPage onCallEnd');
            props.navigation.navigate('Home');
          },
          timingConfig: {
            isDurationVisible: true,
            onDurationUpdate: duration => {
              console.log(
                '########CallWithInvitation onDurationUpdate',
                duration,
              );
              if (duration === 10 * 60) {
                ZegoUIKitPrebuiltCallService.hangUp();
              }
            },
          },
          topMenuBarConfig: {
            buttons: [ZegoMenuBarButtonName.minimizingButton],
          },
          onWindowMinimized: () => {
            console.log('[Demo]CallPage onWindowMinimized');
            props.navigation.navigate('Home');
          },
          onWindowMaximized: () => {
            console.log('[Demo]CallPage onWindowMaximized');
            props.navigation.navigate('CallPage', {
              userID: userID,
              userName: userName,
              callID: 'rn12345678',
            });
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
});
