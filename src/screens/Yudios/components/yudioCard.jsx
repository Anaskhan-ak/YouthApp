import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import YudioPlayer from './yudioPlayer';

const YudioCard = ({yudio}) => {
  // console.log("YUDIO", yudio)
  return (
    <LinearGradient
      colors={['#A9F5FF', colors?.white]}
      style={styles?.container}>
      <Text style={styles?.heading}>{yudio?.title}</Text>
      <Image
        style={styles?.image}
        source={yudio?.thumbnail ? {uri : yudio?.thumbnail} : require('../../../assets/images/SignupImage.jpeg')}
      />
      <View style={styles?.player}>
        <YudioPlayer
          audioUrl={
            yudio?.url ? yudio?.url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
          }
          waveform={yudio?.waveform}
          showBackground={false}
        />
      </View>
    </LinearGradient>
  );
};

export default YudioCard;

const styles = StyleSheet.create({
  container: {
    height: height * 0.6,
    width: width * 0.8,
    borderRadius: width * 0.03,
    marginLeft: width * 0.03,
    backgroundColor: 'red',
    alignItems: 'center',
    padding: width * 0.02,
  },
  heading: {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.055,
    textAlign: 'center',
  },
  image: {
    width: width * 0.6,
    height: height * 0.25,
    margin: width * 0.03,
    borderRadius: width * 0.04,
  },
  player: {
    marginVertical: height * 0.01,
  },
});
