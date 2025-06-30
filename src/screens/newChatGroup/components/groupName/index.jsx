import { pick } from '@react-native-documents/picker';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Image,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../../assets/images';
import { Plus } from '../../../../assets/images/svgs';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import InboxHeader from '../../../../components/headers/chat/inbox';
import { width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { styles } from './styles';

const GroupName = ({setNext}) => {
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
      <InboxHeader title="Group Name" backPress={()=>setNext(false)}/>
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
            <Plus width={width * 0.04} height={width * 0.04} />
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


