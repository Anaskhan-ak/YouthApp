import {useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActiveComment,
  ActiveDownload,
  ActiveLike,
  ActiveRepost,
  ActiveSave,
  ActiveShare,
  InactiveComment,
  InactiveDownload,
  InactiveLike,
  InactiveRepost,
  InactiveSave,
  InactiveShare,
  PinkGradientPlusButton,
} from '../../../assets/images/svgs';
import {colors} from '../../../utils/colors';
import {styles} from './styles';

const YudioReactions = () => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);
  const [reposts, setReposts] = useState(0);
  const [save, setSave] = useState('Save');
  const [download, setDownload] = useState('Download');
  const [reactions, setReactions] = useState([
    {
      type: 'like',
      text: likes,
      active: false,
      activeSvg: <ActiveLike />,
      inactiveSvg: <InactiveLike />,
    },
    {
      type: 'comment',
      text: comments,
      active: false,
      activeSvg: <ActiveComment />,
      inactiveSvg: <InactiveComment />,
    },
    {
      type: 'share',
      text: shares,
      active: false,
      activeSvg: <ActiveShare />,
      inactiveSvg: <InactiveShare />,
    },
    {
      type: 'repost',
      text: reposts,
      active: false,
      activeSvg: <ActiveRepost />,
      inactiveSvg: <InactiveRepost />,
    },
    {
      type: 'save',
      text: save,
      active: false,
      activeSvg: <ActiveSave />,
      inactiveSvg: <InactiveSave />,
    },
    {
      type: 'download',
      text: download,
      active: false,
      activeSvg: <ActiveDownload />,
      inactiveSvg: <InactiveDownload />,
    },
  ]);

  const toggleReaction = index => {
    const updatedReactions = [...reactions];
    updatedReactions[index].active = !updatedReactions[index]?.active;
    setReactions(updatedReactions);
  };

  const HeaderComponent = () => {
    return (
      <TouchableOpacity style={styles?.gradientProfileContainer}>
        <LinearGradient
          colors={[colors?.RGB1, colors?.RGB2]}
          style={styles?.gradientProfileIcon}>
          <Image
            style={styles?.gradientProfileImage}
            source={require('../../../assets/images/SignupImage.jpeg')}
          />
          <View style={styles?.plusButton}>
            <PinkGradientPlusButton />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles?.container}>
      <FlatList
        data={reactions}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={styles?.content}>
              <TouchableOpacity
                style={styles?.button}
                onPress={() => toggleReaction(index)}>
                <View style={item?.active && styles?.buttonView}>
                  {item?.active ? item?.activeSvg : item?.inactiveSvg}
                </View>
              </TouchableOpacity>
              <Text style={styles?.buttonText}>{item?.text}</Text>
            </View>
          );
        }}
        ListHeaderComponent={<HeaderComponent />}
      />
    </View>
  );
};

export default YudioReactions;
