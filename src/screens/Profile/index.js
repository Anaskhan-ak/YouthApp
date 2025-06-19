import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { images } from '../../assets/images';
import {
  EventsIcon,
  FileAudio,
  FileImport,
  GalleryIcon,
  MomentsIcon,
  Plus,
  WhiteLeftArrow,
} from '../../assets/images/svgs';

import { pick } from '@react-native-documents/picker';
import { toast } from '../../components/toast';
import { height, width } from '../../constant';
import { getDataLocally } from '../../helper';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import EditProfile from './compoents/editProfile';
import ProfileDetailCard from './compoents/profileDetailCard';
import ProfileOption from './compoents/profileOption';
import ProfilePicture from './compoents/profilePicture';
import ProfileStats from './compoents/profileStats';
import QRSheet from './compoents/qrCode';
import { styles } from './styles';

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
  // const isFocus = useIsFocused()

  const [editProfile, setEditProfile] = useState(false);
  const [qr, setQr] = useState(false);
  const qrRef = useRef(null)

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

  // console.log('User data', userhandleProfilePictureData);

  const handleCoverImage = async () => {
    try {
      const [res] = await pick({
        allowMultiSelection: false,
        type: 'image/*',
      });
      console.log('res', res);
      setUserData(prev => ({
        ...prev,
        coverImage: res?.uri,
      }));
      setEditProfile(true);
    } catch (error) {
      console.log('Error setting cover image', error);
      toast('error', 'Error setting cover image');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            editProfile ? setEditProfile(false) : navigation?.goBack()
          }
          style={styles.backButton}>
          <WhiteLeftArrow />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.coverImageContainer}
        onPress={handleCoverImage}>
        <Image
          source={
            userData?.coverImage
              ? {uri: userData?.coverImage}
              : images?.defaultPicture
          }
          style={
            !userData?.coverImage
              ? {
                  width: width * 0.2,
                  height: height * 0.1,
                  borderRadius: width * 0.03,
                }
              : styles.coverImage
          }
        />
      </TouchableOpacity>

      <View style={[styles.profileContentContainer, editProfile && {flex: 1}]}>
        <ProfilePicture
          user={userData}
          setUser={setUserData}
          setEditProfile={setEditProfile}
        />
        {editProfile ? (
          <EditProfile
            data={userData}
            setData={setUserData}
            setEditProfile={setEditProfile}
          />
        ) : (
          <>
            <ProfileDetailCard
              userName={`${userData?.firstName} ${userData?.lastName}`}
              bio={userData?.bio}
              links={userData?.links}
            />
            <ProfileStats
              post={userData?.numPosts}
              followers={userData?.numFollowers}
              followings={userData?.numFollowing}
              subscribers={50}
            />
            <View style={styles?.icons}>
              <ProfileOption setEditProfile={setEditProfile} setQr={setQr} />
            </View>
            {/* <Stories /> */}
            {/* <View style={styles?.postModal}>
              <PostContentModal options={options} setOptions={setOptions} />
            </View> */}
            <TouchableOpacity onPress={()=>navigation?.navigate('CreateStory', {isHighlight : true})} style={{
              width : width * 0.1,
              height : width * 0.1,
              borderRadius : width * 0.1,
              backgroundColor : colors?.gray,
              alignItems : "center",
              justifyContent : 'center'
            }}>
              <Plus width={20} height={20}/>
            </TouchableOpacity>
            {qr && <QRSheet setVisible={setQr} sheetRef={qrRef}/>}
          </>
        )}
      </View>
    </View>
  );
};

export default Profile;
