import { StatusBar, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WhiteLeftArrow } from '../../../assets/images/svgs';
import { colors } from '../../../utils/colors';
import { styles } from './styles';

const GradientHeader = props => {
  return (
    <LinearGradient
      colors={[colors?.RGB1, colors?.RGB2]}
      style={styles?.container}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={'transparent'}
      />
      <TouchableOpacity style={styles?.backButton} onPress={props?.backPress}>
        <WhiteLeftArrow />
      </TouchableOpacity>
      <Text style={styles?.title}>{props?.title}</Text>
      {props?.advancedButtonPress && (
        <TouchableOpacity style={styles?.advancedButton}>
          <Text style={styles?.advancedButtonText}>Advanced</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

export default GradientHeader;
