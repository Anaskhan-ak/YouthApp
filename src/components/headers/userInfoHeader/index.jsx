import { Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlackDropdown, BlueTick, GradientLocationIcon, PublicIcon, TagFriendsIcon } from '../../../assets/images/svgs';
import { width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { styles } from './styles';

const UserInfoHeader = props => {
  return (
    <View style={styles?.container}>
      <LinearGradient colors={[colors?.RGB1, colors?.RGB2]} style={styles?.imageBorder}>
      <Image
        source={
          props?.image
            ? props?.image
            : require('../../../assets/images/SignupImage.jpeg')
        }
        style={styles?.image}
      />
      </LinearGradient>
      <View style={styles?.content}>
        <View style={styles?.nameContainer}>
        <Text style={styles?.userName}>{props?.userName}</Text>
        <BlueTick/>
        </View>
        <View style={styles?.buttons}>
          <TouchableOpacity style={styles?.button}>
            <View style={styles?.buttonIcon}><PublicIcon/></View>
            <Text style={styles?.buttonText}>Public</Text>
            <View style={[styles?.buttonIcon,{marginTop : width * 0.002}]}><BlackDropdown/></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles?.button}>
            <View style={styles?.buttonIcon}><GradientLocationIcon/></View>
            <Text style={styles?.buttonText}>Location</Text>
            <View style={[styles?.buttonIcon,{marginTop : width * 0.002}]}><BlackDropdown/></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles?.button}>
            <TagFriendsIcon/>
            <Text style={styles?.buttonText}>Tag Friends</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserInfoHeader;
