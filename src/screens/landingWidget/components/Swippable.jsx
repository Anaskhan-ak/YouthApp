import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import DropDownIcon from '../../../assets/images/svgs/index.js';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors/index.js';
import { fonts } from '../../../utils/fonts/index.js';

const SwipeableItem = ({item, onSwipeLeft, onSwipeRight, showContent}) => {
  return (
    <Swipeable
      leftActionActivationDistance={200}
      rightActionActivationDistance={200}
      onLeftActionRelease={() => onSwipeLeft(item.id)}
      onRightActionRelease={() => onSwipeRight(item.id)}
      leftContent={<Text>{''}</Text>}
      rightContent={<Text>{''}</Text>}>
      <TouchableOpacity
        style={styles?.swipeButton}>
        {/* Hide content for lower items */}
        {showContent && (
          <View style={styles?.swipeButtonContainer}>
            <Image
              style={styles?.profileIcon}
              source={require('../../../assets/images/onboarding/Onboarding1.png')}
            />
            <View style={{marginLeft: width * 0.0125}}>
              <Text
                style={styles?.profileName}>
                Mohammad Mustafa
              </Text>
              <Text
                style={styles?.notificationMessage}>
                An amazing night with the friends in kar...
              </Text>
            </View>
            <Text
              style={styles?.notificationTime}>
              9:41 AM
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Swipeable>
  );
};

const SwipeableList = ({
  setVisibility,
}) => {
  const [items, setItems] = useState([
    {id: '1', text: 'Item 1'},
    {id: '2', text: 'Item 2'},
    {id: '3', text: 'Item 3'},
    // Add more items as needed
  ]);

  const handleSwipeLeft = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    if (updatedItems.length === 0) {setVisibility(false);}
  };

  const handleSwipeRight = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    if (updatedItems?.length === 0) {setVisibility(false);}
  };

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SwipeableItem
            item={item}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            showContent={true}
          />
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

  const handleSwipe = (itemId) => {
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
    <View
      style={styles?.stackContainer}>
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
              onSwipeLeft={() => handleSwipe(item.id)}
              onSwipeRight={() => handleSwipe(item.id)}
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
    // position: 'absolute',
    // width: '90%',
    // backgroundColor: 'red',
    alignSelf: 'center',
  },
  toggleButton: {
    // backgroundColor: 'rgba(250, 250, 250, 0.34)',
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
    width: width * 0.9,
    backgroundColor: 'red',
    height: height * 0.08,
  },
  toggleText: {
    fontSize: width * 0.023,
    fontFamily: fonts.Regular,
    color: colors.black,
  },
  dropdown: {
    marginRight: 5,
  },
  crossButton : {
    backgroundColor: 'rgba(250, 250, 250, 0.34)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 15,
    height: 15,
    borderRadius: 10,
    // marginRight : -10
  },
  crossText: {
    fontFamily: fonts.Regular,
    fontSize: 9,
    textAlign: 'center',
    color: colors.text,
  },
  swipeButton : {
    backgroundColor: 'rgba(250, 250, 250, 0.3)', // Keep transparency
    width: '100%',
    alignSelf: 'center',
    borderRadius: 15,
    margin: 2,
    height: height * 0.085,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  profileIcon : {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  swipeButtonContainer : {flexDirection: 'row'},
  profileName : {
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
    color: 'black',
  },
  notificationMessage : {
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
    color: 'black',
  },
  notificationTime : {
    fontFamily: 'Montserrat-Regular',
    fontSize: width * 0.0245,
    alignSelf: 'center',
    marginTop: -20,
    color: 'black',
  },
  stackContainer : {
    minHeight: 150,
    // flex : 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  stackToggleButton : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: 'rgba(250, 250, 250, 0.34)',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
});

export default SwipeableList;
