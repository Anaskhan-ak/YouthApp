import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { images } from '../../../assets/images';
import { EmptyCallsInboxIcon } from '../../../assets/images/svgs';
import EmptyComponent from '../../../components/empty';
import GradientText from '../../../components/text/GradientText';
import { height, Pixels, width } from '../../../constant';
import { getDataLocally } from '../../../helper';
import useUser from '../../../hooks/user';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const Chats = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const user = useUser()
  useEffect(() => {
    const getAllChats = async () => {
      try {
        const userDetails = await getDataLocally()
        const response = await apiCall?.getChats({userId: userDetails?.id});
        console.log('Successfully fetched chats');
        console.log('Response', response);
        setChats(response);
      } catch (error) {
        console.log('Error fetching chats');
      }
    };
    getAllChats();
  }, []);

  const renderItem = ({item}) => {
    const isGroup = item?.isGroup;
    const otherParticipant = item?.participants?.find(
      pt => pt?.userId !== user?.id,
    );
    return (
      <TouchableOpacity
        style={styles?.itemContainer}
        onPress={() => navigation?.navigate('Chat',{chatID: item?.id, receiver : otherParticipant?.user})}>
        {/* left */}
        <View style={styles?.itemLeft}>
          <Image
            source={
              isGroup ? {uri: item?.groupImage} : images?.defaultProfilePicture
            }
            style={styles?.image}
          />
          <View>
            <Text style={styles?.mainText}>
              {isGroup
                ? item?.groupName
                : `${otherParticipant?.user?.firstName} ${otherParticipant?.user?.lastName}`}
            </Text>
            <View style={styles?.subTextContainer}>
              <Text style={styles?.message}>{item?.messages[0]?.content}</Text>
              {item?.messages[0]?.content && <GradientText style={styles?.time}>2 D ago</GradientText>}
            </View>
          </View>
        </View>
        {/* right */}
        <Text style={styles?.itemRight}>47</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles?.container}>
      <FlatList
        data={chats}
        renderItem={renderItem}
        contentContainerStyle={styles?.listContent}
        ListEmptyComponent={
          <EmptyComponent
            Icon={<EmptyCallsInboxIcon />}
            text={'No chats yet'}
            subtext={'Notifications will be displayed here soon'}
          />
        }
      />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    height: height * 0.63,
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
    fontSize: Pixels(14),
  },
  subTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width : width * 0.7
  },
  message: {
    color: colors?.textGray,
    fontFamily: fonts?.montserratSemiBold,
    fontSize: Pixels(10),
  },
  time: {
    fontFamily: fonts?.montserratBold,
    fontSize: Pixels(9),
  },
  itemRight: {
    backgroundColor: colors?.RGB1,
    color: colors?.white,
    fontSize: Pixels(7.5),
    fontFamily: fonts?.montserratSemiBold,
    padding: width * 0.01,
    borderRadius: width * 0.05,
    width: width * 0.05,
    height: width * 0.05,
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: width * 0.02,
  },
});
