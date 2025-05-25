import { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActiveNewChatIcon,
  BlackCameraIcon,
  ChatContactIcon,
  ChatDocumentIcon,
  ChatGalleryIcon,
  ChatLocationIcon,
  ChatYouthIcon,
  FileMicIcon,
  GradientMessageSendIcon,
  Sparkles,
} from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const ChatFooter = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [add, setAdd] = useState(false);
  const icons = [
    {
      name: 'documents',
      text : "Document",
      icon: <ChatDocumentIcon />,
      active: false,
    },
    {
      name: 'gallery',
      text : "Gallery",
      icon: <ChatGalleryIcon />,
      active: false,
    },
    {
      name: 'location',
      text : 'Location',
      icon: <ChatLocationIcon />,
      active: false,
    },
    {
      name: 'contact',
      text : 'Contact',
      icon: <ChatContactIcon />,
      active: false,
    },
    {
      name: 'youth',
      text : 'Transfer',
      icon: <ChatYouthIcon />,
      active: false,
    },
  ];
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
      <View style={styles?.content}>
        <TouchableOpacity
          style={[styles?.addButton, add && {transform: [{rotate: '0deg'}]}]}
          onPress={() => setAdd(!add)}>
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
            <TouchableOpacity style={styles?.sendIcon}>
              <GradientMessageSendIcon />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles?.button}>
                <BlackCameraIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles?.button}>
                <FileMicIcon width={width * 0.06} height={width * 0.06} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      {add && (
        <FlatList
          data={icons}
          renderItem={({item}) => (
            <View >
            <TouchableOpacity style={styles?.icon}>
              {item?.icon}
            </TouchableOpacity>
            <Text style={styles?.iconText}>{item?.text}</Text>
            </View>
          )}
          horizontal
          style={styles?.list}
          contentContainerStyle={styles?.listContent}
        />
      )}
    </View>
  );
};

export default ChatFooter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.white,
    padding: width * 0.04,
  },
  content: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  addButton: {
    transform: [{rotate: '45deg'}],
    marginRight: width * 0.02,
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
  sendIcon: {
    marginRight: width * 0.03,
  },
  list: {
    marginTop: height * 0.01,
    padding: width * 0.02,
  },
  listContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    backgroundColor: colors?.white,
    width: width * 0.14,
    height: height * 0.07,
    marginHorizontal: width * 0.02,
    borderRadius: width * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors?.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
  iconText : {
    fontFamily : fonts?.montserratRegular,
    fontSize : width * 0.025,
    color : colors?.text,
    textAlign : "center",
    marginTop : height * 0.01
  }
});
