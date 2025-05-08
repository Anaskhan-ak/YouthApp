import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { BlackBackArrow, BlackYouthLogo } from '../../assets/images/svgs';
import { colors } from '../../utils/colors';
import YudioCard from './components/yudioCard';
import { styles } from './styles';

const Yudios = () => {
  return (
    <SafeAreaView style={styles?.container}>
      {/* Header */}
      <View style={styles?.header}>
        <TouchableOpacity style={styles?.headerIcon}>
          <BlackBackArrow />
        </TouchableOpacity>
        {['For You', 'Following', 'Trending', 'Live']?.map(item => {
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
      {/* Yudio Card */}
      <YudioCard />
    </SafeAreaView>
  );
};

export default Yudios;
