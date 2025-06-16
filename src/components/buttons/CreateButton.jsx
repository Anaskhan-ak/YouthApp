import { TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientText from '../../components/text/GradientText';
import { width } from '../../constant';
import { colors } from '../../utils/colors';
import { CreateButtonStyles as styles } from './styles';

const CreateButton = props => {
  return (
    <LinearGradient
      colors={[colors?.RGB1, colors?.RGB2]}
      style={styles?.container}>
      <View
        style={
          props?.secondButton && {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginHorizontal: width * 0.1,
            transform: [{scale: 0.8}],
          }
        }>
        <TouchableOpacity
          style={[
            styles?.button,
            !props?.secondButton && {paddingHorizontal: width * 0.15},
          ]}
          onPress={props?.onPress}
          disabled={props?.disabled}>
          {props?.loader ? (
            props?.loader
          ) : (
            <GradientText style={styles?.text}>{props?.title}</GradientText>
          )}
        </TouchableOpacity>
        {props?.secondButton && (
          <TouchableOpacity
            style={styles?.button}
            onPress={props?.secondButton?.onPress}
            disabled={props?.secondButton?.disabled}>
            {props?.secondButton?.loader ? (
              props?.secondButton?.loader
            ) : (
              <GradientText style={styles?.text}>
                {props?.secondButton?.title}
              </GradientText>
            )}
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

export default CreateButton;
