import { pick } from '@react-native-documents/picker';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import { images } from '../../assets/images';
import { EditEventThumbnail } from '../../assets/images/svgs';
import CreateButton from '../../components/buttons/CreateButton';
import DateTimePicker from '../../components/dropdowns/DateTimePicker';
import GradientHeader from '../../components/headers/gradientHeader';
import AuthInput from '../../components/inputs/authInput';
import MultilineInput from '../../components/inputs/multilineInput';
import { width } from '../../constant';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import { styles } from './styles';

const CreateEvent = () => {
  const navigation = useNavigation();
  const [details, setDetails] = useState({
    thumbnail: {
      uri: '',
      name: '',
      type: '',
    },
    name: '',
    description: '',
    location: '',
    cost: 0,
    time: '',
    walletAdress: '',
  });

  const maxChars = 2500;
  const [chars, setChars] = useState(0);
  const [showDateTime, setShowDateTime] = useState(false);
  const selectThumbnail = async () => {
    try {
      const [res] = await pick({
        type: ['image/*'],
        allowMultiSelection: false,
      });
      //   console.log('Thumbnail', res);
      setDetails(prev => ({
        ...prev,
        thumbnail: {
          uri: res?.uri,
          name: res?.name,
          type: res?.type,
        },
      }));
    } catch (error) {
      console.log('Error selecting thumbnail', error);
    }
  };

  const handleForm = async () => {
    // console.log('Event Details', details);
    const formData = new FormData();
      formData.append('type', 'EVENT');
      formData.append('isPublic', 'PUBLIC');
      formData.append('caption', details?.description);
      formData.append('eventTitle', details?.name);
      // formData.append('cost', parseFloat(`${eventCost}.12`));
      formData.append('eventLocation', details?.location);
      formData.append('location', details?.location);
      formData.append('eventDescription', details?.description);
      formData.append('eventDay', moment(details?.time)?.format('dddd'));
      formData.append('eventTime', details?.time);
      formData.append('eventType', 'EVENT');
      formData.append('walletAddress', details?.walletAdress);
      formData.append('media', {
        uri: details?.thumbnail?.uri,
        type: details?.thumbnail?.type,
        name: details?.thumbnail?.name,
      });
      formData.append('thumbnail', {
        uri: details?.thumbnail?.uri,
        type: details?.thumbnail?.type,
        name: details?.thumbnail?.name,
      });
      console.log("Form data", formData)
    try {
       const response = await apiCall?.createNewPost(formData)
      console.log("Successfully created event post", response)
    } catch (error) {
      console.log("Error creating event post", error)
    }
  };
  return (
    <View style={styles?.container}>
      <GradientHeader
        title="Create Event"
        backPress={() => navigation?.goBack}
      />
      <ScrollView style={styles?.inputContainer}>
        <TouchableOpacity
          style={[
            styles?.editThumbnail,
            details?.thumbnail?.uri?.length === 0 && {padding: width * 0.15},
          ]}
          onPress={selectThumbnail}>
          <View style={styles?.pen}>
            <EditEventThumbnail />
          </View>
          {details?.thumbnail?.uri?.length > 0 ? (
            <Image
              source={{uri: details?.thumbnail?.uri}}
              style={styles?.editThumbnailImage}
            />
          ) : (
            <Image
              source={images?.defaultPicture}
              style={styles?.editThumbnailPlaceholder}
            />
          )}
        </TouchableOpacity>
        <AuthInput
          placeholder={'Event Name'}
          value={details?.name}
          onChangeText={text => setDetails(prev => ({...prev, name: text}))}
          inputStyle={{margin: width * 0.01}}
        />
        <MultilineInput
          placeholder="About this Event"
          placeholderTextColor={colors?.gray}
          editable={true}
          multiline={true}
          numberOfLines={5}
          scrollEnabled={true}
          value={details?.description}
          chars={chars}
          setChars={setChars}
          maxChars={maxChars}
          postType={'post'}
          onChangeText={text =>
            setDetails(prev => ({...prev, description: text}))
          }
        />
        <AuthInput
          placeholder="Location Link (Physical / Virtual)"
          value={details?.location}
          onChangeText={text => setDetails(prev => ({...prev, location: text}))}
          inputStyle={{margin: width * 0.01}}
          icon="location"
        />
        <AuthInput
          placeholder="Cost:"
          value={details?.cost}
          onChangeText={text => setDetails(prev => ({...prev, cost: text}))}
          inputStyle={{margin: width * 0.01}}
          keyboardType={'number-pad'}
          icon="cost"
        />
        <AuthInput
          placeholder="Time"
          value={
            details?.time?.length > 0
              ? moment(details?.time).format('dddd, DD/MM/YYYY @ HH:MM A')
              : details?.time
          }
          onChangeText={text => setDetails(prev => ({...prev, time: text}))}
          inputStyle={{margin: width * 0.01}}
          type={'calendarEvent'}
          icon={'time'}
          onPress={() => setShowDateTime(true)}
        />
        <AuthInput
          placeholder="Wallet Adress"
          value={details?.walletAdress}
          onChangeText={text =>
            setDetails(prev => ({...prev, walletAdress: text}))
          }
          inputStyle={{margin: width * 0.01}}
          icon="wallet"
        />
      </ScrollView>
      <DateTimePicker
        selectedDate={details?.time}
        setSelectedDate={text =>
          setDetails(prev => ({
            ...prev,
            time: text,
          }))
        }
        showDate={showDateTime}
        setShowDate={setShowDateTime}
      />
      <CreateButton title="Create Event" onPress={handleForm} />
    </View>
  );
};

export default CreateEvent;


