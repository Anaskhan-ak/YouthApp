import { useState } from 'react';
import { Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  Calendar,
  Error,
  GrayLocationIcon,
  GrayTimeIcon,
  GrayWalletIcon,
  PasswordHide,
  PasswordShow,
} from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { styles } from './styles';

const Width = Dimensions.get('window').width;

const AuthInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry,
  disable,
  onPress,
  error,
  type,
  inputStyle,
  keyboardType,
}) => {
  const [hidePass, setHidePass] = useState(true);
  const handlePress = () => {
    setHidePass(!hidePass);
  };
  return (
    <View style={[styles?.container, inputStyle]}>
      {/* <Icon name={icon} size={20} color={'#A3A3A3'} /> */}
      {icon === 'location' && <GrayLocationIcon />}
      {(icon === 'wallet' || icon === 'cost') && <GrayWalletIcon />}
      {icon === 'time' && <GrayTimeIcon />}
      <TextInput
        editable={disable ? false : true}
        placeholderTextColor={colors?.black}
        secureTextEntry={secureTextEntry && hidePass ? true : false}
        style={styles?.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        dataDetectorTypes={type && type}
        keyboardType={keyboardType && keyboardType}
      />
      {(icon === 'calendar' || icon === 'time') && (
        <TouchableOpacity onPress={onPress} style={{right: 10}}>
          <Calendar />
        </TouchableOpacity>
      )}
      {icon === 'cost' && (
        <TouchableOpacity onPress={onPress} style={{right: 10}}>
          <Text>Youth Coin</Text>
        </TouchableOpacity>
      )}
      {error && (
        <View style={{right: placeholder === 'Confirm Password' ? -4 : 8}}>
          <Error />
        </View>
      )}
      {secureTextEntry && (
        <TouchableOpacity onPress={handlePress}>
          {hidePass ? (
            <PasswordShow width={width * 0.1} height={height * 0.015} />
          ) : (
            <PasswordHide width={width * 0.1} height={height * 0.018} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AuthInput;
