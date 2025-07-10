import moment from 'moment';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ChatPlayer from '../../../components/audio/ChatPlayer';
import { width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const SentMessage = ({message}) => {
  const TextMessage = ({text, time}) => {
    return (
      <View style={styles?.textContainer}>
        <LinearGradient
          colors={[colors?.RGB1, colors?.RGB2]}
          style={styles?.gradient}>
          <Text style={styles?.text}>{text}</Text>
        </LinearGradient>
        <Text style={styles?.time}>{moment(time).format('HH:MM')}</Text>
      </View>
    );
  };

  const VoiceMessage = ({audio, time, user}) => {
    return (
      <View>
        <View style={styles?.player}><ChatPlayer audio={audio} user={user} /></View>
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
};

export default SentMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'flex-end',
  },
  textContainer: {
    padding: width * 0.02,
  },
  gradient: {
    padding: width * 0.02,
    borderRadius: width * 0.04,
    margin: width * 0.01,
    // width : width * 0.5
    maxWidth: width * 0.6,
    alignItems: 'center',
  },
  text: {
    color: colors?.white,
    fontFamily: fonts?.montserratMedium,
    textAlign: 'right',
  },
  time: {
    textAlign: 'right',
    marginRight: width * 0.02,
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.03,
  },
  player : {
    marginBottom : width * 0.02
  }
});
