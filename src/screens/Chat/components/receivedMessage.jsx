import moment from 'moment';
import { StyleSheet, Text, View } from 'react-native';
import ChatPlayer from '../../../components/audio/ChatPlayer';
import { width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const ReceivedMessage = ({message}) => {
  // console.log("Message", message)
  const TextMessage = ({text, time}) => {
    return (
      <View style={styles?.textContainer}>
        <View
          style={styles?.gradient}>
          <Text style={styles?.text}>{text}</Text>
        </View>
        <Text style={styles?.time}>{moment(time).format('HH:MM')}</Text>
      </View>
    );
  };

  const VoiceMessage = ({audio, time, user}) => {
    return (
      <View>
        <ChatPlayer audio={audio} user={user} />
        <Text style={styles?.time}>{moment(time).format('HH:MM')}</Text>
      </View>
    );
  };
return (
    <View style={styles?.container}>
      {message?.messageType === 'TEXT' && (
        <TextMessage text={message?.content} time={message?.createdAt} />
      )}
      {message?.messageType === 'VOICE' && (
        <VoiceMessage
          audio={{url: message?.mediaUrl[0], waveform: message?.waveform}}
          time={message?.createdAt}
          user={message?.sender}
        />
      )}
    </View>
  );
}

export default ReceivedMessage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  textContainer : {
    padding: width * 0.02
  },
  gradient: {
    padding: width * 0.02,
    borderRadius: width * 0.04,
    margin: width * 0.01,
    // width : width * 0.5
    maxWidth: width * 0.6,
    alignItems: 'center',
    backgroundColor : colors?.white
  },
  text: {
    color: colors?.text,
    fontFamily: fonts?.montserratMedium,
    textAlign: 'left',
  },
  time : {
    textAlign: 'left',
    marginRight: width * 0.02,
    fontFamily: fonts?.montserratMedium,
    fontSize : width * 0.03
  }
});