import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import {
  ActiveNewChatIcon,
  BackArrow,
  InactiveGroupChatIcon,
  InactiveNewChatIcon,
} from '../../../../assets/images/svgs';
import { height } from '../../../../constant';
import { styles } from './styles';

const InboxHeader = props => {
  return (
    <View style={styles?.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={'transparent'}
      />
      <TouchableOpacity style={styles?.backButton} onPress={props?.backPress}>
        <BackArrow />
      </TouchableOpacity>
      <Text style={styles?.title}>{props?.title}</Text>
      {props?.groupIcon && props?.onNewChatIconPress && (
        <View style={[styles?.buttonContainer, {flex : 0.2}]}>
          <TouchableOpacity style={styles?.button}>
            <InactiveGroupChatIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props?.onNewChatIconPress}
            style={styles?.button}>
            <InactiveNewChatIcon />
          </TouchableOpacity>
        </View>
      )}
      {props?.onCancelIconPress && (
        <View style={[styles?.buttonContainer, {flex : 0.1}]}>
          <TouchableOpacity
            style={[
              styles?.button
              ,{ top: height * 0.01},
            ]}
            onPress={props?.onCancelIconPress}>
            <ActiveNewChatIcon 
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default InboxHeader;
