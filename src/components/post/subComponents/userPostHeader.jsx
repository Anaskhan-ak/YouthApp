import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../assets/images';
import { BlueTick } from '../../../assets/images/svgs';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const UserPostHeader = ({user}) => {
  return (
    <TouchableOpacity style={styles?.container}>
      <LinearGradient
        colors={[colors?.RGB1, colors?.RGB2]}
        style={styles?.imageBorder}>
        <Image
          source={user?.photo ? user?.photo : images?.defaultProfilePicture}
          style={styles?.image}
        />
      </LinearGradient>
      <View style={styles?.content}>
       <View style={styles?.row}>
         <Text
          style={styles?.name}>{`${user?.firstName} ${user?.lastName}`}</Text>
          <View style={styles?.tick}><BlueTick/></View>
       </View>
        <View style={styles?.row}>
          <PrimaryButton
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width : width * 0.18,
              height : height * 0.024,
            }}
            textStyle={{
                fontFamily : fonts?.montserratMedium,
                fontSize : width * 0.03,
                color : colors?.white,                
            }}
            title="1h ago"
          />
          <PrimaryButton
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width : width * 0.18,
              height : height * 0.024,
              marginLeft : width * 0.01
            }}
            textStyle={{
                fontFamily : fonts?.montserratMedium,
                fontSize : width * 0.03,
                color : colors?.white,                
            }}
            title="Dubai"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserPostHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
  },
  imageBorder: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: width * 0.13,
  },
  content: {
    marginLeft: width * 0.02,
  },
  name: {
    fontFamily: fonts?.montserratExtraBold,
    fontSize: width * 0.045,
    color: colors?.text,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
  },
  tick : {
    marginLeft : width * 0.06
  }
});
