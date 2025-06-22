import { Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../assets/images';
import {
  BlackDropdown,
  BlueTick,
  GradientLocationIcon,
  PublicIcon,
  TagFriendsIcon,
} from '../../../assets/images/svgs';
import { width } from '../../../constant';
import useUser from '../../../hooks/user';
import { colors } from '../../../utils/colors';
import { styles } from './styles';

const UserInfoHeader = ({image, userName, data, setData}) => {
  const user = useUser()
  return (
    <View style={styles?.container}>
      <LinearGradient
        colors={[colors?.RGB1, colors?.RGB2]}
        style={styles?.imageBorder}>
        <Image
          source={image ? image : user?.photo ? {uri : user?.photo} :  images?.defaultProfilePicture}
          style={styles?.image}
        />
      </LinearGradient>
      <View style={styles?.content}>
        <View style={styles?.nameContainer}>
          <Text style={styles?.userName}>{userName ? userName : user?.name}</Text>
          <BlueTick />
        </View>
        <View style={styles?.buttons}>
          <TouchableOpacity
            style={styles?.button}
            onPress={() => {
              setData(prev => ({
                ...prev,
                audience: {...prev?.audience, active: true},
                location: {...prev?.location, active: false},
                tagFriends: {...prev?.tagFriends, active: false},
              }));
              data?.audience?.ref?.current?.snapToIndex(0);
            }}>
            <View style={styles?.buttonIcon}>
              <PublicIcon />
            </View>
            <Text style={styles?.buttonText}>Public</Text>
            <View style={[styles?.buttonIcon, {marginTop: width * 0.002}]}>
              <BlackDropdown />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles?.button}
            onPress={() => {
              setData(prev => ({
                ...prev,
                location: {...prev?.location, active: true},
                audience: {...prev?.audience, active: false},
                tagFriends: {...prev?.tagFriends, active: false},
              }));
              data?.location?.ref?.current?.snapToIndex(0);
            }}>
            <View style={styles?.buttonIcon}>
              <GradientLocationIcon />
            </View>
            <Text style={styles?.buttonText}>Location</Text>
            <View style={[styles?.buttonIcon, {marginTop: width * 0.002}]}>
              <BlackDropdown />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles?.button}
            onPress={() => {
              setData(prev => ({
                ...prev,
                tagFriends: {...prev?.tagFriends, active: true},
                location: {...prev?.location, active: false},
                audience: {...prev?.audience, active: false},
              }));
              data?.location?.ref?.current?.snapToIndex(0);
            }}>
            <TagFriendsIcon />
            <Text style={styles?.buttonText}>Tag Friends</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserInfoHeader;
