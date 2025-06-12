import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../../assets/images';
import { Plus } from '../../../../assets/images/svgs';
import useUser from '../../../../hooks/user';
import { colors } from '../../../../utils/colors';
import { styles } from './styles';

const ProfilePicture = ({user}) => {
  return (
    <View style={styles?.container}>
      <LinearGradient colors={[colors?.RGB2, colors?.RGB1]} style={styles?.btn}>
        <View>
          <Plus width={12} height={12} />
        </View>
      </LinearGradient>
      <Image source={user?.profilePicture ? {uri : user?.profilePicture} : images?.defaultProfilePicture} style={styles?.image} />
    </View>
  );
};

export default ProfilePicture;
