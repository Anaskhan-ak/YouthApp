import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { images } from '../../assets/images';
import {
  EventsIcon,
  FileAudio,
  FileImport,
  GalleryIcon,
  Menu,
  MomentsIcon,
  ProfileSettingsIcon,
  WhiteLeftArrow,
} from '../../assets/images/svgs';

import { pick } from '@react-native-documents/picker';
import { ActivityIndicator } from 'react-native';
import RNBottomSheet from '../../components/sheets/BottomSheet';
import Stories from '../../components/stories';
import { height, width } from '../../constant';
import { getDataLocally } from '../../helper';
import { apiCall } from '../../services/apiCall';
import EditProfile from './compoents/editProfile';
import PostContentModal from './compoents/postContentModal';
import ProfileDetailCard from './compoents/profileDetailCard';
import ProfileOption from './compoents/profileOption';
import ProfilePicture from './compoents/profilePicture';
import ProfileStats from './compoents/profileStats';
import QRSheet from './compoents/qrCode';
import { styles } from './styles';

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [stories, setStories] = useState([]);
  const [options, setOptions] = useState([
    {type: 'gallery', icon: <GalleryIcon />, active: true},
    {type: 'audios', icon: <FileAudio />, active: false},
    {type: 'moments', icon: <MomentsIcon />, active: false},
    {type: 'files', icon: <FileImport />, active: false},
    {type: 'events', icon: <EventsIcon />, active: false},
  ]);
  const [editProfile, setEditProfile] = useState(false);
  const [qr, setQr] = useState(false);
  const qrRef = useRef(null);
  const focus = useIsFocused();
  const settingsSheetRef = useRef(null)
  const [settingsSheet, setSettingsSheet] = useState(false)
  const getStories = async () => {
    try {
      const userData = await getDataLocally();
      const highlight = await apiCall?.getAllHighlight({userId: userData?.id});
      const transformed = await highlight?.map(item => {
        const post = item?.story;
        return {
          userid: item?.userId,
          firstName: item?.name,
          lastName: null,
          avatarSource: {
            uri: post?.url,
          },
          stories: [
            {
              id: post?.id,
              userId: post?.userId,
              storyId: item?.storyId,
              source: {
                uri: post?.url,
              },
              mediaType: post?.mediaType,
            },
          ],
        };
      });

      setStories(transformed);
    } catch (e) {
      console.log('e', e);
    } finally {
    }
  };
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
    getStories();
  }, [focus]);

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
        <View style={styles?.headerIcons}>
          <TouchableOpacity onPress={()=> {
            settingsSheetRef?.current?.snapToIndex(0);
            }} style={styles?.headerIcon}>
            <ProfileSettingsIcon/>
          </TouchableOpacity>
          <TouchableOpacity style={styles?.headerIcon}>
            <Menu width={width * 0.07} height={width * 0.07} />
          </TouchableOpacity>
        </View>
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

        {!userData ? (
          <View style={styles?.indicator}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : editProfile ? (
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
              setEditProfile={setEditProfile}
            />
            <ProfileStats
              post={userData?.numPosts}
              followers={userData?.numFollowers}
              followings={userData?.numFollowing}
              subscribers={50}
            />
            <View style={styles?.icons}>
              <ProfileOption
                getUserData={getUserData}
                setEditProfile={setEditProfile}
                setQr={setQr}
                sheetRef={qrRef}
              />
            </View>
            {<Stories stories={stories} />}
            <PostContentModal fixed options={options} setOptions={setOptions} />
            <QRSheet setVisible={setQr} sheetRef={qrRef} />
            <RNBottomSheet setIsSheetOpen={setSettingsSheet} sheetRef={settingsSheetRef} isProfile={true}/>
          </>
        )}
      </View>
    </View>
  );
};

export default Profile;
