import { useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../../assets/images';
import { HomeHeaderLogo, Menu } from '../../../assets/images/svgs';
import { width } from '../../../constant';
import useUser from '../../../hooks/user';
import { colors } from '../../../utils/colors';
import { styles } from './styles';

const HomeHeader = () => {
  const navigation = useNavigation()
  const user = useUser()
  return (
    <LinearGradient
      colors={[colors?.RGB1, colors?.RGB2]}
      start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      style={styles.gradient}>
      <SafeAreaView edges={['left', 'right']} style={styles.safeAreaContent}>
        <HomeHeaderLogo />
        <View style={styles.rightContainer}>
          <Menu width={width * 0.08} height={width * 0.08} />
          <TouchableOpacity onPress={() => navigation?.navigate('Profile')}>
            <LinearGradient
            colors={[colors?.RGB2, colors?.RGB1]}
            style={styles.imageBorder}>
            <Image
              source={
                user?.photo ? {uri : user?.photo} : images?.defaultProfilePicture
              }
              style={styles.image}
            />
          </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeHeader;
