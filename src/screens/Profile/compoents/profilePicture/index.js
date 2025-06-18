import { pick } from '@react-native-documents/picker';
import { Image, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../../assets/images';
import { Plus } from '../../../../assets/images/svgs';
import { colors } from '../../../../utils/colors';
import { styles } from './styles';

const ProfilePicture = ({user, setUser, setEditProfile}) => {
  const handleProfilePicture = async()=>{
      try {
        const [res] =await pick({
        allowMultiSelection : false,
        type : 'image/*'
      })
      console.log("res", res)
      setUser(prev=>({
        ...prev,
        profilePicture : res?.uri
      }))
      setEditProfile(true)
      } catch (error) {
        console.log("Error setting cover image", error)
        toast("error", "Error setting cover image")
      }
    }
  return (
    <TouchableOpacity style={styles?.container} onPress={handleProfilePicture}>
      <LinearGradient colors={[colors?.RGB2, colors?.RGB1]} style={styles?.btn}>
        <View>
          <Plus width={12} height={12} />
        </View>
      </LinearGradient>
      <Image source={user?.profilePicture ? {uri : user?.profilePicture} : images?.defaultProfilePicture} style={styles?.image} />
    </TouchableOpacity>
  );
};

export default ProfilePicture;
