import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../utils/colors';
import {
  BlueTick,
} from '../../assets/images/svgs';
import {height, width} from '../../constant';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import ProfileHeader from '../../components/headers/profileHeader';
import Switch from '../../components/switch';
import GradientText from '../../components/text/GradientText';

const CreateWallet = () => {
  const [checkmark1, setCheckmark1] = useState(false);
  const [checkmark2, setCheckmark2] = useState(false);
  const [checkmark3, setCheckmark3] = useState(false);
  const [isEnabled, setEnabled] = useState(false);

  const handleCheck_1 = () => {
    setCheckmark1(!checkmark1);
  };
  const handleCheck_2 = () => {
    setCheckmark2(!checkmark3);
  };
  const handleCheck_3 = () => {
    setCheckmark3(!checkmark3);
  };
  return (
    <View style={styles?.container}>
      <LinearGradient
        style={styles?.header}
        colors={[colors?.RGB1, colors?.RGB2]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <StatusBar
          translucent
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
        />
        <ProfileHeader />
      </LinearGradient>
      <View style={styles?.contentContainer}>
        <Text style={styles?.heading}>Information you{'\n'}should know...</Text>
        <Text style={[styles?.title, {left: 0, marginTop: 20}]}>
          Please acknowledge the critical role of your seed phrase by checking
          the boxes below
        </Text>
        <View style={styles?.bulletView}>
          <TouchableOpacity onPress={handleCheck_1}>
            {checkmark1 ? (
              <LinearGradient
                style={styles?.unSelect}
                colors={[colors?.RGB1, colors?.RGB2]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <View style={styles?.checkRememberMe} />
              </LinearGradient>
            ) : (
              <BlueTick />
            )}
          </TouchableOpacity>
          <Text style={styles?.title}>
            Losing my seed phrase means my funds are lost forever.
          </Text>
        </View>
        <View style={styles?.bulletView}>
          <TouchableOpacity onPress={handleCheck_2}>
            {checkmark2 ? (
              <LinearGradient
                style={styles?.unSelect}
                colors={[colors?.RGB1, colors?.RGB2]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <View style={styles?.checkRememberMe} />
              </LinearGradient>
            ) : (
              <BlueTick />
            )}
          </TouchableOpacity>
          <Text style={styles?.title}>
            Losing my seed phrase means my funds are lost forever.
          </Text>
        </View>
        <View style={styles?.bulletView}>
          <TouchableOpacity onPress={handleCheck_3}>
            {checkmark3 ? (
              <LinearGradient
                style={styles?.unSelect}
                colors={[colors?.RGB1, colors?.RGB2]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <View style={styles?.checkRememberMe} />
              </LinearGradient>
            ) : (
              <BlueTick />
            )}
          </TouchableOpacity>
          <Text style={styles?.title}>
            Losing my seed phrase means my funds are lost forever.
          </Text>
        </View>
      </View>
      <View style={{bottom: 40, paddingHorizontal: width * 0.08}}>
        <View style={styles?.bulletView}>
          <Switch
            color1={colors?.lightGreen}
            color2={colors?.lightGreen}
            value={isEnabled}
            onValueChange={setEnabled}
          />
          <Text style={[styles?.title, {fontSize: width * 0.032}]}>
            I have read and accept the
          </Text>
           <GradientText style={styles?.text}>Term of Use</GradientText>
        </View>
         <PrimaryButton style={{marginTop:0}} title={'Confirm'}/>
      </View>
    </View>
  );
};

export default CreateWallet;
