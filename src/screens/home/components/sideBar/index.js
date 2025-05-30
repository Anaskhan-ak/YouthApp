import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../../../utils/colors';
import { sideBarOptions } from '../../../../utils/string';
import { styles } from './styles';

const SideBar = ({refRBSheet}) => {
  const navigation = useNavigation()
  const handlePress = item => {
    if (item?.func === 'openSheet') {
      refRBSheet?.current?.snapToIndex(0);
    } else {
      navigation?.navigate(item?.route)
    }
  };
  return (
    <View style={styles?.container}>
      {sideBarOptions?.map(item => (
        <TouchableOpacity onPress={() => handlePress(item)}>
          <LinearGradient
            colors={[colors?.RGB2, colors?.RGB1]}
            style={styles?.btn}>
            <View>{item?.icon}</View>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SideBar;
