import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../assets/images';
import { Pixels, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const Likes = ({actions}) => {
  return (
    <View style={styles?.container}>
      <FlatList
        data={
          actions?.likes?.value?.length > 4
            ? [...actions?.likes?.value.slice(0, 4), {moreCount: actions?.likes?.value.length - 4}]
            : actions?.likes?.value
        }
        renderItem={({item, index}) => {
          const isMore = item?.moreCount !== undefined;
          return (
            <LinearGradient
              key={index}
              style={[
                styles?.gradientBorder,
                index !== 0 && {marginLeft: -width * 0.03},
              ]}
              colors={[colors?.RGB1, colors?.RGB2]}>
              {isMore ? (
                <Text style={styles?.gradientText}>+{item.moreCount}</Text>
              ) : (
                <Image source={item?.user?.photo ? {uri : item?.user?.photo} : images?.defaultProfilePicture} style={styles?.image} />
              )}
            </LinearGradient>
          );
        }}
        ListFooterComponent={actions?.likes?.value.length === 0 ? null : <Text style={styles?.text}>Like it</Text>}
        horizontal
        contentContainerStyle={{
          alignItems: 'center',
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Likes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  gradientBorder: {
    width: width * 0.085,
    height: width * 0.085,
    borderRadius: width * 0.085,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientText: {
    color: colors?.white,
    fontFamily: fonts?.montserratRegular,
    fontSize: width * 0.03,
  },
  image: {
    width: width * 0.0725,
    height: width * 0.0725,
    borderRadius: width * 0.0725,
  },
  text: {
    color: colors?.text,
    fontFamily: fonts?.montserratMedium,
    fontSize: Pixels(14),
    marginLeft: width * 0.02,
  },
});
