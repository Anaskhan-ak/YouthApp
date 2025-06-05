import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PlayIcon } from '../../../../assets/images/svgs';
import EmptyComponent from '../../../../components/empty';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';

const MomentPosts = ({posts}) => {
  return (
    <View style={styles?.container}>
      <FlatList
        data={posts}
        renderItem={({item}) => {
          return (
            <TouchableOpacity>
              <Image source={item?.Momment?.thumbnail} style={styles?.thumbnail} />
              <View style={styles?.footer}>
                <PlayIcon width={width * 0.025} height={width * 0.025} />
                <Text style={styles?.iconText}>375K</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        numColumns={3}
        style={styles?.list}
        ListEmptyComponent={<EmptyComponent text="No moments yet" /> }

      />
    </View>
  );
};

export default MomentPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbnail: {
    margin: width * 0.005,
    borderRadius: width * 0.02,
    width: width * 0.32,
    height: height * 0.22,
  },
  list : {
    marginVertical : height * 0.005
  },
  footer : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'flex-start',
    position : 'absolute',
    bottom : width * 0.02,
    left : width * 0.02
  },
iconText : {
    fontFamily : fonts?.montserratBold,
    fontSize : width * 0.025,
    color : colors?.white
}
});
