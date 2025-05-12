import { Text, TouchableOpacity, View } from 'react-native';
import { BlackBackArrow, BlackYouthLogo } from '../../../assets/images/svgs';
import { colors } from '../../../utils/colors';
import { topScrollArray } from '../../../utils/string';
import { styles } from './styles';

const ScrollHeader = () => {
  return (
    <View style={styles?.header}>
      <TouchableOpacity style={styles?.headerIcon}>
        <BlackBackArrow />
      </TouchableOpacity>
      {topScrollArray?.map(item => {
        return (
          <TouchableOpacity>
            <Text style={[styles?.headerText, {color: colors?.gray}]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity style={styles?.headerIcon}>
        <BlackYouthLogo />
      </TouchableOpacity>
    </View>
  );
};

export default ScrollHeader;
