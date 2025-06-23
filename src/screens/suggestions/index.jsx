import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';
import { InactiveLike, Plus } from '../../assets/images/svgs';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import InboxHeader from '../../components/headers/chat/inbox';
import UserPostHeader from '../../components/post/subComponents/userPostHeader';
import { height, width } from '../../constant';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

const SuggestedContent = ({route}) => {
  const {headerTitle, data, type} = route?.params;
  const navigation = useNavigation();
  return (
    <View style={styles?.container}>
      <InboxHeader title={headerTitle} backPress={() => navigation?.goBack()} />
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          if (type === 'users') {
            return (
              <View style={styles?.card} key={index}>
                <Image source={item?.cover} style={styles?.cover} />
                <Image source={item?.photo} style={styles?.photo} />
                <Text style={styles?.text}>{item?.name}</Text>
                <PrimaryButton width={width * 0.26} title="Follow" />
              </View>
            );
          }

          if (type === 'moments') {
            return (
              <View key={index} style={styles?.content}>
                <Video
                  source={{uri: item?.Momments?.url}}
                  style={styles?.video}
                />
                {/* header */}
                <View style={styles?.overlay}>
                  <View style={styles?.userHeader}>
                    <UserPostHeader user={item?.user} post={item} />
                  </View>
                  <View style={styles?.bottom}>
                    <Text style={styles?.caption}>
                      {item?.Momments?.caption?.length > 20
                        ? `${item?.Momments?.caption?.slice(0, 20)}...`
                        : item?.Momments?.caption}
                    </Text>
                    <View style={styles?.buttons}>
                      <TouchableOpacity style={styles?.button}>
                        <InactiveLike />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles?.button,
                          {backgroundColor: colors?.pink},
                        ]}>
                        <Plus width={20} height={20} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }
        }}
        style={styles?.list}
        numColumns={2}
      />
    </View>
  );
};

export default SuggestedContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: width * 0.01,
    alignItems: 'items-start',
    justifyContent: 'justify-between',
    backgroundColor: colors?.white,
    borderRadius: width * 0.02,
    padding: width * 0.02,
  },
  cover: {
    height: height * 0.06,
    width: width * 0.38,
    alignSelf: 'center',
    borderTopLeftRadius: width * 0.02,
    borderTopRightRadius: width * 0.02,
  },
  photo: {
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.16,
    borderWidth: width * 0.006,
    borderColor: colors?.white,
    shadowColor: colors?.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    // position : 'absolute',
    // zIndex : 100,
    marginTop: -height * 0.02,
    alignSelf: 'center',
  },
  text: {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.04,
    color: colors?.text,
    alignSelf: 'center',
    marginVertical: height * 0.01,
  },
  list: {
    alignSelf: 'center',
    marginVertical: height * 0.02,
  },
   content: {
    margin: width * 0.02,
    backgroundColor: 'yellow',
    
  },
  video: {
    width: width * 0.45,
    height: height * 0.3,
    borderRadius: width * 0.02,
    backgroundColor: 'black',
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    zIndex: 10,
    top: height * 0.01,
     width: width * 0.43,
    height: height * 0.27,
    // alignItems : 'space-between',
    justifyContent : 'space-between',
    alignSelf: 'center',
  },
  userHeader: {
    transform: [{scale: 0.7}],
    marginLeft : -width * 0.07
  },
  bottom : {
    flexDirection : "row",
    alignItems : "center",
    justifyContent : 'space-between',
    marginHorizontal : width * 0.02
  },
  caption : {
    alignSelf : 'baseline'
  },
  buttons:{},
  button : {
    width : width * 0.08,
    height : width * 0.08,
    borderRadius : width * 0.08,
    alignItems : 'center',
    justifyContent : "center",
    backgroundColor : colors?.gray,
    marginVertical : height * 0.01
  }
});
