import {Text, TouchableOpacity, View, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {WhiteLeftArrow} from '../../../assets/images/svgs';
import {colors} from '../../../utils/colors';
import {styles} from './styles';

const GradientHeader = ({
  title,
  backPress,
  advancedButtonPress,
  storyIcons,
}) => {
  return (
    <LinearGradient
      colors={[colors.RGB2, colors.RGB1]}
      start={{x: 1, y: 1}}
      end={{x: 0, y: 0}}
      style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={backPress}>
        <WhiteLeftArrow />
      </TouchableOpacity>

      {!storyIcons && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      {storyIcons && storyIcons}

      <View style={styles.rightContainer}>
        {advancedButtonPress && (
          <TouchableOpacity
            style={styles.advancedButton}
            onPress={advancedButtonPress}>
            <Text style={styles.advancedButtonText}>Advanced</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

export default GradientHeader;
