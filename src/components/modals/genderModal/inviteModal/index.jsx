import Clipboard from '@react-native-clipboard/clipboard';
import { useRef } from 'react';
import {
  Alert,
  Animated,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Share from 'react-native-share';
import {
  CopyIcon,
  MailIcon,
  MessageIcon,
  MessengerIcon,
  RightArrow,
  TwitterIcon,
  WhatsappIcon,
} from '../../../../assets/images/svgs';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';

const InviteModal = props => {
  const contacts = [
    {
      id: 1,
      name: 'Sannya Wasim',
      photo: require('../../../../assets/images/SignupImage.jpeg'),
    },
    {
      id: 2,
      name: 'Sannya Wasim',
      photo: require('../../../../assets/images/SignupImage.jpeg'),
    },
    {
      id: 3,
      name: 'Sannya Wasim',
      photo: require('../../../../assets/images/SignupImage.jpeg'),
    },
  ];
  const icons = [
    {
      id: 0,
      name: 'Message',
      image: <MessageIcon />,
    },
    {
      id: 1,
      name: 'Mail',
      image: <MailIcon />,
    },
    {
      id: 2,
      name: 'Messenger',
      image: <MessengerIcon />,
    },
    {
      id: 3,
      name: 'Whatsapp',
      image: <WhatsappIcon />,
    },
    {
      id: 4,
      name: 'Twitter',
      image: <TwitterIcon />,
    },
  ];
  const translateY = useRef(new Animated.Value(0)).current;

  const copyToClipboard = () => {
    Clipboard.setString('hello world');
    Alert.alert(
      'Copied to clipboard!',
      '', // This is `text2`, the message body; left blank intentionally
      [{text: 'OK'}],
      {cancelable: true},
    );
  };

  const shareToTwitter = async () => {
    const shareOptions = {
      title: 'Share via Twitter',
      social: Share.Social.TWITTER,
      message: 'Check out this link: https://google.com',
      url: 'https://google.com',
    };

    try {
      const ShareResponse = await Share.shareSingle(shareOptions);
      console.log('Result =>', ShareResponse);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  const shareToWhatsApp = contact => {
    const text = 'https://awesome.contents.com/';
    Linking.openURL(
      `whatsapp://send?phone=${contact}&text=${encodeURIComponent(text)}`,
    );
  };

  const shareEmailImage = async () => {
    const text = 'google@gmail.com';
    Linking.openURL(`mailto:${text}`);
  };

  const shareToMessage = async contact => {
    const text = encodeURIComponent('https://awesome.contents.com/');
    Linking.openURL(`sms:${contact}?body=${text}`);
  };

  const shareToMessenger = async () => {
    const shareOptions = {
      title: 'Share via Messenger',
      social: Share.Social.MESSENGER,
      message: 'Check out this link: https://google.com',
      url: 'https://google.com',
    };

    try {
      const ShareResponse = await Share.shareSingle(shareOptions);
      console.log('Result =>', ShareResponse);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  const handleIconClick = (name, contact) => {
    switch (name) {
      case 'Whatsapp':
        shareToWhatsApp(contact);
        break;
      case 'Mail':
        shareEmailImage();
        break;
      case 'Message':
        shareToMessage(contact);
        break;
      case 'Messenger':
        shareToMessenger();
        break;
      case 'Twitter':
        shareToTwitter();
        break;
      default:
        console.log(`${name} share not implemented`);
    }
  };

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: 500,
      duration: 200,
      useNativeDriver: true,
    }).start(() => props?.setModal(false)); // You must pass an `onClose` prop
  };

  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: translateY}}],
    {useNativeDriver: true},
  );

  const onHandlerStateChange = event => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationY > 100) {
        handleClose();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <View style={styles?.container}>
      <Modal
        animationType="slide"
        visible={props?.visible}
        transparent
        statusBarTranslucent>
        {/* Close when clicked outside */}
        <Pressable style={styles.modalBackground} onPress={handleClose}>
          {/* Stop propagation to avoid closing when tapping inside */}
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}>
            <Animated.View
              style={[styles.modalContainer, {transform: [{translateY}]}]}
              onStartShouldSetResponder={() => true}>
              <View style={styles?.content}>
                <View style={styles?.dash} />
                <Text style={styles?.heading}>Share To</Text>

                <FlatList
                  data={contacts}
                  renderItem={({item}) => (
                    <TouchableOpacity style={styles?.contact}>
                      <Image source={item?.photo} style={styles?.userImage} />
                      <Text
                        style={[styles?.userName, {fontSize: width * 0.03}]}>
                        {item?.name?.split(' ').join('\n')}
                      </Text>
                    </TouchableOpacity>
                  )}
                  horizontal
                  style={styles?.list1}
                  contentContainerStyle={styles?.list1Container}
                  ListFooterComponent={() => (
                    <TouchableOpacity style={styles?.moreContactsContent}>
                      <View style={styles?.moreContactsIcon}>
                        <RightArrow />
                      </View>
                      <Text style={styles?.userName}>{`More\nContacts`}</Text>
                    </TouchableOpacity>
                  )}
                />

                <View style={styles?.line} />

                <FlatList
                  data={icons}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[styles?.contact, {margin: width * 0.01}]}
                      onPress={() => handleIconClick(item?.name)}>
                      <View style={styles?.userImage}>{item?.image}</View>
                      <Text
                        style={[styles?.userName, {fontSize: width * 0.029}]}>
                        {item?.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                  horizontal
                  style={styles?.list1}
                  contentContainerStyle={styles?.list1Container}
                />

                <View style={styles.copyContainer}>
                  <Text style={styles.copyText}>Copy Link</Text>
                  <TouchableOpacity onPress={copyToClipboard}>
                    <CopyIcon />
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </PanGestureHandler>
        </Pressable>
      </Modal>
    </View>
  );
};

export default InviteModal;

const styles = StyleSheet.create({
  container: {
    height: height * 0.45,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: to dim the background
  },
  modalContainer: {
    height: height * 0.45, // Adjust this to reduce height
    backgroundColor: colors?.white,
    borderTopLeftRadius: width * 0.08,
    borderTopRightRadius: width * 0.08,
    padding: width * 0.04,
  },
  content: {
    // backgroundColor: 'red',
    padding: width * 0.005,
    flex: 1,
  },
  dash: {
    backgroundColor: colors?.gray11,
    width: width * 0.2,
    height: height * 0.005,
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  contact: {
    margin: width * 0.02,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userImage: {
    width: width * 0.15,
    height: height * 0.07,
    borderRadius: width * 0.02,
    // backgroundColor: 'red',
  },
  userName: {
    textAlign: 'center',
    fontFamily: fonts?.montserratMedium,
    marginTop: height * 0.002,
    letterSpacing: width * 0.002,
  },
  list1: {
    // backgroundColor : 'yellow',
  },
  list1Container: {
    alignItems: 'center',
  },
  moreContactsContent: {
    borderRadius: width * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: width * 0.01,
  },
  moreContactsIcon: {
    width: width * 0.15,
    height: height * 0.07,
    borderRadius: width * 0.02,
    backgroundColor: colors?.gray11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.045,
    color: colors?.black,
    textAlign: 'center',
    marginTop: height * 0.005,
    marginBottom: height * 0.02,
  },
  line: {
    width: width,
    height: height * 0.001,
    backgroundColor: colors?.gray,
    marginVertical: height * 0.015,
    marginLeft: -width * 0.045,
  },
  copyContainer: {
    borderColor: colors.gray,
    borderWidth: width * 0.002,
    flexDirection: 'row',
    padding: width * 0.03,
    borderRadius: width * 0.03,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.9,
    marginTop: height * 0.02,
  },
  copyText: {
    fontSize: width * 0.04,
    fontFamily: fonts?.montserratRegular,
    color: colors.text,
  },
});
