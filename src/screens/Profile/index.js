import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

import {images} from '../../assets/images';
import {
  EventsIcon,
  FileAudio,
  FileImport,
  GalleryIcon,
  MomentsIcon,
  WhiteLeftArrow,
} from '../../assets/images/svgs';

import Stories from '../../components/stories';
import PostContentModal from './compoents/postContentModal';
import ProfileDetailCard from './compoents/profileDetailCard';
import ProfileOption from './compoents/profileOption';
import ProfilePicture from './compoents/profilePicture';
import ProfileStats from './compoents/profileStats';

import {apiCall} from '../../services/apiCall';
import {getDataLocally} from '../../helper';
import {styles} from './styles';
import {colors} from '../../utils/colors';
import {width} from '../../constant';

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [options, setOptions] = useState([
    {type: 'gallery', icon: <GalleryIcon />, active: true},
    {type: 'audios', icon: <FileAudio />, active: false},
    {type: 'moments', icon: <MomentsIcon />, active: false},
    {type: 'files', icon: <FileImport />, active: false},
    {type: 'events', icon: <EventsIcon />, active: false},
  ]);

  const getUserData = async () => {
    const localUserData = await getDataLocally();
    try {
      const result = await apiCall?.getProfileData({userId: localUserData?.id});
      setUserData(result);
    } catch (e) {
      console.error('Failed to fetch profile data', e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={styles.backButton}>
          <WhiteLeftArrow />
        </TouchableOpacity>
      </View>

      <View style={styles.coverImageContainer}>
        <Image source={images?.defaultPicture} style={styles.coverImage} />
      </View>

      <View style={styles.profileContentContainer}>
        <ProfilePicture user={userData} />
        <ProfileDetailCard
          userName={`${userData?.firstName} ${userData?.lastName}`}
          bio={userData?.bio}
          link={userData?.links}
        />
        <ProfileStats
          post={userData?.numPosts}
          followers={userData?.numFollowers}
          followings={userData?.numFollowing}
          subscribers={50}
        />
        <ProfileOption />
        {/* <Stories /> */}
        <PostContentModal options={options} setOptions={setOptions} />
      </View>
    </View>
  );
};

export default Profile;
