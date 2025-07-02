import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { height, Pixels, width } from '../../constant';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export const AlertButton = ({
  title,
  onPress,
  isLoading,
  disable,
  buttonStyles,
  textStyles,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disable ? disable : false}>
      <LinearGradient
        colors={[colors?.maroon, colors?.pink]}
        style={buttonStyles ? buttonStyles : styles?.alertButton}>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={colors?.RGB1} />
        ) : (
          <Text style={textStyles ? textStyles : styles?.alertButtonText}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AlertButton;

export const styles = StyleSheet?.create({
  alertButton : {
    paddingHorizontal : width * 0.02,
    paddingVertical : height * 0.014,
    borderRadius : width * 0.02,
    marginVertical : height * 0.006,
    marginHorizontal : width * 0.09,
    alignItems : "center",
    justifyContent : 'center'
  },
  alertButtonText : {
    fontFamily : fonts?.montserratBold,
    fontSize : Pixels(14),
    color : colors?.white
  }
})
