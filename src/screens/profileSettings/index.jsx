import { View } from 'react-native'
import SettingsPrivacy from './components/Settings'

const ProfileSettingsActivity = () => {
  return (
    <View style={styles?.container}>
      {
        component === 'settings' && (
            <SettingsPrivacy/>
        )
      }
    </View>
  )
}

export default ProfileSettingsActivity

