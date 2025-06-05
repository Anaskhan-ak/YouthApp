import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { images } from '../../assets/images';
import {
  EventsIcon,
  FileAudio,
  FileImport,
  GalleryIcon,
  MomentsIcon,
  WhiteLeftArrow
} from '../../assets/images/svgs';
import Stories from '../../components/stories';
import { width } from '../../constant';
import { colors } from '../../utils/colors';
import PostContentModal from './compoents/postContentModal';
import ProfileDetailCard from './compoents/profileDetailCard';
import ProfileOption from './compoents/profileOption';
import ProfilePicture from './compoents/profilePicture';
import ProfileStats from './compoents/profileStats';
import { styles } from './styles';

const Profile = () => {
  const [options, setOptions] = useState([
    {
      type: 'gallery',
      icon: <GalleryIcon />,
      active: true,
    },
    {
      type: 'audios',
      icon: <FileAudio />,
      active: false,
    },
    {
      type: 'moments',
      icon: <MomentsIcon />,
      active: false,
    },
    {
      type: 'files',
      icon: <FileImport />,
      active: false,
    },
    {
      type: 'events',
      icon: <EventsIcon />,
      active: false,
    },
  ]);
  const navigation = useNavigation()
  return (
    <View style={{flex: 1}}>
      <View style={styles?.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles?.backButton}>
          <WhiteLeftArrow/>
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={images?.defaultPicture}
          style={{width: width, flex: 1}}
        />
      </View>
      <View
        style={{
          flex: 0.7,
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
          marginTop: -20,
          zIndex: 999,
          backgroundColor: colors?.white,
        }}>
        <ProfilePicture />
        <ProfileDetailCard />
        <ProfileStats />
        <ProfileOption />
        <Stories />
        <PostContentModal options={options} setOptions={setOptions} />
      </View>
    </View>
  );
};

export default Profile;
