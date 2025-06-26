import {Text, TouchableOpacity, View} from 'react-native';
import {width} from '../../../../constant';
import {colors} from '../../../../utils/colors';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

const ProfileStats = ({post, followers, followings, subscribers}) => {
  const navigation = useNavigation();
  const routeToScreen = screen => {
    navigation?.navigate('ConnectionListing', {heading: screen});
  };
  return (
    <View style={styles?.container}>
      <View
        style={[
          styles?.statsView,
          {
            borderRightWidth: width * 0.002,
            borderRightColor: colors?.textGray,
          },
        ]}>
        <Text style={styles?.count}>{post}</Text>
        <Text style={styles?.title}> Posts</Text>
      </View>
      <TouchableOpacity
        onPress={() => routeToScreen('Followers')}
        style={[
          styles?.statsView,
          {
            borderRightWidth: width * 0.002,
            borderRightColor: colors?.textGray,
          },
        ]}>
        <Text style={styles?.count}>{followers}</Text>
        <Text style={styles?.title}> Followers</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => routeToScreen('Following')}
        style={[
          styles?.statsView,
          {
            borderRightWidth: width * 0.002,
            borderRightColor: colors?.textGray,
          },
        ]}>
        <Text style={styles?.count}>{followings}</Text>
        <Text style={styles?.title}> Following</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => routeToScreen('Subscribers')}
        style={styles?.statsView}>
        <Text style={styles?.count}>{subscribers}</Text>
        <Text style={styles?.title}> Subscribers</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileStats;
