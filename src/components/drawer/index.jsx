import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { GradientCalender, GradientDropRightCircle } from '../../assets/images/svgs';
import Switch from '../../components/switch';
import { styles } from './style';

const Drawer = () => {
  const [isEnabled, setEnabled] = useState(false);
  const items = [
    {
      name: 'Your Audience',
      value: 'audience',
      image: <GradientDropRightCircle />,
    },
    {
      name: 'Add Location',
      value: 'location',
      image: <GradientDropRightCircle />,
    },
    {name: 'Tag Prople', value: 'tag', image: <GradientDropRightCircle />},
    {
      name: 'Add Paid Brand Partners',
      value: 'brandPartners',
      image: <GradientDropRightCircle />,
    },
    {
      name: 'Subscribers Only',
      value: 'subscribers',
      image: <Switch value={isEnabled} onValueChange={setEnabled} />,
    },
    {
      name: 'Schedule Your Post',
      value: 'schedulePost',
      image: <GradientCalender />,
    },
    {
      name: 'Post on Other YOUTH Accounts',
      value: 'otherAccounts',
      image: <GradientDropRightCircle />,
    },
    {name: 'Share Post', value: 'share', image: <GradientDropRightCircle />},
  ];
  return (
    <FlatList
      data={items}
      renderItem={({item, index}) => {
        return (
          <View key={index} style={styles?.itemContainer}>
            <Text style={styles?.itemText}>{item?.name}</Text>
            <TouchableOpacity>{item?.image}</TouchableOpacity>
          </View>
        );
      }}
      style={styles?.container}
    />
  );
};

export default Drawer;
