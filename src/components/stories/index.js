import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import InstagramStories from '@birdwingo/react-native-instagram-stories';
import {colors} from '../../utils/colors';
import {width} from '../../constant';
import {Plus} from '../../assets/images/svgs';

const Stories = () => {
  const ref = useRef(null);

  const stories = [
    {
      id: 'user1',
      name: 'Nature Lover',
      avatarSource: {
        uri: 'https://images.unsplash.com/photo-1502764613149-7f1d229e230f?auto=format&fit=crop&w=200&q=60',
      },
      stories: [
        {
          id: 'story1',
          source: {
            uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=60',
          },
        },
        {
          id: 'story2',
          source: {
            uri: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          },
          mediaType: 'video',
        },
      ],
    },
    {
      id: 'user2',
      name: 'City Explorer',
      avatarSource: {
        uri: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=60',
      },
      stories: [
        {
          id: 'story3',
          source: {
            uri: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60',
          },
        },
      ],
    },
  ];

  const setStories = () => {
    ref.current?.setStories(stories);
  };

  return (
    <View style={styles.container}>
      <View style={styles.addStory}>
        <Plus width={30} height={30} />
      </View>
      <InstagramStories
        ref={ref}
        stories={stories}
        avatarSize={width * 0.15}
        avatarTextStyle={styles.avatarText}
        textStyle={styles.storyText}
        closeIconColor={colors?.white}
        animationDuration={3000}
        avatarListContainerStyle={styles.avatarListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  addStory: {
    width: width * 0.17,
    height: width * 0.17,
    backgroundColor: colors?.ashGrey,
    borderRadius: width * 0.17,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 12,
  },
  storyText: {
    color: colors?.white,
  },
  avatarListContainer: {
    paddingHorizontal: 5,
    flexGrow: 0,
  },
});

export default Stories;
