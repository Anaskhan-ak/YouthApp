import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../utils/colors';
import { styles } from './styles';

const {height, width} = Dimensions.get('window');

export const PrimaryButton = props => {
  return (
    <TouchableOpacity {...props} onPress={props.onPress} disabled={props?.disable ? props?.disable : false}>
      <LinearGradient
        colors={[colors.primary, colors.RGB2]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={StyleSheet.flatten([
          {
            width: props?.width || width * 0.69,
            borderRadius: props?.borderRadius ||  5,
          },
          styles.primaryButton,
          props?.style, 
        ])}>
        {!props?.isLoading ? (
          <Text
            style={props?.textStyle ? props?.textStyle : styles.primaryText}>
            {props?.title}
          </Text>
        ) : (
          <ActivityIndicator size="small" color={colors.white} />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
