import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Apple, Google } from '../../assets/images/svgs';
import { width } from '../../constant';
import { colors } from '../../utils/colors';
import { styles } from './styles';

export const SocialButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.socialButton, {width : props?.width ? props?.width : width * 0.7,}]}>
      {/* <Image style={styles.socialButtonImage} source={props.source} /> */}
      {props?.type === 'google' ? (
        <Google />
      ) : props?.type === 'apple' ? (
        <Apple />
      ) : (
       <></>
      )}
      {!props?.isLoading ? (
        <Text style={props?.textStyle ? props?.textStyle : styles.primaryText}>
          {props?.title}
        </Text>
      ) : (
        <ActivityIndicator size="small" color={colors.white} />
      )}
    </TouchableOpacity>
  );
};

export default SocialButton;
