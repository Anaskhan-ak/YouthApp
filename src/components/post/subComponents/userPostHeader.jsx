import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../assets/images';
import { BlueTick } from '../../../assets/images/svgs';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import { height, Pixels, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const UserPostHeader = ({post, user}) => {
  const navigation = useNavigation();

  const formatDate = params => {
    const array = params?.split(' ');
    let date = array[0];
    const text = array[1];
    const ago = array[2];
    if (date === 'a' ){
      date = 1
    }
    return `${date}${text} ${ago}`;
  };
  return (
    <TouchableOpacity
      onPress={() => navigation?.navigate('PostDetails', {post: post})}
      style={styles?.container}>
      <LinearGradient
        colors={[colors?.RGB1, colors?.RGB2]}
        style={styles?.imageBorder}>
        <Image
          source={user?.photo ? {uri:user?.photo} : images?.defaultProfilePicture}
          style={styles?.image}
        />
      </LinearGradient>
      <View style={styles?.content}>
        <View style={styles?.row}>
          <Text
            style={styles?.name}>{`${user?.firstName} ${user?.lastName}`}</Text>
          <View style={styles?.tick}>
            <BlueTick />
          </View>
        </View>
        <View style={[styles?.row,{marginTop : -height * 0.005}]}>
          <PrimaryButton
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: width * 0.14,
              height: height * 0.024,
            }}
            textStyle={{
              fontFamily: fonts?.montserratSemiBold,
              fontSize: Pixels(10),
              color: colors?.white,
            }}
            title={formatDate(
              moment(post?.createdAt)
                .startOf('hour')
                .fromNow()
                ?.replace('days', 'd')
                ?.replace('day', 'd')
                ?.replace('hours', 'h')
                ?.replace('hour', 'h')
                ?.replace('minutes', 'm')
                ?.replace('minute', 'm')
                ?.replace('seconds', 's')
                ?.replace('second', 's')
                ?.replace('months', 'mth')
                ?.replace('month', 'mth'),
            )}
          />
          {post?.location && (
            <PrimaryButton
              style={{
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: width * 0.16,
                height: height * 0.024,
                marginLeft: width * 0.01,
              }}
              textStyle={{
                fontFamily: fonts?.montserratSemiBold,
                fontSize: Pixels(10),
                color: colors?.white,
              }}
              title={
                post?.location?.length > 20
                  ? `${post?.location?.slice(0, 20)}...`
                  : post?.location
              }
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserPostHeader;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'start',
  },
  imageBorder: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: width * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.12,
  },
  content: {
    marginLeft: width * 0.04,
  },
  name: {
    fontFamily: fonts?.montserratExtraBold,
    fontSize: PixelRatio.getFontScale()*14,
    color: colors?.text,
    lineHeight : PixelRatio.getFontScale()*25,
    letterSpacing : PixelRatio.getFontScale()*0.5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
  },
  tick: {
    marginLeft: width * 0.06,
  },
});
