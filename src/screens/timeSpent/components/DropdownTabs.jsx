import { Text, TouchableOpacity, View } from 'react-native';
import GradientText from '../../../components/text/GradientText';
import { Pixels } from '../../../constant';
import { styles } from '../styles';


const DropdownTabs = () => {
  return (
    <View style={styles?.tabContainer}>
      <TouchableOpacity style={styles.tab}>
        <Text style={styles.tabText}>PHILSocial</Text>
        <View style={styles.buttonDropdown}>
          <GradientText style={[styles.gradientText,{fontSize : Pixels(11)}]}>8 hr 8 min</GradientText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text style={styles.tabText}>PHILStream</Text>
        <View style={styles.buttonDropdown}>
          <GradientText style={[styles.gradientText,{fontSize : Pixels(11)}]}>8 hr 8 min</GradientText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text style={styles.tabText}>PHILGaming</Text>
        <View style={styles.buttonDropdown}>
          <GradientText style={[styles.gradientText,{fontSize : Pixels(11)}]}>8 hr 8 min</GradientText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          {borderBottomLeftRadius: 8, borderBottomRightRadius: 8},
        ]}>
        <Text style={styles.tabText}>PHILEducation</Text>
        <View style={styles.buttonDropdown}>
          <GradientText style={[styles.gradientText,{fontSize : Pixels(11)}]}>8 hr 8 min</GradientText>
        </View>
      </TouchableOpacity>
    </View>
  );
};


export default DropdownTabs