import { StyleSheet, Text, View } from 'react-native'

const SettingsPrivacy = () => {
  return (
    <View style={styles?.container}>
      <Text>Settings</Text>
    </View>
  )
}

export default SettingsPrivacy

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'red'
    }
})