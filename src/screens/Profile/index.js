import { useState } from 'react';
import { Image, View } from 'react-native';
import { images } from '../../assets/images';
import {
  EventsIcon,
  FileAudio,
  FileImport,
  GalleryIcon,
  MomentsIcon,
} from '../../assets/images/svgs';
import Stories from '../../components/stories';
import { colors } from '../../utils/colors';
import PostContentModal from './compoents/postContentModal';
import ProfileDetailCard from './compoents/profileDetailCard';
import ProfileOption from './compoents/profileOption';
import ProfilePicture from './compoents/profilePicture';
import ProfileStats from './compoents/profileStats';

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
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.3}}>
        <Image source={images?.palestine} style={{flex: 1}} />
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
