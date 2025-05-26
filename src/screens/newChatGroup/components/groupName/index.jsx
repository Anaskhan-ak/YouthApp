import { pick } from '@react-native-documents/picker';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../../assets/images';
import { Plus } from '../../../../assets/images/svgs';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import InboxHeader from '../../../../components/headers/chat/inbox';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';

const GroupName = () => {
  const [disable, setDisable] = useState(true);
  const [info, setInfo] = useState({
    image: '',
    name: '',
  });
  const navigation = useNavigation()

  const selectImage = async () => {
    try {
      const [res] = await pick({
        type: 'image/*',
        allowMultiSelection: false,
      });
      console.log('Image', res);
      setInfo(prev => ({...prev, image: res?.uri}));
    } catch (error) {
      console.log('Error selecting image', error);
    }
  };

  useEffect(()=>{
    if (info?.image !== null && info?.name !== null) {
        setDisable(false)
    }
  },[info])
  return (
    <View style={styles?.container}>
      <InboxHeader title="Group Name" />
      <View style={styles?.content}>
        <Image
          source={
            info?.image ? {uri: info?.image} : images?.defaultProfilePicture
          }
          style={styles?.image}
        />
        <TouchableOpacity onPress={selectImage}>
          <LinearGradient
            colors={[colors?.RGB1, colors?.RGB2]}
            style={styles?.plusButton}>
            <Plus width={width * 0.07} height={width * 0.07} />
          </LinearGradient>
        </TouchableOpacity>
        <TextInput
          placeholder="Group Name"
          placeholderTextColor={colors?.textGray}
          style={styles?.input}
          value={info?.value}
          onChangeText={text => setInfo(prev => ({...prev, name: text}))}
        />
        <View style={styles?.button}>
          <PrimaryButton title={'Create Group'} disable={disable} onPress={() => navigation?.navigate("Chat")}/>
        </View>
      </View>
    </View>
  );
};

export default GroupName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: height * 0.05,
  },
  image: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: width * 0.35,
    borderWidth: width * 0.01,
    borderColor: colors?.white,
    shadowColor: colors?.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  plusButton: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -height * 0.04,
    marginLeft: width * 0.2,
  },
  input: {
    backgroundColor: colors?.extraLightGrey,
    borderRadius: width * 0.2,
    width: width * 0.8,
    marginVertical: height * 0.08,
    padding: width * 0.03,
    color : colors?.text
  },
  button: {
    marginVertical: height * 0.14,
  },
});
