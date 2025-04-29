import { Dimensions, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../utils/colors';
import GradientText from '../text/GradientText';
import { styles } from './styles';

const {height, width} = Dimensions.get('window');

export const GradientBorderButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      // style={props.style}
    >
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[colors.primary, colors.primary, colors.RGB2]}
        style={[
          styles.gbb1,
          {width: props?.width ? props.width : width * 0.79},
        ]}>
        <View
          style={{
            ...styles.gbb2,
            width: props?.width ? props.width - 3 : width * 0.78,
          }}>
          <GradientText style={styles.gradientText}>{props.title}</GradientText>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
