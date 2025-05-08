import moment from 'moment';
import {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {DropDownIcon} from '../../../assets/images/svgs';
import {height, width} from '../../../constant';
import {styles} from '../styles/Swippable';

const ITEM_HEIGHT = 70;

const SwipeableItem = ({item, onRemove, stack, showContent}) => {
  const swipeTranslateX = useSharedValue(0);
  const pressed = useSharedValue(false);
  const itemHeight = useSharedValue(ITEM_HEIGHT);
  const marginVertical = useSharedValue(7);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange(event => {
      if (event.translationX < 0) {
        swipeTranslateX.value = event.translationX;
      }
    })
    .onFinalize(() => {
      const isShouldDismiss = swipeTranslateX.value < -width * 0.3;
      if (isShouldDismiss) {
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        swipeTranslateX.value = withTiming(-width, undefined, isDone => {
          if (isDone) {
            runOnJS(onRemove)(item?.id);
          }
        });
      } else {
        swipeTranslateX.value = withSpring(0);
      }
      pressed.value = false;
    });

  const transformStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: swipeTranslateX.value},
      {scale: withTiming(pressed.value ? 1.15 : 1)},
    ],
  }));

  const itemHeightStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    marginVertical: marginVertical.value,
  }));

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <Animated.View style={itemHeightStyle}>
          <Animated.View
            style={[
              styles?.swipeButton,
              transformStyle,
              stack && {backgroundColor: 'rgba(250, 250, 250, 0.4)'},
            ]}>
            {showContent && (
              <View style={styles?.swipeButtonContainer}>
                <Image
                  style={styles?.profileIcon}
                  source={
                    item?.userImage
                      ? {uri: item?.userImage}
                      : require('../../../assets/images/onboarding/Onboarding1.png')
                  }
                />
                <View style={{marginLeft: width * 0.0125}}>
                  <Text style={styles?.profileName}>{item?.userName}</Text>
                  <Text style={styles?.notificationMessage}>
                    {item?.content?.length > 15
                      ? `${item?.content?.slice(0, 15)}...`
                      : item?.content}
                  </Text>
                </View>
                <Text style={styles?.notificationTime}>
                  {moment(item?.createdAt)?.format('HH:mm')}
                </Text>
              </View>
            )}
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const SwipeableList = ({setVisibility, notifications}) => {
  const [items, setItems] = useState(notifications);
  // console.log('::NOTIFICATIONS::::::::::', items);
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const notifications = await apiCall?.getNotifications({
  //         page: 1,
  //         pageSize: 5,
  //       });
  //       console.log('Notifications', notifications);
  //       setItems(
  //         notifications?.map(item => ({
  //           id: item?.id,
  //           userId: item?.userId,
  //           content: item?.content,
  //           userName: `${item?.notificationFrom?.firstName} ${item?.notificationFrom?.lastName}`,
  //           userImage: item?.notificationFrom?.photo,
  //           createdAt: item?.create_at,
  //         })),
  //       );
  //     } catch (e) {
  //       console.log('Error fetching notifications', e);
  //     }
  //   };
  //   fetchNotifications();
  // }, []);
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
            onRemove={handleSwipe}
            showContent={true}
            stack={true}
          />
          // <Text style={{color : 'black'}}>QQQQQQQQQQQQ</Text>
        )}
      />
    </View>
  );
};

export const StackedNotifications = ({count, notifications}) => {
  const [items, setItems] = useState(notifications);
  // console.log("::NOTIFICATIONS::::::::::", notifications)
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
                <Text style={styles?.toggleText}>Show Less</Text>
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
              borderRadius: width * 0.03,
              backgroundColor: 'rgba(250, 250, 250, 0.35)',
            };

        return (
          <View key={item.id} style={[styles?.stackItem, itemStyle]}>
            <SwipeableItem
              item={item}
              onRemove={() => handleSwipe(item.id)}
              showContent={expanded || isTop}
              stack={true && expanded}
            />
          </View>
        );
      })}
    </View>
  );
};

export default SwipeableList;
