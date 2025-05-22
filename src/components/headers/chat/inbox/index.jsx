import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import {
  ActiveNewChatIcon,
  BackArrow,
  InactiveGroupChatIcon,
  InactiveNewChatIcon,
} from '../../../../assets/images/svgs';
import { height } from '../../../../constant';
import { styles } from './styles';

const InboxHeader = ({
  backPress,
  title,
  onGroupIconPress,
  onNewChatIconPress,
  onCancelIconPress,
}) => {
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
      <Text style={styles?.title}>{title}</Text>
      <View style={[styles?.buttonContainer, {flex: 0.2}]}>
        {onGroupIconPress && (
          <TouchableOpacity
            style={styles?.button}
            onPress={onGroupIconPress}>
            <InactiveGroupChatIcon />
          </TouchableOpacity>
        )}
        {onNewChatIconPress && (
          <TouchableOpacity
            onPress={onNewChatIconPress}
            style={styles?.button}>
            <InactiveNewChatIcon />
          </TouchableOpacity>
        )}
        {onCancelIconPress && (
          <TouchableOpacity
            style={[styles?.button, {bottom: -height * 0.01}]}
            onPress={onCancelIconPress}>
            <ActiveNewChatIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InboxHeader;
