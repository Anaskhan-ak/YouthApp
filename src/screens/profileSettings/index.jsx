import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View } from 'react-native';
import Activity from './components/Activity';
import SettingsPrivacy from './components/Settings';
import { styles } from './styles';

const ProfileSettingsActivity = ({route}) => {
  const {isSettings} = route?.params;
  const [settings, setSettings] = useState(isSettings);
  const navigation = useNavigation();
  return (
    <View style={styles?.container}>
      {settings ? (
        <SettingsPrivacy navigation={navigation} />
      ) : (
        <Activity navigation={navigation} />
      )}
    </View>
  );
};

export default ProfileSettingsActivity;
