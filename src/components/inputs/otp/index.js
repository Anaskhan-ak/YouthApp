import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import {colors} from '../../../utils/colors';
import {width} from '../../../constant';
import { styles } from './styles';

const OtpInput = ({inputCount = 6, setOtp, otp}) => {
  const otpInputRef = useRef(null);
  useEffect(() => {
    if (setOtp) {
      setOtp(otp);
    }
  }, [otp]);

  return (
    <View style={styles.container}>
      <OTPTextInput
        ref={otpInputRef}
        inputCount={inputCount}
        tintColor={colors?.RGB2}
        containerStyle={styles?.otpContainer}
        textInputStyle={styles?.otpInput}
        handleTextChange={setOtp}
        placeholder='-'
      />
    </View>
  );
};



export default OtpInput;
