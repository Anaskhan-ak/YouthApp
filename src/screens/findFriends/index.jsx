import {
    Image,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Cross } from '../../assets/images/svgs';
import { GradientBorderButton } from '../../components/buttons/GradientBorderButton';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { width } from '../../constant';
import { styles } from './styles';

const index = () => {
  return (
    <SafeAreaView style={styles?.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <TouchableOpacity style={styles?.crossButton}>
        <Cross />
      </TouchableOpacity>
      <Image
        style={styles?.image}
        source={require('../../assets/images/SignupImage.jpeg')}
      />
      <View style={styles?.content}>
        <Text style={styles?.heading}>Find Friends</Text>
        <Text style={styles?.subheading}>
          Find your friends and share unique content with them.
        </Text>
        <PrimaryButton title={'Find Friends'} width={width * 0.74} />
        <GradientBorderButton title={'Skip'} width={width * 0.75} />
      </View>
    </SafeAreaView>
  );
};

export default index;
