import { Text, View } from 'react-native';
import { BlueTick, DropDown } from '../../../../assets/images/svgs';
import GradientText from '../../../../components/text/GradientText';
import { styles } from './styles';

const ProfileDetailCard = ({userName, bio, link}) => {
  return (
    <View style={styles?.container}>
      <View style={styles?.profileView}>
        <Text style={styles?.heading}>{userName}</Text>
        <View style={styles?.blueTick}>
          <BlueTick />
        </View>
        <DropDown width={18} height={18} />
      </View>
      <GradientText style={styles?.link}>{link}</GradientText>
    </View>
  );
};

export default ProfileDetailCard;
