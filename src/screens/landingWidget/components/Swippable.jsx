import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { DropDownIcon } from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors/index.js';
import { fonts } from '../../../utils/fonts/index.js';

const SwipeableItem = ({item, onSwipe, showContent}) => {
  const renderLeftActions = () => <View style={{width: 200}} />;
  const renderRightActions = () => <View style={{width: 200}} />;

  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        onSwipeableOpenStartDrag={() => onSwipe(item.id)}>
        <TouchableOpacity style={styles?.swipeButton}>
          {showContent && (
            <View style={styles?.swipeButtonContainer}>
              <Image
                style={styles?.profileIcon}
                source={item?.userImage ? {uri : item?.userImage} : require('../../../assets/images/onboarding/Onboarding1.png')}
              />
              <View style={{marginLeft: width * 0.0125}}>
                <Text style={styles?.profileName}>{item?.userName}</Text>
                <Text style={styles?.notificationMessage}>
                  {item?.content?.length > 15 ? `${item?.content?.slice(0,15)}...` : item?.content}
                </Text>
              </View>
              <Text style={styles?.notificationTime}>{moment(item?.createdAt)?.format('HH:mm')}</Text>
            </View>
          )}
        </TouchableOpacity>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
};

const SwipeableList = ({setVisibility}) => {
  const [items, setItems] = useState();
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notifications = await apiCall?.getNotifications({page : 1, pageSize : 5});
        console.log("Notifications", notifications)
        setItems(notifications?.map(item => ({
            id: item?.id,
            userId: item?.userId,
            content: item?.content,
            userName: `${item?.notificationFrom?.firstName} ${item?.notificationFrom?.lastName}`,
            userImage: item?.notificationFrom?.photo,
            createdAt : item?.create_at
          })),
        );
      } catch (e) {
        console.log('Error fetching notifications', e);
      }
    };
    fetchNotifications();
  }, []);

  const handleSwipe = itemId => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    if (updatedItems.length === 0) {
      setVisibility(false);
    }
  };

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SwipeableItem
            item={item}
            onSwipe={handleSwipe}
            showContent={true}
          />
          // <Text style={{color : 'black'}}>QQQQQQQQQQQQ</Text>
        )}
      />
    </View>
  );
};

export const StackedNotifications = ({count}) => {
  const [items, setItems] = useState([
    {id: '1', text: 'Item 1'},
    {id: '2', text: 'Item 2'},
    {id: '3', text: 'Item 3'},
  ]);
  const [expanded, setExpanded] = useState(false);

  // Enable animations on Android
  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const handleSwipe = itemId => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newItems = items.filter(item => item.id !== itemId);
    setItems(newItems);
    count(newItems.length);
  };

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    if (newExpanded === true) {
      count(items?.length);
    } else {
      count(-1);
    }
  };

  const toggleButtonStyle = expanded
    ? {
        // backgroundColor: 'rgba(250, 250, 250, 0.34)',

        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        alignSelf: 'flex-end',
        backgroundColor: 'transparent',
        marginRight: 20,
        marginBottom: 5,
        flexDirection: 'row',
      }
    : {
        // backgroundColor: 'rgba(250, 250, 250, 0.34)',
        backgroundColor: 'transparent',
        borderRadius: 10,
        alignItems: 'center',
        position: 'absolute',
        zIndex: 100,
        width: width * 0.9,
        height: height * 0.08,
        flexDirection: 'row',
      };

  return (
    <View style={styles?.stackContainer}>
      {items?.length > 0 && (
        <TouchableOpacity onPress={toggleExpand} style={toggleButtonStyle}>
          {expanded && (
            <>
              <TouchableOpacity
                onPress={toggleExpand}
                style={styles?.stackToggleButton}>
                <View
                  style={[
                    styles?.dropdown,
                    {transform: [{rotate: expanded ? '0deg' : '180deg'}]},
                  ]}>
                  <DropDownIcon />
                </View>
                <Text style={styles.toggleText}>Show Less</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles?.crossButton}
                onPress={() => {
                  setItems([]);
                  count(0);
                }}>
                <Text style={styles?.crossText}>X</Text>
              </TouchableOpacity>
            </>
          )}
        </TouchableOpacity>
      )}
      {items.map((item, index) => {
        const isTop = index === 0;
        const itemStyle = expanded
          ? {
              position: 'relative',
              marginBottom: 10,
              opacity: 1,
              width: width * 0.9,
              zIndex: items.length - index,
            }
          : {
              position: 'absolute',
              top: index * 10,
              opacity: isTop ? 1 : 0.5,
              width: width * (0.9 - index * 0.05),
              zIndex: items.length - index,
            };

        return (
          <View key={item.id} style={[styles.stackItem, itemStyle]}>
            <SwipeableItem
              item={item}
              onSwipe={() => handleSwipe(item.id)}
              showContent={expanded || isTop}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stackItem: {
    alignSelf: 'center',
  },
  toggleText: {
    fontSize: width * 0.023,
    fontFamily: fonts.Regular,
    color: colors.black,
  },
  dropdown: {
    marginRight: width * 0.02,
  },
  crossButton: {
    backgroundColor: 'rgba(250, 250, 250, 0.34)',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.04,
    height: width * 0.04,
    borderRadius: (width * 0.08) / 2,
  },
  crossText: {
    fontFamily: fonts.Regular,
    fontSize: width * 0.025,
    textAlign: 'center',
    color: colors.text,
  },
  swipeButton: {
    backgroundColor: 'rgba(250, 250, 250, 0.3)', // Keep transparency
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: width * 0.03,
    margin: width * 0.005,
    height: height * 0.085,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    height: width * 0.11,
    width: width * 0.11,
    borderRadius: (width * 0.11) / 2,
  },
  swipeButtonContainer: {flexDirection: 'row'},
  profileName: {
    fontSize: width * 0.037,
    fontFamily: fonts?.montserratBold,
    color: colors?.text,
  },
  notificationMessage: {
    fontSize: width * 0.03,
    fontFamily: fonts?.montserratRegular,
    color: colors?.text,
  },
  notificationTime: {
    fontFamily: fonts?.montserratRegular,
    fontSize: width * 0.0245,
    alignSelf: 'center',
    marginTop: -height * 0.03,
    color: colors?.text,
  },
  stackContainer: {
    minHeight: height * 0.28,
    // flex : 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  stackToggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: width * 0.03,
    backgroundColor: 'rgba(250, 250, 250, 0.34)',
    paddingVertical: height * 0.003,
    paddingHorizontal: width * 0.025,
    borderRadius: width * 0.2,
  },
});

export default SwipeableList;
