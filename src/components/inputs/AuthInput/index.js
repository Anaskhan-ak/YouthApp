import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const Width = Dimensions.get('window').width;
import {useState} from 'react';
import {
  Calendar,
  Error,
  PasswordHide,
  PasswordShow,
} from '../../../assets/images/svgs';
import {height, width} from '../../../constant';
import {colors} from '../../../utils/colors';
import {styles} from './styles';

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
  type
}) => {
  const [hidePass, setHidePass] = useState(true);
  const handlePress = () => {
    setHidePass(!hidePass);
  };
  return (
    <View style={styles?.container}>
      {/* <Icon name={icon} size={20} color={'#A3A3A3'} /> */}

      <TextInput
        editable={disable?false:true}
        placeholderTextColor={colors?.black}
        secureTextEntry={secureTextEntry && hidePass ? true : false}
        style={styles?.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        dataDetectorTypes={type&&type}
      />
      {icon === 'calendar' && (
        <TouchableOpacity onPress={onPress} style={{right: 10}}>
          <Calendar />
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
