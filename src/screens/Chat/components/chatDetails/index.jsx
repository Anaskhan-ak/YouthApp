import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../../../../assets/images';
import {
  EditEventThumbnail,
  RightArrow,
  SearchIcon,
  VideoCallIcon,
  VoiceCallIcon,
} from '../../../../assets/images/svgs';
import CreateButton from '../../../../components/buttons/CreateButton';
import { GradientBorderButton } from '../../../../components/buttons/GradientBorderButton';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import InboxHeader from '../../../../components/headers/chat/inbox';
import { width } from '../../../../constant';
import { styles } from './styles';

const ChatDetails = ({backPress, title}) => {
  const [edit, setEdit] = useState(false);
  const options = [
    {
      title: 'Media, links and documents',
      text: '1024',
    },
    {
      title: 'Wallpaper and Sound',
      text: 'Change',
    },
    {
      title: 'Mute',
      text: 'No',
    },
    {
      title: 'Save to Camera Roll',
      text: 'Auto',
    },
    {
      title: 'Labels',
      text: 'None',
    },
  ];

  const contacts = [
    {
      id: 'qqqqqqqqqqqqqqqqqqqq',
      image: images?.onboarding1,
      name: 'Sannya Wasim',
      admin: true,
    },
    {
      id: 'wwwwwwwwwwwwwwwwwww',
      image: images?.onboarding1,
      name: 'Muzammil Ali',
      admin: false,
    },
    {
      id: 'eeeeeeeeeeeeeeeeeee',
      image: images?.onboarding1,
      name: 'Tehreem Zahid',
      admin: false,
    },
    {
      id: 'rrrrrrrrrrrrrrrrrrrrr',
      image: images?.onboarding1,
      name: 'Shahmeer Khan',
      admin: false,
    },
    {
      id: 'aaaaaaaaaaaaaaaaaaaa',
      image: images?.onboarding1,
      name: 'Areeba Fatima',
      admin: false,
    },
    {
      id: 'ssssssssssssssss',
      image: images?.onboarding1,
      name: 'Daniyal Ahmed',
      admin: false,
    },
    {
      id: 'ddddddddddddddddddd',
      image: images?.onboarding1,
      name: 'Fariha Siddiqui',
      admin: false,
    },
    {
      id: 'fffffffffffffff',
      image: images?.onboarding1,
      name: 'Hammad Raza',
      admin: false,
    },
    {
      id: 'ccccccccccccccccccc',
      image: images?.onboarding1,
      name: 'Zoya Malik',
      admin: false,
    },
    {
      id: 'xxxxxxxxxxxxxxxxxxxxx',
      image: images?.onboarding1,
      name: 'Ibrahim Noor',
      admin: false,
    },
  ];
  return (
    <View style={styles?.container}>
      <InboxHeader backPress={backPress} title={title} />
      <View style={styles?.content}>
        <View style={styles?.editImageContainer}>
          <Image source={images?.defaultProfilePicture} style={styles?.image} />
          {edit && (
            <TouchableOpacity style={styles?.editImage}>
              <EditEventThumbnail />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles?.editTitleContainer}>
          <Text style={styles?.title}>Youth Community</Text>
          {edit && (
            <TouchableOpacity style={styles?.editTitle}>
              <EditEventThumbnail />
            </TouchableOpacity>
          )}
        </View>
        {!edit && (
          <View style={{alignItems : 'center', justifyContent : 'center'}}>
            <Text style={styles?.subText}>25 participants</Text>
            <View style={styles?.icons}>
              <TouchableOpacity style={styles?.videocallButton}><VideoCallIcon /></TouchableOpacity>
              <TouchableOpacity style={styles?.voicecallButton}><VoiceCallIcon /></TouchableOpacity>
              <TouchableOpacity style={styles?.searchButton}><SearchIcon/></TouchableOpacity>
            </View>
            <FlatList
              data={options}
              renderItem={({item}) => (
                <View style={styles?.itemContainer}>
                  <Text style={styles?.itemTitle}>{item?.title}</Text>
                  <View style={styles?.itemRight}>
                    <Text style={styles?.itemText}>{item?.text}</Text>
                    <TouchableOpacity style={styles?.rightArrowButton}>
                      <RightArrow width={width * 0.03} height={width * 0.03} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              style={styles?.optionsList}
            />
          </View>
        )}
        <Text style={styles?.participantHeading}>GROUP PARTICIPANTS</Text>
        <FlatList
          data={contacts}
          renderItem={({item}) => (
            <View style={styles?.contactContainer}>
              <View style={styles?.contactLeft}>
                <Image source={item?.image} style={styles?.contactImage} />
                <Text style={styles?.contactName}>{item?.name}</Text>
              </View>
              {item?.admin ? (
                <GradientBorderButton width={width * 0.4} title={'Admin'} />
              ) : (
                <PrimaryButton width={width * 0.4} title={'Remove'} />
              )}
            </View>
          )}
        />
      </View>
      <CreateButton
        title={edit ? 'Save' : 'Edit Group'}
        onPress={() => setEdit(!edit)}
      />
    </View>
  );
};

export default ChatDetails;
