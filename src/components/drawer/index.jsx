import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import {
  FacebookIcon,
  GradientCalender,
  GradientDropRightCircle,
  InstagramIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  SnapchatIcon,
  TiktokIcon,
  TwitterIconRound,
  YoutubeIcon,
} from '../../assets/images/svgs';
import Switch from '../../components/switch';
import { width } from '../../constant';
import { styles } from './style';

const Drawer = () => {
  const [isEnabled, setEnabled] = useState(false);
  const [shareToggle, setShareToggle] = useState(false);
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
    {
      name: 'Share Post',
      value: 'share',
      image: <GradientDropRightCircle />,
      press: () => setShareToggle(!shareToggle),
      children: [
        {
          name: 'Facebook',
          icon: <FacebookIcon />,
          image: <Switch value={isEnabled} onValueChange={setEnabled} />,
        },
        {
          name: 'Instagram',
          icon: <InstagramIcon />,
          image: <Switch value={isEnabled} onValueChange={setEnabled} />,
        },
        {
          name: 'Twitter',
          icon: <TwitterIconRound />,
          image: <Switch value={isEnabled} onValueChange={setEnabled} />,
        },
        {
          name: 'Tiktok',
          icon: <TiktokIcon />,
          image: <Switch value={isEnabled} onValueChange={setEnabled} />,
        },
        {
          name: 'Youtube',
          icon: <YoutubeIcon />,
          image: <Switch value={isEnabled} onValueChange={setEnabled} />,
        },
        {
          name: 'Snapchat',
          icon: <SnapchatIcon />,
          image: <Switch value={isEnabled} onValueChange={setEnabled} />,
        },
        {
          name: 'Pinterest',
          icon: <PinterestIcon />,
          image: <Switch value={isEnabled} onValueChange={setEnabled} />,
        },
        {
          name: 'Reddit',
          icon: <RedditIcon />,
          image: <Switch value={isEnabled} onValueChange={setEnabled} />,
        },
        {
          name: 'Linkedin',
          icon: <LinkedinIcon />,
          image: <Switch value={isEnabled} onValueChange={setEnabled} />,
        },
      ],
    },
  ];
  return (
    <FlatList
      data={items}
      renderItem={({item, index}) => {
        return (
          <>
            <View key={index} style={styles?.itemContainer}>
              <Text style={styles?.itemText}>{item?.name}</Text>
              <TouchableOpacity onPress={item?.press}>
                {item?.image}
              </TouchableOpacity>
            </View>
            {shareToggle && item?.name === 'Share Post' && (
              <FlatList
                data={item?.children}
                renderItem={({item, index}) => {
                  return (
                    <View key={index} style={styles?.itemContainer}>
                      <View style={{flexDirection : 'row',alignItems : 'center'}}>
                        <View>{item?.icon}</View>
                        <Text style={[styles?.itemText, {marginLeft: 10}]}>
                          {item?.name}
                        </Text>
                      </View>
                      <TouchableOpacity>{item?.image}</TouchableOpacity>
                    </View>
                  );
                }}
                style={[styles?.container,{padding : width * 0.035}]}
              />
            )}
          </>
        );
      }}
      style={styles?.container}
    />
  );
};

export default Drawer;
