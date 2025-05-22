import { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActiveNewChatIcon,
  BlackCameraIcon,
  FileMicIcon,
  GradientMessageSendIcon,
  Sparkles,
} from '../../../assets/images/svgs';
import { width } from '../../../constant';
import { colors } from '../../../utils/colors';

const ChatFooter = () => {
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsTyping(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <View style={styles?.container}>
      <TouchableOpacity style={styles?.addButton}>
        <ActiveNewChatIcon />
      </TouchableOpacity>
      <TextInput
        style={styles?.input}
        placeholder="Message"
        placeholderTextColor={colors?.gray10}
        onPressIn={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
      />
      <TouchableOpacity style={styles?.sparkles}>
        <Sparkles />
      </TouchableOpacity>
      <View style={styles?.buttonContainer}>
        {isTyping ? (
          <>
            <TouchableOpacity style={styles?.button}>
              <BlackCameraIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles?.button}>
              <FileMicIcon width={width * 0.06} height={width * 0.06} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity>
            <GradientMessageSendIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ChatFooter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors?.white,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  addButton: {
    transform: [{rotate: '45deg'}],
  },
  input: {
    backgroundColor: colors?.gray,
    flex: 1,
    borderRadius: width * 0.02,
    padding: width * 0.03,
    color: colors?.text,
  },
  sparkles: {
    right: width * 0.06,
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: width * 0.01,
    alignItems: 'center',
  },
  button: {
    margin: width * 0.015,
    tintColor: colors?.black,
  },
});
