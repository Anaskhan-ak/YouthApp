import {View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../../utils/colors';
import {sideBarOptions} from '../../../../utils/string';
import {styles} from './styles';

const SideBar = ({refRBSheet}) => {
  const handlePress = item => {
    console.log("Ref:", refRBSheet?.current);
    // if (item?.func === 'openSheet') {
      refRBSheet?.current?.snapToIndex(0);
    // }
  };
  return (
    <View style={styles?.container}>
      {sideBarOptions?.map(item => (
        <TouchableOpacity onPress={() => handlePress(item)}>
          <LinearGradient
            colors={[colors?.RGB2, colors?.RGB1]}
            style={styles?.imageBorder}>
            <View>{item?.icon}</View>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SideBar;
