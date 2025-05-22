import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../../../assets/images';
import { EmptyCallsInboxIcon } from '../../../assets/images/svgs';
import EmptyComponent from '../../../components/empty';
import GradientText from '../../../components/text/GradientText';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const Calls = () => {
  const calls = Array.from({length: 20}, () => ({
    name: 'Keneth Alleen',
    image: images?.defaultProfilePicture,
    message: 'Video call 7:45',
    time: '2 D ago',
    count: 47,
  }));

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles?.itemContainer}>
        {/* left */}
        <View style={styles?.itemLeft}>
          <Image source={item?.image} style={styles?.image} />
          <View style={styles?.textContainer}>
            <Text style={styles?.mainText}>{item?.name}</Text>
            <View style={styles?.subTextContainer}>
              <Text style={styles?.message}>{item?.message}</Text>
            </View>
          </View>
        </View>
        {/* right */}
        <View style={styles?.rightContainer}>
          <Text style={styles?.itemRight}>{item?.count}</Text>
          <GradientText style={styles?.time}>{item?.time}</GradientText>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles?.container}>
      <FlatList
        data={calls}
        renderItem={renderItem}
        contentContainerStyle={styles?.listContent}
        style={styles?.list}
        ListEmptyComponent={
          <EmptyComponent
            icon={<EmptyCallsInboxIcon />}
            text={'No chats yet'}
            subtext={'Notifications will be displayed here soon'}
          />
        }
      />
    </View>
  );
};

export default Calls;

const styles = StyleSheet.create({
    container : {
        height : height * 0.63
    },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: width * 0.03,
    borderBottomWidth: width * 0.0005,
    borderColor: colors?.grayTransparent,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.1,
    marginRight: width * 0.02,
  },
  mainText: {
    color: colors?.text,
    fontFamily: fonts?.montserratSemiBold,
    fontSize: width * 0.037,
  },
  subTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  message: {
    color: colors?.textGray,
    fontFamily: fonts?.montserratSemiBold,
    fontSize: width * 0.027,
  },
  time: {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.027,
  },
  itemRight: {
    backgroundColor: colors?.RGB1,
    color: colors?.white,
    fontSize: width * 0.02,
    fontFamily : fonts?.montserratBold,
    padding: width * 0.01,
    borderRadius: width * 0.05,
    width: width * 0.05,
    height: width * 0.05,
    textAlign: 'center',
  },
  list: {},
  listContent: {
    paddingHorizontal: width * 0.02,
  },
  textContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
