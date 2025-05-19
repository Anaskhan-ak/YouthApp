import { StatusBar, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WhiteLeftArrow } from '../../../assets/images/svgs';
import { width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { styles } from './styles';

const GradientHeader = props => {
  return (
    <LinearGradient
      colors={[colors?.RGB2,colors?.RGB1]}
      start={{x:1,y:1}}
      end={{x:0,y:0}}
      style={[styles?.container, {justifyContent : props?.advancedButtonPress ? 'space-between' : 'flex-start'}]}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={'transparent'}
      />
      <TouchableOpacity style={styles?.backButton} onPress={props?.backPress}>
        <WhiteLeftArrow />
      </TouchableOpacity>
      <Text style={[styles?.title, !props?.advancedButtonPress && {marginLeft : width * 0.16}]}>{props?.title}</Text>
      {props?.advancedButtonPress && (
        <TouchableOpacity style={styles?.advancedButton} onPress={props?.advancedButtonPress}>
          <Text style={styles?.advancedButtonText}>Advanced</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

export default GradientHeader;
