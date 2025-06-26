import { Text, TouchableOpacity, View } from 'react-native';
import {
  BlueTick,
  DropDown,
  GradientPencilIcon,
} from '../../../../assets/images/svgs';
import { height } from '../../../../constant';
import { styles } from './styles';

const ProfileDetailCard = ({userName, bio, links, setEditProfile}) => {
  console.log("LInks", bio)
  return (
    <View style={styles?.container}>
      <View style={styles?.profileView}>
        <Text style={styles?.heading}>{userName}</Text>
        <View style={styles?.blueTick}>
          <BlueTick />
        </View>
        <DropDown width={18} height={18} />
      </View>
      {bio ? (
        <Text style={[styles?.taglineText,{marginVertical : height * 0.01}]}>
            {bio}
          </Text>
      ) : <TouchableOpacity style={styles?.tagline} onPress={()=> setEditProfile(true)}>
          <Text style={styles?.taglineText}>
            Tell your friends more about you
          </Text>
          <GradientPencilIcon />
        </TouchableOpacity> }
      {/* {
        links?.length > 0 ? links?.map((link, index)=>{
          return (
            <GradientText style={styles?.link}>,;;;;;;;;;;</GradientText>
          )
        }) : null
      } */}
    </View>
  );
};

export default ProfileDetailCard;
