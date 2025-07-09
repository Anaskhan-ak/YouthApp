import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL } from 'zego-uikit-prebuilt-call-rn';

const CallScreen = () => {
  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={1017984930} // 🔁 Replace with your AppID
        appSign={"d623688f27b5f06360f2c164c2898e950a7fd95c8a296dbac0bd89e1e2be81bc"} // 🔁 Replace with your AppSign
        userID={"user_1"} // Must be unique per user
        userName={"Anas"}
        callID={"test_call"} // A unique call ID
        config={{
          scenario: ONE_ON_ONE_VIDEO_CALL,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default CallScreen;
