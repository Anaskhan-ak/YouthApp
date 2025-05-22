import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import {
    BackArrow,
    VideoCallIcon,
    VoiceCallIcon
} from '../../../../assets/images/svgs';
import { styles } from './styles';

const ChatHeader = ({user, backPress}) => {
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
      <TouchableOpacity style={styles?.details}>
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
          <VoiceCallIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;
