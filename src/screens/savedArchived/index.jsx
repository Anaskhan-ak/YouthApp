import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import Archived from './components/Archived';
import Saved from './components/Saved';

const SavedArchived = ({route}) => {
  const {isSaved} = route?.params;
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      {isSaved ? <Saved navigation={navigation} /> : <Archived navigation={navigation} />}
    </View>
  );
};

export default SavedArchived;
