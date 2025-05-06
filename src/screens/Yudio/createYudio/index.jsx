import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import GradientHeader from '../../../components/headers/gradientHeader';
import { styles } from './styles';

const CreateYudio = () => {
  const navigation = useNavigation();
  return (
    <View style={styles?.container}>
      <GradientHeader
        title="New Yudio"
        backPress={() => navigation?.goBack}
        advancedButtonPress={() => console.log('Advanced Button')}
      />
    </View>
  );
};

export default CreateYudio;
