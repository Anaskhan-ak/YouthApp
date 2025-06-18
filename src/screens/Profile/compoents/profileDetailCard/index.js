import { Text, View } from 'react-native';
import { BlueTick, DropDown } from '../../../../assets/images/svgs';
import { styles } from './styles';

const ProfileDetailCard = ({userName, bio, links}) => {
  // console.log("LInks", links)
  return (
    <View style={styles?.container}>
      <View style={styles?.profileView}>
        <Text style={styles?.heading}>{userName}</Text>
        <View style={styles?.blueTick}>
          <BlueTick />
        </View>
        <DropDown width={18} height={18} />
      </View>
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
