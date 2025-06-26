import { Text, TouchableOpacity, View } from 'react-native';
import { width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { styles } from './styles';

const ProfileStats = ({post, followers, followings, subscribers}) => {
  const routeToScreen = (screen) =>{
    
  } 
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
      onPress={()=>routeToScreen('post')}
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

      <View
        style={[
          styles?.statsView,
          {
            borderRightWidth: width * 0.002,
            borderRightColor: colors?.textGray,
          },
        ]}>
        <Text style={styles?.count}>{followings}</Text>
        <Text style={styles?.title}> Following</Text>
      </View>

      <View style={styles?.statsView}>
        <Text style={styles?.count}>{subscribers}</Text>
        <Text style={styles?.title}> Subscribers</Text>
      </View>
    </View>
  );
};

export default ProfileStats;
