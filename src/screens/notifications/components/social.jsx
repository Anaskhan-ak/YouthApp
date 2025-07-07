import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
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

const Social = ({search}) => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useUser();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const userDetails = await getDataLocally();
        const notifications = await apiCall?.getNotifications({
          page: 1,
          pageSize: 15,
        });
        // console.log('notifications', notifications);
        setNotifications(
          notifications
            ?.filter(item => item?.notification_content_type === 'SOCIAL')
            ?.map(item => ({
              id: item?.id,
              userId: item?.userId,
              content: item?.content,
              userName: `${item?.notificationFrom?.firstName} ${item?.notificationFrom?.lastName}`,
              userImage: item?.notificationFrom?.photo,
              createdAt: item?.create_at,
              read: item?.read,
            })),
        );
      } catch (e) {
        console.log('Error fetching notifications', e);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles?.itemContainer}
        onPress={() =>
          setNotifications(prev =>
            prev?.map(notif =>
              notif?.id === item?.id ? {...notif, read: !notif?.read} : notif,
            ),
          )
        }>
        {/* left */}
        <View style={styles?.itemLeft}>
          <Image source={item?.userImage ? {uri: item?.userImage} : images?.defaultProfilePicture} style={styles?.image} />
          <View>
            <Text style={styles?.mainText}>{item?.userName}</Text>
            <View style={styles?.subTextContainer}>
              <Text style={styles?.message}>{item?.content}</Text>
              {item?.content && (
                <GradientText style={styles?.time}>
                  {moment(item?.createdAt)?.fromNow('seconds')}
                </GradientText>
              )}
            </View>
          </View>
        </View>
        {/* right */}
        {!item?.read && <Text style={styles?.itemRight}>1</Text>}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles?.container}>
      <FlatList
        data={notifications?.filter(
          item => item?.content?.includes(search) || item?.userName?.includes(search),
        )}
        renderItem={renderItem}
        contentContainerStyle={styles?.listContent}
        ListEmptyComponent={
          <EmptyComponent
            Icon={<EmptyCallsInboxIcon />}
            text={'No notifications yet'}
            subtext={'Notifications will be displayed here soon'}
          />
        }
      />
    </View>
  );
};

export default Social;

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
    width: width * 0.7,
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
